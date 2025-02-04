const ws = new WebSocket('ws://localhost:8080');
const messageBox = document.getElementById('messageBox');
const messagesDiv = document.getElementById('messages');

// Handle incoming messages from the server (WebSocket)
ws.onmessage = (event) => {
  const message = event.data;
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  messagesDiv.appendChild(messageElement);

  // Scroll to the bottom of the messages div
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

// Send message via WebSocket
function sendMessage() {
  const message = messageBox.value;
  if (message.trim() !== '') { // Check if the message is not empty
    ws.send(message);
    messageBox.value = '';  // Clear message box
  }
}
