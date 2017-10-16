//Sending data to the user when they enter the chatroom

const path = require ("path");
//Getting from server.js to public folder
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);

const http = require('http');
const express = require('express');
const app = express();
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

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
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	//passing data from server to the client
	socket.emit('newMessage', generateMessage('Admin','New user joined'));

	//Displays in console when user joins
	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New user joined',
		createdAt: new Date().getTime()
	});

	//Receving data from client
	socket.on('createMessage', (message, callback) => {
		//displays in the console
		console.log('createMessage', message);

		//io.emit sends data to everyone who is on the website
		//Type into console: socket.emit('createMessage', { from:'stebs', text:'hey'});
		io.emit('newMessage', generateMessage(message.from, message.text));

		//***Acknoledgements*** see index.js
		callback('This is from the server');
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