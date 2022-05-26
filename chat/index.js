import socket from './wsServer.js'

const input = document.querySelector('#input-message')
const chat = document.querySelector('.chat-container')
const userElement = document.querySelector('#username')

const user = JSON.parse(localStorage.user)

socket.on('connect', () => {
  user.id = socket.id
  userElement.textContent = user.name

  socket.emit('authentication', user, auth => {
    console.log({ auth })
  })
})

socket.on('read-message', data => {
  newMessage(data)
  console.log(socket.token)
})

socket.on('notification', data => {
  alert(data)
})

function alert(message, timeout = 1000) {
  const alert = document.querySelector('.alert')
  alert.textContent = message
  alert.classList.toggle('hidden')
  setTimeout(() => {
    alert.classList.toggle('hidden')
  }, timeout)
}

window.sendMessage = function () {
  const text = input.value

  socket.emit('write-message', { text, user })
  input.value = ''
  input.focus()
}

input.addEventListener('keypress', event => {
  if (event.key == 'Enter') return sendMessage()
})

input.addEventListener('blur', mouseEvent => {
  console.log({ mouseEvent })
})

function newMessage(message) {
  let itsMe = message.user.id == socket.id

  let container = document.createElement('div')

  let messageContainer = document.createElement('div')

  let messageDataContainer = document.createElement('div')
  messageDataContainer.classList.add('message')

  let userElement = document.createElement('div')
  let messageElement = document.createElement('div')

  if (itsMe) {
    container.setAttribute('style', 'display: flex; justify-content: end')
    userElement.setAttribute('style', 'text-align: end')
    messageDataContainer.classList.add('sender')
  } else messageDataContainer.classList.add('receiver')

  userElement.textContent = message.user.name
  messageElement.textContent = message.text

  messageDataContainer.append(userElement)
  messageDataContainer.append(messageElement)

  messageContainer.append(messageDataContainer)

  container.append(messageContainer)

  chat.append(container)
}
