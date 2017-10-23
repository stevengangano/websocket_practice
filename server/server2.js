//Sending data from the user to the server

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


	//Receving data from client
	socket.on('createMessage', (message) =>{
		console.log('createMessage', message);

		//io.emit sends data to everyone who is on the website
		//Type into console: socket.emit('createMessage', { from:'stebs', text:'hey'});
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});

		//or

		//this sends data to everyone else but yourself
		//Type into console: socket.emit('createMessage', { from:'stebs', text:'hey'});
		socket.broadcast.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
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