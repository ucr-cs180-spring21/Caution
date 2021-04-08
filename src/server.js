// Imports
var express = require('express');  
var app = express();  
var server = require('http').createServer(app); 
var io = require('socket.io')(server); 

// Index.html Redirect
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) { 
	// Clicked messages
    client.on('hello', function(data) {
            console.log("Request received from client");
		    io.emit('hello world');
    });
});

// Starting the server and listening to the port
server.listen(3000, function(){
}); 