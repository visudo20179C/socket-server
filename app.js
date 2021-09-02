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
	reconnect: false,
	rejectUnauthorized: false
});

io.on('connection', client => {
	client.on('move_placed', (x,y) => {
		console.log("A move was placed")
	})
	client.on('join_game', (room) => {
		client.join(room)
		io.to(room).emit('new_game', room)
	})
});
server.listen(3000);

