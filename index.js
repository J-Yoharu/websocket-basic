const { createServer } = require("http");
const { Server } = require("socket.io");

const port = 3000;
const host = "localhost";

const httpServer = createServer({ host }, (req, res) =>
  res.end("Http server is running")
);
middlewares = {
  authMiddleware(socket, next) {
    /*autenticação
  payload da conexão com client: {
        auth: {
            token:123
        },
    }
  */
    if (!socket.handshake.auth.token) return next(new Error("Token ausente!"));
    if (socket.handshake.auth.token != token)
      return next(
        new Error(
          "Credenciais invalidas, insira a senha '123' em localstorage.token"
        )
      );
    return next();
  },
};

const io = new Server(httpServer, {
  cors: {
    origin: ["http://127.0.0.1:5500"],
  },
});

const usersId = [];
const token = "123";

io.on("connection", (socket) => {
  usersId.push(socket.id);
  console.log(`Novo client conectado ao server wss, total: ${usersId.length}`);
  // padrão para colocar em todo socket

  socket.on("error", (err) => {
    console.log(`Erro: ${err}`);
    socket.disconnect();
  });

  socket.broadcast.emit("user-connected", socket.id);

  socket.on("disconnect", () => {
    userIndex = usersId.findIndex((id) => id == socket.id);
    if (userIndex == -1) return;

    usersId.splice(0, userIndex);
    console.log(usersId.length);
    socket.broadcast.emit("user-disconnected", socket.id);
  });

  //middlewares
  socket.use(([event, ...args], next) => {
    // console.log(`evento ${args}`);
    if (!usersId.includes(socket.id)) return next(new Error("ERRO BOLADO"));
    return next();
  });
});

//middlewares
//autenticação via token
io.use(middlewares.authMiddleware);

const namespace = "chat";

io.of(`/${namespace}`).on("connection", (socket) => {
  socket.on("new-message", (data, callback) => {
    /* Insere callback para avisar que a mensagem foi 
       salva ao banco de dados
    */
    const save = true;
    if (!save) return callback(save);

    callback(save);
    socket.broadcast.emit("read-message", data);
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
