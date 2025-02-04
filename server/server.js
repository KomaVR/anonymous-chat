const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
const clients = [];

wss.on('connection', (ws) => {
  console.log('A new client connected');
  clients.push(ws);

  ws.on('message', (message) => {
    console.log('Received:', message);

    clients.forEach((client) => {
      if (client !== ws) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    const index = clients.indexOf(ws);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

console.log('WebSocket server running on ws://localhost:8080');
