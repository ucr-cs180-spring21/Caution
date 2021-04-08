var express = require('express');  
var app = express();  
var server = require('http').createServer(app); 
var io = require('socket.io')(server); 

//keep track of how times clients have clicked the button
var clickCount = 0;

//redirect / to our index.html file
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) { 
	//when the server receives clicked message, do this
    client.on('hello', function(data) {
            console.log("Request received from client");
		    io.emit('hello world');
    });
});

//start our web server and socket.io server listening
server.listen(3000, function(){
}); 