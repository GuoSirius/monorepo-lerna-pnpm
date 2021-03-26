import socket from '@/service/socket.io'

export default function socketIO(...rest) {
  console.log(socket, ...rest)
}
