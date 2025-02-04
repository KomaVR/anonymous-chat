const ws = new WebSocket('ws://localhost:8080');  // Make sure this points to your WebSocket server

// Handle connection opened
ws.onopen = () => {
  console.log('WebSocket connection established');
};

// Handle incoming messages from the WebSocket server
ws.onmessage = (event) => {
  console.log('Received message: ', event.data);
  const message = event.data;
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  document.getElementById('messages').appendChild(messageElement);
  
  // Scroll to the bottom of the messages container
  const messagesDiv = document.getElementById('messages');
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

// Handle WebSocket errors
ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

// Handle WebSocket close event
ws.onclose = (event) => {
  console.log('WebSocket connection closed:', event);
};

// Send message via WebSocket
function sendMessage() {
  const messageBox = document.getElementById('messageBox');
  const message = messageBox.value;

  if (message.trim() !== '') {  // Check if the message is not empty
    ws.send(message);
    console.log('Sent message:', message);
    messageBox.value = '';  // Clear message box
  } else {
    console.log('Message is empty');
  }
}
