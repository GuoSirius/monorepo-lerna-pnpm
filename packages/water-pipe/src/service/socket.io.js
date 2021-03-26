import { io } from 'socket.io-client'

const socket = io('ws://123.207.123.153:6966/socket')

socket.on('connection', socket => {
  console.log(socket.handshake.query)
})

export default socket
