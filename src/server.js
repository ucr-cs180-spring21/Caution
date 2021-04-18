// Imports
const { Socket } = require('dgram');
var express = require('express');  
var app = express();  
var server = require('http').createServer(app); 
var io = require('socket.io')(server); 
const fs = require('fs')

var data = []
var obj = []
let match

const lineReader = require('readline').createInterface({
    input: fs.createReadStream('data/book.csv')
})

lineReader.on('line', function (line) {
    var splitter = new RegExp(/[^,]+/,'g')

    while ((match = splitter.exec(line)) !== null) {
        obj.push(match[0])
    }
    data.push(obj)
    //console.log(data)
    obj = []
});

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
    client.on('rain', function(client){
        var re = []

        for(var j = 0; j < data.length; j++) {
            if (data[j][31] == 'Light Snow'){
                re.push(data[j]);
                console.log(data[j]);
            }
        }
        retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }

        //stringToJsonObject = [stringToJsonObject];
        console.log(retdata);

        io.emit('sendbump', retdata);
    });
    client.on('humidity', function(client){
        var re = []

        for(var j = 0; j < data.length; j++) {
            if (data[j][25] == '100'){
                re.push(data[j]);
                console.log(data[j]);
            }
        }
    });
    client.on('bump', function(client){
        var re = []

        for(var j = 0; j < data.length; j++) {
            if (data[j][33] == 'TRUE'){
                re.push(data[j]);
                console.log(data[j]);
            }
        }

        retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }

        //stringToJsonObject = [stringToJsonObject];
        console.log(retdata);

        io.emit('sendbump', retdata);
    });
});

// Starting the server and listening to the port
server.listen(3000, function(){
}); 