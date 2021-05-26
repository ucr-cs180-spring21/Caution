var express = require('express');  
var app = express();  
var server = require('http').createServer(app);
var io = require('socket.io')(server); 
var path = require('path');

var { queryRecords } = require('./utils/Query');
var { updateValue, deleteRecord, insertRecord } = require('./utils/ModifyRecords');
var { process, backup } = require('./utils/CSVReadWrite');
var { getGraphData } = require('./utils/Analytics');

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

    client.on('backup', function(id){
        backup(data);
        io.emit('backup', []);
    });

    client.on('updateinput', function(fn){
        data = [];
        datadir = 'data/' + fn;
        process(data, datadir);
    });

    client.on('getGraphData', function(query, fn) {
        let { graphX, graphY, title, titleX, titleY } = getGraphData(data, query); 
        fn(graphX, graphY, title, titleX, titleY);
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
        //console.log(re);

        // Gets only the unique values in a filter and its frequency
        const map = re.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
        //console.log(map);
        frequency_result = Array.from(map, ([Value, Count]) => ({ Value, Count }));
      
        //console.log(frequency_result)
        io.emit('sfilterFrequency', frequency_result, id);
    });

    // Returns the frequency of each data field in a filter
    client.on('average', function(id, id2){
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

        var frequency_result = [];

        for(var k = 0; k<tags.length; k++){
            map_vals[tags[k]] = (map_vals[tags[k]]/(map_cnt[tags[k]])).toFixed(4);
            //map_vals[tags[k]] = map_vals[tags[k]].toFixed(2);
            frequency_result.push({Value: tags[k], Count: map_vals[tags[k]]});
        }

        //console.log(frequency_result);

        io.emit('sfilterFrequency', frequency_result);
    });
});

// Starting the server and listening to the port
server.listen(3000, function() {}); 