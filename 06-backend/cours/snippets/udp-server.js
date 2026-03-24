import { createSocket } from "node:dgram"

const socket = createSocket("udp4")

socket.on("message", (message, remote) => {
  const text = message.toString("utf8").trim()
  console.log(`Reçu "${text}" de ${remote.address}:${remote.port}`)
})

socket.bind(4001, "127.0.0.1")
console.log("UDP server on 127.0.0.1:4001")
