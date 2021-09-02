const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://172.18.154.173:8080",
    methods: ["GET", "POST"]
  }
});
const socket = require("socket.io-client")("http://172.18.154.173:8080/", {
	secure: false,
	rejectUnauthorized: false
});

io.on('connection', () => {
	console.log("Connected")
});
server.listen(3000);

