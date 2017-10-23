//Client Side

//creates connection between client and server
var socket = io();

//When a user connects from client side
//shows in chrome console
socket.on('connect', function () {
	console.log('Connected to server');

	//Sending data to the server 
	//Or
	//You can send this in the console and it will show in the terminal
	// socket.emit('createMessage', {
	// 	from: "Stebs",
	// 	text: "Hello"
	// })
});

//Receiving data from the server
//Displays:
//linked with socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app')); from server5.js
//linked with socket.emit('newMessage', generateMessage('Admin','New user joined')); from server5.js

// socket.on('newMessage', function (message) {
// 	console.log('newMessage', message);
// });

//Example #1
//Receiving data from the server
// socket.on('newMessage', function (message) {
// 	console.log('newMessage', message);
// 	var formattedTime = moment(message.createdAt).format('h:mm a')
// 	var li = $('<li class="style"></li>');
// 	li.text(`${message.from} ${formattedTime}: ${message.text}`)

// 	$('#messages').append(li);
// });

//Example #2 (Preferred way)
socket.on('newMessage', function (message) {
	var formattedTime = moment(message.createdAt).format('h:mm a')
	var template = $('#message-template').html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	$("#messages").append(html)

});


//When a user disconnects
socket.on('disconnect', function () {
	console.log('Disconnected from server');
});


//***THIS DATA IS PASSED TO SERVER5.JS***
//When a message is typed 
$('#message-form').on('submit', function (e) {
	//prevents refresh
	e.preventDefault();
	//***THIS DATA IS PASSED TO SERVER5.JS***
	socket.emit('createMessage', {
		from: 'User',
		//grabs value from input box
		text: $('[name=message]').val()
	}, function (data) {
		//displays callback from server5.js
		console.log(data)
		//clears input box
		document.getElementById("message-text").value = "";
	});
})


