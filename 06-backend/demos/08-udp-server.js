import { createSocket } from "node:dgram";

const port = 4001;
const host = "127.0.0.1";
const socket = createSocket("udp4");

socket.on("listening", () => {
    console.log(`UDP server listening on ${host}:${port}`);
    console.log('Test with: echo "ping" | nc -u -w1 127.0.0.1 4001');
});

socket.on("message", (message, remote) => {
    const text = message.toString("utf8").trim();
    console.log(`Received "${text}" from ${remote.address}:${remote.port}`);
});

socket.bind(port, host);
