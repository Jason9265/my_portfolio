// server.js
require('dotenv').config();
const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

// Create an HTTP server instance
const server = http.createServer(app);

// Create a WebSocket server instance attached to the HTTP server
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Map();

// Generate unique user IDs
let userIdCounter = 1;

// Add Slack webhook configuration
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

// Add Slack verification endpoint
function verifySlackRequest(req, res, next) {
    const slackSignature = req.headers['x-slack-signature'];
    const timestamp = req.headers['x-slack-request-timestamp'];
    const body = JSON.stringify(req.body);
    
    const baseString = `v0:${timestamp}:${body}`;
    const signature = 'v0=' + crypto
        .createHmac('sha256', process.env.SLACK_SIGNING_SECRET)
        .update(baseString)
        .digest('hex');
    
    if (signature === slackSignature) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}

app.post('/slack/events', verifySlackRequest, (req, res) => {
    // Verify the request is from Slack
    if (req.body.challenge) {
        return res.send({ challenge: req.body.challenge });
    }

    // Handle message events from Slack
    if (req.body.event && req.body.event.type === 'message') {
        const slackMessage = req.body.event.text;
        
        // Broadcast message to all WebSocket clients
        const broadcastMessage = {
            type: 'message',
            content: slackMessage,
            userId: 'slack',
            userName: 'Slack Admin'
        };

        // Broadcast to all connected WebSocket clients
        clients.forEach((_, client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(broadcastMessage));
            }
        });
    }

    res.status(200).send('OK');
});

// Handle new WebSocket connections
wss.on('connection', (ws) => {
    const userId = userIdCounter++;
    const userInfo = {
        id: userId,
        name: `User ${userId}`,
    };
    
    // Store client information
    clients.set(ws, userInfo);
    
    // Send welcome message to the new client
    ws.send(JSON.stringify({
        type: 'welcome',
        content: `Welcome, ${userInfo.name}!`,
        userId: userInfo.id
    }));

    // Broadcast to all clients that a new user has joined
    broadcast({
        type: 'system',
        content: `${userInfo.name} has joined the chat`,
        userId: 'system'
    }, ws);

    // Handle incoming messages
    ws.on('message', (message) => {
        try {
            const parsedMessage = JSON.parse(message);
            
            // Broadcast the message to all clients
            broadcast({
                type: 'message',
                content: parsedMessage.content,
                userId: userInfo.id,
                userName: userInfo.name
            }, ws);
            
            // Send to Slack
            sendToSlack(`${userInfo.name}: ${parsedMessage.content}`);
            
            console.log(`Received message from ${userInfo.name}:`, parsedMessage.content);
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    // Handle client disconnection
    ws.on('close', () => {
        broadcast({
            type: 'system',
            content: `${userInfo.name} has left the chat`,
            userId: 'system'
        });
        
        // Remove client from the map
        clients.delete(ws);
        console.log(`${userInfo.name} disconnected`);
    });

    // Handle errors
    ws.on('error', (error) => {
        console.error(`Error from ${userInfo.name}:`, error);
    });
});

// Broadcast message to all clients except the sender
function broadcast(message, sender) {
    const messageStr = JSON.stringify(message);
    clients.forEach((userInfo, client) => {
        if (client !== sender && client.readyState === WebSocket.OPEN) {
            client.send(messageStr);
        }
    });
}

// Add this function to send messages to Slack
async function sendToSlack(message) {
    if (!SLACK_WEBHOOK_URL) {
        console.warn('SLACK_WEBHOOK_URL is not configured');
        return;
    }
    
    try {
        await axios.post(SLACK_WEBHOOK_URL, {
            text: message
        });
    } catch (error) {
        console.error('Error sending message to Slack:', error);
    }
}

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`WebSocket server is running on port ${PORT}`);
});

// Optional: Basic health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', connections: clients.size });
});
