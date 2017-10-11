const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const colors = require('./data.js')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

const getActiveUsers = () => {
  let activeUsers = wss.clients.size
  wss.clients.forEach(function (client) {
    if(client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'activeUsers',
        content: activeUsers
      }))
    }
  })
}

function randomNumber () {
  return Math.floor(Math.random() * 6)
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  const color = colors[randomNumber()]
  getActiveUsers()

  ws.on('message', (message) => {
    let msg = JSON.parse(message)
    msg.id = uuidv4()
    msg.type === 'postMessage' ? msg.type = 'incomingMessage' : msg.type = 'incomingNotification'
    msg.color = color
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(msg));
        }
    })
  }) 
  
  console.log('Client connected');

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    getActiveUsers()
  });
});


