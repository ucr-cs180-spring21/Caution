var express = require('express');
var path = require('path');
var open = require('open');
var fs = require('fs');

var port = 3000;
var app = express();

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.post('/btn', function(request, respond) {
    respond.send("Hello World!")
});

app.listen(port, function(err){
    if(err){
        console.log(err);
    }else{
        open('http://localhost:' + port);
    }
});