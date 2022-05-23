const WebSocket = require('ws');
const http = require('http');

const requestListener = function (req, res) {
 res.end('ok');
};

const server = http.createServer(requestListener);

server.listen(3000, 'localhost', () => {
 console.log('Servidor rodando na porta 3000');
});

const socket = new WebSocket.Server({
 server
});
const clients = [];

socket.on('connection', (ws) => {
  clients.push(ws);
})

setInterval(() => {
 const msg = `Nova mensagem ${Math.random() * 100}`;
 clients.forEach(client => {
  client.send(msg);
 })
},1000);