import { io } from 'socket.io-client';

const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

export const chatSocket = io(socketUrl, { autoConnect: false });