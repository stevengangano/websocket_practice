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
// socket.on('newMessage', function (message) {
// 	console.log('newMessage', message);
// });

//Receiving data from the server
socket.on('newMessage', function (message) {
	console.log('newMessage', message);
	var li = $('<li></li>');
	li.text(`${message.from}: ${message.text}`)

	$('#messages').append(li);
});


//When a user disconnects
socket.on('disconnect', function () {
	console.log('Disconnected from server');
});


//When a message is typed 
$('#message-form').on('submit', function (e) {
	//prevents refresh
	e.preventDefault();
	socket.emit('createMessage', {
		from: 'User',
		text: $('[name=message]').val()
	}, function () {

	});
})


