// server.js
const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Create an HTTP server instance
const server = http.createServer(app);

// Create a WebSocket server instance attached to the HTTP server
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Map();

// Generate unique user IDs
let userIdCounter = 1;

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
            
            // Log the message
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

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`WebSocket server is running on port ${PORT}`);
});

// Optional: Basic health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', connections: clients.size });
});
