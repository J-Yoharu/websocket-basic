const WebSocket = require('ws');
const http = require('http');
const PORT = 3000;
const HOST = 'localhost';

const server = http.createServer((req, res) => (res.end('ws server is running')));

server.listen(PORT, HOST, () => {
 console.log(`Servidor rodando na porta ${PORT}`);
});

const socket = new WebSocket.Server({ server });
const clients = [];

socket.on('connection', client => (clients.push(client)) )

setInterval(() => {
 const msg = `Nova mensagem ${Math.random() * 100}`;
 clients.forEach(client => {
  client.send(msg);
 })
},1000);
