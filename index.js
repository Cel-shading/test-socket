const net = require('net');
const WebSocket = require('ws');
const fs = require('fs'); // Ajout du module fs

const wss1 = new WebSocket.Server({ port: 4146 });

wss1.on('connection', (ws) => {
  const socket = net.connect(4146, 'socket-pulser');

  socket.on('connect', () => {
    console.log('Connected to 4146');
  });

  socket.on('data', (data) => {
    ws.send(data);
    fs.appendFileSync('request-response.log', `Request: ${data}\n`); // Enregistrement de la requête
  });

  socket.on('error', (err) => {
    ws.send(`Error: ${err.message}`);
    fs.appendFileSync('request-response.log', `Error: ${err.message}\n`); // Enregistrement de l'erreur
  });
});

const wss2 = new WebSocket.Server({ port: 4147 });

wss2.on('connection', (ws) => {
  const socket = net.connect(4147, 'socket-pulser');

  socket.on('connect', () => {
    console.log('Connected to 4147');
  });

  socket.on('data', (data) => {
    ws.send(data);
    fs.appendFileSync('request-response.log', `Response: ${data}\n`); // Enregistrement de la réponse
  });
});