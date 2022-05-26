const uri = 'http://localhost:3000'
const status = document.querySelector('#socket-url')

const socket = io(uri, {
  transport: ['websocket'],
})

socket.on('connect', () => {
  status.textContent = socket.io.uri
  window.user = socket.id
})

socket.on('disconnect', () => {
  status.textContent = 'Desconectado!'
})

export default socket
