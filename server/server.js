const path = require ("path");
//Getting from server.js to public folder
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);

const http = require('http');
const express = require('express');
const app = express();
const socketIO = require('socket.io');

var server = http.createServer(app);
//used to communicate between server and client
var io = socketIO(server);

//needed to use public folder
app.use(express.static(publicPath))

//Server side

//This creates a connection to the server
io.on('connection', (socket) => {
	console.log('New user connected');

	//passing data from server to the client
	socket.emit('newEmail', {
		from: 'stevengangano@yahoo.com',
		text: 'Hey whats up',
		createdAt: 123
	});

	//Receving data from client
	socket.on('createEmail', (newEmail) =>{
		console.log('createEmail', newEmail)
	})

	//Receving data from client
	socket.on('createMessage', (message) =>{
		console.log('createMessage', message);
		io.emit('newMessage', {
			from: message.from,
			text: message.text
		});
	});



	//When server disconnects or when client closes the window
	socket.on('disconnect', () => {
	console.log('New user was disconnected');	
	});

});












//Runs on PORT localhost:7000
var PORT = process.env.PORT || 3000

server.listen(PORT, function(){
  console.log('Server Running');
});