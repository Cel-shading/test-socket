const http = require('http');
const net = require('net');
const WebSocket = require('ws');

// Create an HTTP server for port 4146
const server1 = http.createServer();
const wss1 = new WebSocket.Server({ server: server1 });

wss1.on('connection', (ws) => {
  const socket = net.connect(4146, 'socket-pulser');

  socket.on('data', (data) => {
    ws.send(data);
  });

  socket.on('error', (err) => {
    ws.send(`Error: ${err.message}`);
  });
});

server1.listen(4146, '0.0.0.0', () => {
  console.log(`WebSocket server running at ws://0.0.0.0:4146/`);
});

// Create an HTTP server for port 4147
const server2 = http.createServer();
const wss2 = new WebSocket.Server({ server: server2 });

wss2.on('connection', (ws) => {
  const socket = net.connect(4147, 'socket-pulser');

  socket.on('data', (data) => {
    ws.send(data);
  });

  socket.on('error', (err) => {
    ws.send(`Error: ${err.message}`);
  });
});

server2.listen(4147, '0.0.0.0', () => {
  console.log(`WebSocket server running at ws://0.0.0.0:4147/`);
});