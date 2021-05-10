var express = require('express');  
var app = express();  
var server = require('http').createServer(app);
var io = require('socket.io')(server); 
var path = require('path');

var { querySnow, queryHumid, queryTrafficSig, querySeverity, queryTimezone, queryCity, queryAirport, queryPressure } = require('./utils/Query');
var { updateValue, deleteRecord, insertRecord } = require('./utils/ModifyRecords');
var { process, backup } = require('./utils/CSVReadWrite');
var { getGraphData } = require('./utils/Analytics');

var data = []
process(data, 'data/book.csv');

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

    client.on('snow', function(client){
        let retdata = querySnow(data);
        io.emit('senddata', retdata);
    });

    client.on('humid', function(client){
        let retdata = queryHumid(data);
        io.emit('senddata', retdata);
    });

    client.on('trafficsig', function(client){
        let retdata = queryTrafficSig(data);
        io.emit('senddata', retdata);
    });

    client.on('severity', function(client){
        let retdata = querySeverity(data);
        io.emit('senddata', retdata);
    });

    client.on('timezone', function(client){
        let retdata = queryTimezone(data);
        io.emit('senddata', retdata);
    });

    client.on('city', function(client){
        let retdata = queryCity(data);
        io.emit('senddata', retdata);
    });

    client.on('airport', function(client){
        let retdata = queryAirport(data);
        io.emit('senddata', retdata);
    });

    client.on('pressure', function(client){
        let retdata = queryPressure(data);
        io.emit('senddata', retdata);
    });

    client.on('backup', function(id){
        backup(data);
        io.emit('backup', []);
    });

    client.on('updateinput', function(fn){
        datadir = 'data/' + fn;
        process(data, datadir);
        console.log(data);
    });
    client.on('getFullTable', function() {
        io.emit('senddata', data);
    });
       // Returns the frequency of each data field in a filter
    // client.on('frequency_of_filter', function(id){
    //     var re = []
    //     let indexOfPassedInFilter = 0;

    //     // Finds the specific filter in the data to get its contents
    //     for(var i = 0; i < data.length; ++i) {
    //         if(id === data[0][i]) {
    //             break;
    //         }
    //         else {
    //             indexOfPassedInFilter += 1;
    //         }
    //     }

    //     // Push all of the filter's fields to an array(HARDCODED RN JUST FOR WEATHER_CONDITION)
    //     for(var j = 0; j < data.length; j++) {
    //         re.push(data[j][indexOfPassedInFilter]);
    //     }
    //     console.log('Re ' + indexOfPassedInFilter);

    // client.on('csvexport', function(client){
    //     let csvContent = "data:text/csv;charset=utf-8,";
        
    //     WIP: converting retdata to true array
    //     for(var i in retdata) {
    //         var temparr = [];
    //         temparr.push(JSON.ConvertToCSV(retdata[i]));
    //         let temp = temparr.join(",");
    //         csvContent += temp + "\r\n";
    //     }
    //     console.log(csvContent);
    //     io.emit('csvexport', csvContent);
    // });

    client.on('getGraphData', function(query, fn) {
        let { graphX, graphY, title, titleX, titleY } = getGraphData(data, query); 
        fn(graphX, graphY, title, titleX, titleY);
    });
});

// Starting the server and listening to the port
server.listen(3000, function() {}); 