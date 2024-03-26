const WebSocket = require('ws');

const socket = new WebSocket('ws://localhost:8080/ws4146/');

socket.onopen = function(event) {
  console.log('Connected to WebSocket');
};

socket.onmessage = function(event) {
  console.log('Received data: ' + event.data);
};

socket.onerror = function(error) {
  console.log('WebSocket Error: ' + error);
};