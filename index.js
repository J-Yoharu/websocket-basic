const WebSocket = require("ws");
const port = 3000;
const host = "localhost";

const socket = new WebSocket.Server({ port, host });
const clients = [];

socket.on("connection", (client) => {
  console.log("Foi conectado novo cliente");
  clients.push(client);
});

setInterval(() => {
  const msg = `Nova mensagem ${Math.random() * 100}`;

  clients.forEach((client) => {
    client.send(msg);
  });
}, 1000);
