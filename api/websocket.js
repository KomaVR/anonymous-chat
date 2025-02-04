// api/websocket.js
import { Server } from 'socket.io';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).send('WebSocket server is running');
  } else {
    res.status(405).end();
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export function socketHandler(req, res) {
  const io = new Server(res.socket.server);
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (msg) => {
      io.emit('message', msg); // Broadcast message to all connected clients
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  res.socket.server.io = io;
}
