const { Server } = require("socket.io");
const { createServer } = require("http");

const host = "localhost";
const port = 3000;

const httpServer = createServer({ host }, (req, res) => res.end("ok"));

const io = new Server(httpServer, {
  cors: {
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  },
});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    console.log(`Client message: ${data}`);
  });

  socket.on("channel 1", (data, callback) => {
    console.log(`channel 1: ${data}`);
    callback("Tudo certo client!");
  });

  socket.emit("teste", "haha");
  socket.emit("maluco", "haha");
  socket.emit("beleza", "haha");
});

httpServer.listen(port, () =>
  console.log(`Server is running on http://${host}:${port}`)
);
