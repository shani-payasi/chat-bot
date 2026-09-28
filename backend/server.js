require('dotenv').config();

const app = require('./src/app');


const { createServer } = require('http');
const { Server } = require('socket.io');

const { generateResponse } = require('./src/service/ai.service');

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL || ['http://localhost:5173', 'http://localhost:5174', 'https://chat-bot-gof7.vercel.app/'],
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Chat history
const chatHistory = [];

io.on('connection', (socket) => {

    console.log('A User Connected');

    socket.on('disconnect', () => {
        console.log('A User Disconnected');
    });

    socket.on('ai-message', async (data) => {

        console.log('Received AI Message');

        try {

            // User message history me add karo
            chatHistory.push({
                role: 'user',
                message: data
            });

            // Gemini ko history bhejo
            const response = await generateResponse(chatHistory);

            // AI response history me add karo
            chatHistory.push({
                role: 'model',
                message: response
            });

            // Frontend ko response
            socket.emit('ai-message-response', {
                response
            });

        } catch (error) {

            console.error(error);

            socket.emit('ai-message-response', {
                response: 'Something went wrong with AI.'
            });
        }
    });
});

httpServer.listen(3000, () => {
    console.log('Server is running on port 3000');
});