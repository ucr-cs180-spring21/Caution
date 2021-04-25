// Imports
const { Socket } = require('dgram');
var express = require('express');  
var app = express();  
var server = require('http').createServer(app); 
var io = require('socket.io')(server); 
const fs = require('fs')

// Globals
var data = []
var obj = []
var stream
let match

const lineReader = require('readline').createInterface({
    input: fs.createReadStream('data/book_update.csv')
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

    client.on('update', function(field) {
        io.emit('update_return', data);
    });

    client.on('delete', function(id) {
        for(var j = 0; j < data.length; j++) {
            if (data[j][0] == id){
                data.splice(j, 1);
            }
        }
        io.emit('senddata', data);
    });
    
    client.on('new', function(field) {
        var retdata = []
        console.log(data[data.length-1]);
        retdata.push(field);
        data.push(field);
        io.emit('senddata', retdata);
    });

    client.on('add', function(val) {
        data.push(val);
    });

    client.on('snow', function(client){
        var re = []

        for(var j = 0; j < data.length; j++) {
            if (data[j][31] == 'Light Snow'){
                re.push(data[j]);
                //console.log(data[j]);
            }
        }
        retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }
        //console.log(retdata);

        io.emit('senddata', retdata);
    });
    client.on('update_snow', function(r_data){
        var re = []

        for(var j = 0; j < r_data.length; j++) {
            if (r_data[j][31] == 'Light Snow'){
                re.push(r_data[j]);
            }
        }
        retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }

        data = r_data;
        io.emit('senddata', retdata);
    });
    client.on('humid', function(client){
        var re = []

        for(var j = 0; j < data.length; j++) {
            if (data[j][25] == '100'){
                re.push(data[j]);
                //console.log(data[j]);
            }
        }

        retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }
        //console.log(retdata);

        io.emit('senddata', retdata);
    });
    client.on('update_humid', function(r_data){
        var re = []

        for(var j = 0; j < r_data.length; j++) {
            if (r_data[j][25] == '100'){
                re.push(r_data[j]);
            }
        }
        retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }

        data = r_data;
        io.emit('senddata', retdata);
    });
    client.on('trafficsig', function(client){
        var re = []

        for(var j = 0; j < data.length; j++) {
            if (data[j][43] == 'TRUE'){
                re.push(data[j]);
            }
        }

        retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }
        //console.log(retdata);

        io.emit('senddata', retdata);
    });
    client.on('update_trafficsig', function(r_data){
        var re = []

        for(var j = 0; j < r_data.length; j++) {
            if (r_data[j][43] == 'TRUE'){
                re.push(r_data[j]);
            }
        }
        retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }

        data = r_data;
        io.emit('senddata', retdata);
    });

    client.on('severity', function(client){
        var re = []

        for(var j = 0; j < data.length; j++) {
            if (data[j][3] == '3'){
                re.push(data[j]);
                //console.log(data[j]);
            }
        }

        retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }
        //console.log(retdata);

        io.emit('senddata', retdata);
    });

    client.on('update_severity', function(r_data){
        var re = []

        for(var j = 0; j < r_data.length; j++) {
            if (r_data[j][3] == '3'){
                re.push(r_data[j]);
            }
        }
        retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }

        data = r_data;
        io.emit('senddata', retdata);
    });

    client.on('timezone', function(client){
        var re = []

        for(var j = 0; j < data.length; j++) {
            if (data[j][20] == 'US/Eastern'){
                re.push(data[j]);
                //console.log(data[j]);
            }
        }

        retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }
        //console.log(retdata);

        io.emit('senddata', retdata);
    });

    client.on('update_timezone', function(r_data){
        var re = []

        for(var j = 0; j < r_data.length; j++) {
            if (r_data[j][20] == 'US/Eastern'){
                re.push(r_data[j]);
            }
        }
        retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }

        data = r_data;
        io.emit('senddata', retdata);
    });

    client.on('city', function(client){
        var re = []

        for(var j = 0; j < data.length; j++) {
            if (data[j][15] == 'Dayton'){
                re.push(data[j]);
                //console.log(data[j]);
            }
        }

        retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }
        //console.log(retdata);

        io.emit('senddata', retdata);
    });

    client.on('update_city', function(r_data){
        var re = []

        for(var j = 0; j < r_data.length; j++) {
            if (r_data[j][15] == 'Dayton'){
                re.push(r_data[j]);
            }
        }
        retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }

        data = r_data;
        io.emit('senddata', retdata);
    });

    client.on('airport', function(client){
        var re = []

        for(var j = 0; j < data.length; j++) {
            if (data[j][21] == 'KDAY'){
                re.push(data[j]);
                //console.log(data[j]);
            }
        }

        retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }
        //console.log(retdata);

        io.emit('senddata', retdata);
    });

    client.on('update_airport', function(r_data){
        var re = []

        for(var j = 0; j < r_data.length; j++) {
            if (r_data[j][21] == 'KDAY'){
                re.push(r_data[j]);
            }
        }
        retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }

        data = r_data;
        io.emit('senddata', retdata);
    });

    client.on('pressure', function(client){
        var re = []

        for(var j = 0; j < data.length; j++) {
            if (data[j][26] == '29.61'){
                re.push(data[j]);
                //console.log(data[j]);
            }
        }

        retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);


            retdata.push(stringToJsonObject);
        }
        //console.log(retdata);

        io.emit('senddata', retdata);
    });

    client.on('update_pressure', function(r_data){
        var re = []

        for(var j = 0; j < r_data.length; j++) {
            if (r_data[j][26] == '29.61'){
                re.push(r_data[j]);
            }
        }
        retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }

        data = r_data;
        io.emit('senddata', retdata);
    });

    client.on('clear', function(client){
        retdata = [];
        io.emit('empty', retdata);
    });

    client.on('csvexport', function(client){
        let csvContent = "data:text/csv;charset=utf-8,";

        data.forEach(function(rowArray) {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
        //console.log(csvContent);
        
        io.emit('csvexport', csvContent);
    });
});

// Starting the server and listening to the port
server.listen(3000, function(){
}); 