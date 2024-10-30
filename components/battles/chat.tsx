// components/Chat.tsx
'use client';

import { useEffect, useState } from 'react';

const Chat = ({username}: {username: string | null | undefined}) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<{ username: string; message: string }[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');

    useEffect(() => {
        // Initialize WebSocket connection
        const ws = new WebSocket('ws://localhost:8080');
        
        ws.onopen = () => {
            console.log('WebSocket connection established'); // Confirm connection
        };

        setSocket(ws);

        // Listen for incoming messages
        ws.onmessage = (event) => {
            console.log('Message from server (raw):', event.data); // Log incoming messages
            try {
                const data = JSON.parse(event.data); // Parse the received message
                console.log('Parsed message:', data); // Log the parsed message
                setMessages((prev) => [...prev, data]); // Add new message to state
            } catch (error) {
                console.error('Error parsing incoming message:', error); // Handle parsing errors
            }
        };

        // Cleanup on component unmount
        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket && inputMessage.trim()) {
            const messageToSend = JSON.stringify({ username, message: inputMessage });
            console.log('Sending:', messageToSend); // Log the message before sending
            socket.send(messageToSend); // Send the message as JSON
            setInputMessage(''); // Clear input after sending
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
          event.preventDefault(); // Prevent the default action (optional)
          sendMessage(); // Call sendMessage when Enter is pressed
      }
    };

    return (
        <div className="chat-container border-l border-gray-300 p-4">
            <h3 className="text-lg font-semibold mb-2">Chat:</h3>
            <div className="space-y-2 mb-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {messages.map((msg, index) => (
                    <div key={index} className="border-b py-1">
                        <strong>{msg.username}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="p-2 bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-lg mr-2"
            />
            <button
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Send
            </button>
        </div>
    );
};

export default Chat;
