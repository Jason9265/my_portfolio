require('dotenv').config();
const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const cors = require('cors');
const { WebClient } = require('@slack/web-api');

const app = express();
app.use(cors());

// Configure express to parse raw body for Slack verification
app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf;
    }
}));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const clients = new Map();
let userIdCounter = 1;

// Initialize Slack Web Client
const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

// Slack verification function
function verifySlackRequest(req, res, next) {
    const crypto = require('crypto');
    
    // Get Slack headers
    const timestamp = req.headers['x-slack-request-timestamp'];
    const slackSignature = req.headers['x-slack-signature'];

    // Check if timestamp is too old
    const currentTime = Math.floor(Date.now() / 1000);
    if (Math.abs(currentTime - timestamp) > 300) {
        return res.status(400).send('Timestamp too old');
    }

    // Create signature
    const sigBasestring = 'v0:' + timestamp + ':' + req.rawBody;
    const mySignature = 'v0=' + 
        crypto.createHmac('sha256', process.env.SLACK_SIGNING_SECRET)
            .update(sigBasestring, 'utf8')
            .digest('hex');

    // Compare signatures
    if (crypto.timingSafeEqual(
        Buffer.from(mySignature, 'utf8'),
        Buffer.from(slackSignature, 'utf8')
    )) {
        next();
    } else {
        res.status(400).send('Verification failed');
    }
}

// Enhanced Slack events endpoint
app.post('/slack/events', verifySlackRequest, async (req, res) => {
    // Handle URL verification challenge
    if (req.body.type === 'url_verification') {
        return res.json({ challenge: req.body.challenge });
    }

    // Log the entire event for debugging
    console.log('Received Slack event:', JSON.stringify(req.body, null, 2));

    // Handle message events
    if (req.body.event && req.body.event.type === 'message') {
        const event = req.body.event;

        // Ignore bot messages to prevent loops
        if (event.bot_id || event.subtype === 'bot_message' || event.subtype) {
            return res.sendStatus(200);
        }

        try {
            // Get user info
            const userInfo = await slack.users.info({
                user: event.user
            });

            // Create message object
            const broadcastMessage = {
                type: 'slack_message',
                content: event.text,
                userId: 'slack-' + event.user,
                userName: userInfo.user.real_name || userInfo.user.name,
                timestamp: event.ts,
                channel: event.channel
            };

            console.log('Broadcasting Slack message:', broadcastMessage);

            // Broadcast to all WebSocket clients
            clients.forEach((_, client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(broadcastMessage));
                }
            });
        } catch (error) {
            console.error('Error processing Slack message:', error);
        }
    }

    // Always respond with 200 OK to Slack
    res.status(200).send('OK');
});

// WebSocket connection handler
wss.on('connection', (ws) => {
    const userId = userIdCounter++;
    const userInfo = {
        id: userId,
        name: `User ${userId}`,
    };
    
    clients.set(ws, userInfo);
    
    // Send welcome message
    ws.send(JSON.stringify({
        type: 'welcome',
        content: `Welcome, ${userInfo.name}`,
        userId: userInfo.id
    }));
    ws.send(JSON.stringify({
        type: 'welcome',
        content: `Messages will send directly to Jason's Slack. Try one now.`,
        userId: userInfo.id
    }));

    // Broadcast join message
    broadcast({
        type: 'system',
        content: `${userInfo.name} has joined the chat`,
        userId: 'system'
    }, ws);

    // Handle incoming WebSocket messages
    ws.on('message', async (message) => {
        try {
            const parsedMessage = JSON.parse(message);
            
            // Broadcast to other WebSocket clients
            broadcast({
                type: 'message',
                content: parsedMessage.content,
                userId: userInfo.id,
                userName: userInfo.name
            }, ws);
            
            // Send to Slack
            try {
                await slack.chat.postMessage({
                    channel: process.env.SLACK_CHANNEL_ID,
                    text: `${userInfo.name}: ${parsedMessage.content}`,
                });
                console.log('Message sent to Slack successfully');
            } catch (error) {
                console.error('Error sending message to Slack:', error);
                ws.send(JSON.stringify({
                    type: 'error',
                    content: 'Failed to send message to Slack'
                }));
            }
        } catch (error) {
            console.error('Error handling WebSocket message:', error);
        }
    });

    ws.on('close', () => {
        broadcast({
            type: 'system',
            content: `${userInfo.name} has left the chat`,
            userId: 'system'
        });
        clients.delete(ws);
    });

    ws.on('error', (error) => {
        console.error(`WebSocket error from ${userInfo.name}:`, error);
    });
});

function broadcast(message, sender) {
    const messageStr = JSON.stringify(message);
    clients.forEach((userInfo, client) => {
        if (client !== sender && client.readyState === WebSocket.OPEN) {
            try {
                client.send(messageStr);
            } catch (error) {
                console.error('Broadcast error:', error);
            }
        }
    });
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK',
        connections: clients.size,
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Global error handling
process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});