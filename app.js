const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
	cors: {
		origin: "https://connect-four.visudo.me",
		methods: ["GET", "POST"]
	}
});
const socket = require("socket.io-client")("https://connect-four.visudo.me/", {
	secure: true,
	reconnect: false,
	rejectUnauthorized: false
});

io.on('connection', client => {
	client.on('move_placed', (room,x,y) => {
		io.to(room).emit('move_placed_received',x,y)
	})
	client.on('join_game', (room, clientId) => {
		if(room != client) {
			client.join(room)
			io.to(room).emit('new_game', room, clientId)
		}
	})
	client.on('leave_game', (room) => {
		client.leave(room)
		io.to(room).emit('player_left')
	})
});
server.listen(3000);

