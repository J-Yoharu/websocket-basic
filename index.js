const { Server } = require('socket.io')
const { createServer } = require('http')

const host = 'localhost'
const port = 3000

const httpServer = createServer({ host }, (req, res) => {
  res.end(`Server is Running on http://${host}:${port}`)
})

let users = []

const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
  },
})

io.on('connection', socket => {
  console.log('New client connected!')

  socket.on('write-message', data => {
    console.log(`Received new Server: ${data}`)

    io.emit('read-message', data)
    // socket.broadcast.emit('read-message', data)
  })

  socket.on('authentication', (user, callback) => {
    users.push(user)
    socket.broadcast.emit('notification', `Novo Usuário Conectado: ${user.name}`)
    callback(true)
  })
})

httpServer.listen(port, () => console.log(`Server is Running on http://${host}:${port}`))
