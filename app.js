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
		if(room != clientId && io.sockets.adapter.rooms.get(room) != undefined && io.sockets.adapter.rooms.get(room).size == 1) {
			client.join(room)
			io.to(room).emit('new_game', room, clientId)
		}
		else if(io.sockets.adapter.rooms.get(room) == undefined) {
			io.to(clientId).emit('error_no_room')
		}
		else if(room == clientId) {
			io.to(room).emit('error_same_room')
		}
		else {
			io.to(clientId).emit('error_room_full')
		}
	})
	client.on('leave_game', (room) => {
		client.leave(room)
		io.to(room).emit('player_left')
	})
	client.on('error_timed_out', (player, room) => {
		   io.to(room).emit('error_player_timed_out', player)
	})
});
server.listen(3000);

