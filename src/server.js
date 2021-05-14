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
        data = [];
        datadir = 'data/' + fn;
        process(data, datadir);
    });
    client.on('getFullTable', function() {
        io.emit('senddata', data);
    });

    client.on('cfilterFrequency', function(id){
        var re = []
        let indexOfPassedInFilter = 0;
        
        // Finds the specific filter in the data to get its contents
        for(var i = 0; i < data.length; ++i) {
            if(id == data[0][i]) {
                break;
            }
            else {
                indexOfPassedInFilter += 1;
            }
        }
        
        // Push all of the filter's fields to an array(HARDCODED RN JUST FOR WEATHER_CONDITION)
        for(var j = 0; j < data.length; j++) {
            re.push(data[j][indexOfPassedInFilter]);
        }
        console.log('Re ' + indexOfPassedInFilter);

        // Gets only the unique values in a filter and its frequency
        const map = re.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
        frequency_result = Array.from(map, ([Value, Count]) => ({ Value, Count }));
      
        console.log(frequency_result)
        io.emit('sfilterFrequency', frequency_result);
    });

    // Returns the frequency of each data field in a filter
    client.on('increment', function(id, id2){
        var re = []
        var re2 = []
        let indexOfPassedInFilter = 0;
        let indexOfPassedInFilter2 = 0;

        // Finds the specific filter in the data to get its contents
        for(var i = 0; i < data.length; ++i) {
            if(id === data[0][i]) {
                break;
            }
            else {
                indexOfPassedInFilter += 1;
            }
        }
        for(var i = 0; i < data.length; ++i) {
            if(id2 === data[0][i]) {
                break;
            }
            else {
                indexOfPassedInFilter2 += 1;
            }
        }
        console.log(id, id2);
        console.log(indexOfPassedInFilter, indexOfPassedInFilter2);

        // Push all of the filter's fields to an array
        var tags = [];
        var map_vals = {};
        var map_cnt = {};
        for(var j = 1; j < data.length; j++) {
            if(!tags.includes(data[j][indexOfPassedInFilter])){
                tags.push(data[j][indexOfPassedInFilter]);
                map_vals[data[j][indexOfPassedInFilter]] = parseInt(data[j][indexOfPassedInFilter2]);
                map_cnt[data[j][indexOfPassedInFilter]] = 1;
            }
            else{
                map_vals[data[j][indexOfPassedInFilter]] += parseInt(data[j][indexOfPassedInFilter2]);
                map_cnt[data[j][indexOfPassedInFilter]] += 1;
            }
        }

        // console.log(map_cnt);
        // console.log(map_vals);
        for(var k = 0; k<tags.length; k++){
            map_vals[tags[k]] = (map_vals[tags[k]])/(map_cnt[tags[k]]);
        }
        console.log(map_vals);

        // // Holds each unique value of humidity
        // var analyticsArr = re.filter((value, index, self) => {return self.indexOf(value) === index;});

        // // Will hold the average severity of each humidity percent
        // var avgSeverity = Array(analyticsArr.length).fill(0);
        // // Counts the amount of times severity 
        // var counter = Array(analyticsArr.length).fill(0);

        // // Now get the average severity(id2) of each humidity percent(id)  
        // for(let i = 1; i < data.length; i++) {
        //     for(let j = 1; j < analyticsArr.length; j++) {
        //         if(re[i] == analyticsArr[j]) {
        //             counter[j] += 1; 
        //             avgSeverity[j] = avgSeverity[j] + parseFloat(re2[j]);
        //         }
        //     }
        // }

        // // Have to make a separate loop to calculate correct average cause didn't when did embedded for loop
        // for(let j = 1; j < avgSeverity.length; j++) {
        //         avgSeverity[j] = avgSeverity[j] / counter[j];

        // }

        // re = [analyticsArr, avgSeverity]
        // console.log(frequency_result);
        // io.emit('filterFrequency', frequency_result, id);
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

    // client.on('getGraphData', function(query, fn) {
    //     let { graphX, graphY, title, titleX, titleY } = getGraphData(data, query); 
    //     fn(graphX, graphY, title, titleX, titleY);
    // });
});

// Starting the server and listening to the port
server.listen(3000, function() {}); 