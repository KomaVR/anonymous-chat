// api/signaling.js
let clients = [];

module.exports = (req, res) => {
  if (req.method === 'POST') {
    // Handle incoming signaling messages
    const message = req.body;

    if (message && message.type && message.target) {
      // Find the target client and forward the message
      const targetClient = clients.find(client => client.id === message.target);
      
      if (targetClient) {
        // Send the message to the target client
        targetClient.ws.send(JSON.stringify(message));
        return res.status(200).json({ success: true });
      } else {
        return res.status(404).json({ error: 'Target client not found' });
      }
    }
    return res.status(400).json({ error: 'Invalid message' });
  }

  // Handle GET request (e.g., WebSocket connection)
  if (req.method === 'GET') {
    // Create a new WebSocket connection
    const WebSocket = require('ws');
    const WebSocketServer = new WebSocket.Server({ noServer: true });

    WebSocketServer.on('connection', (ws) => {
      // Assign a random client ID for anonymity
      const clientId = Math.random().toString(36).substring(2);
      clients.push({ id: clientId, ws: ws });

      ws.on('message', (message) => {
        console.log('Received message:', message);
      });

      ws.on('close', () => {
        clients = clients.filter(client => client.ws !== ws);
      });
    });

    // Handle the HTTP upgrade for WebSocket connection
    req.socket.server.on('upgrade', (request, socket, head) => {
      WebSocketServer.handleUpgrade(request, socket, head, (ws) => {
        WebSocketServer.emit('connection', ws, request);
      });
    });

    return res.status(200).send('Signaling server is ready.');
  }
};
