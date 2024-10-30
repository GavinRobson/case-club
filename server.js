// server.js
const WebSocket = require('ws');

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (socket) => {
    console.log('Client connected');

    // Broadcast a message when a new client connects
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            const welcomeMessage = { username: 'Server', message: 'A new player has joined the battle!' };
            console.log('Broadcasting:', JSON.stringify(welcomeMessage)); // Log the welcome message
            client.send(JSON.stringify(welcomeMessage)); // Send welcome message to all clients
        }
    });

    // Handle messages from the client
    socket.on('message', (message) => {
        const messageString = message.toString(); // Convert buffer to string
        console.log('Received:', messageString); // Log the received message

        try {
            const parsedMessage = JSON.parse(messageString); // Parse the incoming message
            console.log('Parsed message:', parsedMessage); // Log the parsed message

            // Broadcast the message to all connected clients
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    const broadcastMessage = JSON.stringify(parsedMessage); // Prepare for broadcasting
                    console.log('Broadcasting:', broadcastMessage); // Log the message before sending
                    client.send(broadcastMessage); // Send as valid JSON
                }
            });
        } catch (error) {
            console.error('Error parsing message:', error); // Log any parsing errors
        }
    });

    // Handle client disconnection
    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server running on ws://localhost:8080');
