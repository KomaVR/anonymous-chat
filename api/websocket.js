import { WebSocketServer } from 'ws';

export default function handler(req, res) {
  const wss = new WebSocketServer({ noServer: true });

  wss.on('connection', (ws) => {
    console.log('A new client connected');
    ws.on('message', (message) => {
      // Broadcast the message to all other clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    ws.on('close', () => {
      console.log('A client disconnected');
    });
  });

  // Attach the WebSocket server to the Vercel server
  req.socket.server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

  res.status(200).send('WebSocket server is running');
}
