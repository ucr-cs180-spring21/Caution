var express = require('express');  
var app = express();  
var server = require('http').createServer(app);
var io = require('socket.io')(server); 
var path = require('path');
var fs = require('fs')

var { querySnow, queryHumid, queryTrafficSig, querySeverity, queryTimezone, queryCity, queryAirport, queryPressure } = require('./utils/Query');
var { updateSnow, updateHumid, updateTrafficSig, updateSeverity, updateTimezone, updateCity, updateAirport, updatePressure, deleteRecord, insertRecord } = require('./utils/ModifyRecords');
var { process, backup } = require('./utils/CSVReadWrite');

var data = []

app.use(express.static(path.join(__dirname, 'front_end')));

io.on('connection', function(client) { 
    process('data/book.csv');

    client.on('update', function(field) {
        io.emit('update_return', data);
    });

    client.on('delete', function(id) {
        deleteRecord(data);
        io.emit('senddata', data);
    });
    
    client.on('new', function(field) {
        let retdata = insertRecord(data, field);
        io.emit('senddata', retdata);
    });

    client.on('snow', function(client){
        let retdata = querySnow(data);
        io.emit('senddata', retdata);
    });

    client.on('update_snow', function(r_data){
        let retdata = updateSnow(data, r_data);
        io.emit('senddata', retdata);
    });

    client.on('humid', function(client){
        let retdata = queryHumid(data);
        io.emit('senddata', retdata);
    });

    client.on('update_humid', function(r_data){
        let retdata = updateHumid(data, r_data);
        io.emit('senddata', retdata);
    });

    client.on('trafficsig', function(client){
        let retdata = queryTrafficSig(data);
        io.emit('senddata', retdata);
    });

    client.on('update_trafficsig', function(r_data){
        let retdata = updateTrafficSig(data, r_data);
        io.emit('senddata', retdata);
    });

    client.on('severity', function(client){
        let retdata = querySeverity(data);
        io.emit('senddata', retdata);
    });

    client.on('update_severity', function(r_data){
        let retdata = updateSeverity(data);
        io.emit('senddata', retdata);
    });

    client.on('timezone', function(client){
        let retdata = queryTimezone(data);
        io.emit('senddata', retdata);
    });

    client.on('update_timezone', function(r_data){
        let retdata = updateTimezone(data, r_data);
        io.emit('senddata', retdata);
    });

    client.on('city', function(client){
        let retdata = queryCity(data);
        io.emit('senddata', retdata);
    });

    client.on('update_city', function(r_data){
        let retdata = updateCity(data, r_data);
        io.emit('senddata', retdata);
    });

    client.on('airport', function(client){
        let retdata = queryAirport(data);
        io.emit('senddata', retdata);
    });

    client.on('update_airport', function(r_data){
        let retdata = updateAirport(data, r_data);
        io.emit('senddata', retdata);
    });

    client.on('pressure', function(client){
        let retdata = queryPressure(data);
        io.emit('senddata', retdata);
    });

    client.on('update_pressure', function(r_data){
        let retdata = updatePressure(data, r_data);
        io.emit('senddata', retdata);
    });

    client.on('clear', function(client){
        retdata = [];
        io.emit('empty', retdata);
    });

    client.on('backup', function(id){
        backup(data);
        io.emit('backup', []);
    });

    client.on('updateinput', function(id){
        datadir = 'data/' + id;
        //console.log(datadir);
        process(datadir);
        // var idata = [];
        // obj = [];
        // var match1;

        // const lineReader = require('readline').createInterface({
        //     input: fs.createReadStream(datadir)
        // })
        
        // lineReader.on('line', function (line) {
        //     var splitter = new RegExp(/[^,]+/,'g')
        
        //     while ((match1 = splitter.exec(line)) !== null) {
        //         obj.push(match1[0])
        //     }
        //     idata.push(obj)
        //     //console.log(data)
        //     obj = []
        // });
        // console.log(idata.length);
        // data = idata;
        // io.emit('senddata', idata);
    });


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
});

// Starting the server and listening to the port
server.listen(3000, function() {}); 