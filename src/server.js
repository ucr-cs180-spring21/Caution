var express = require('express');  
var app = express();  
var server = require('http').createServer(app);
var io = require('socket.io')(server); 
var path = require('path');

var { queryRecords } = require('./utils/Query');
var { updateValue, deleteRecord, insertRecord } = require('./utils/ModifyRecords');
var { process, backup } = require('./utils/CSVReadWrite');
var { getGraphData, getAvgGraphData } = require('./utils/Analytics');

var data = [];

app.use(express.static(path.join(__dirname, 'front_end')));

io.on('connection', function(client) { 
    client.on('update', function(updateInfo) {
        updateValue(data, updateInfo);
    });

    client.on('delete', function(id) {
        deleteRecord(data, id);
    });
    
    client.on('new', function(newRecord) {
        insertRecord(data, newRecord);
    });

    client.on('query', function(queryType, fn) {
        let returnData = queryRecords(data, queryType);
        fn(returnData);
    });

    client.on('backup', function(fn){
        backup(data);
        fn("Backup Successful!");
    });

    client.on('updateinput', function(filename){
        data = [];
        datadir = 'data/' + filename;
        process(data, datadir);
    });

    client.on('getGraphData', function(query, fn) {
        let { graphX, graphY, title, titleX, titleY } = getGraphData(data, query); 
        fn(query, graphX, graphY, title, titleX, titleY);
    });

    client.on('getAvgGraphData', function(query, fn) {
        let { graphX, graphY, title, titleX, titleY } = getAvgGraphData(data, query); 
        fn(query, graphX, graphY, title, titleX, titleY);
    });
});

server.listen(3000, function() {}); 