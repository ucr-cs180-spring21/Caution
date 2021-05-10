// Imports
const { Socket } = require('dgram');
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);
var path = require('path');
var io = require('socket.io')(server); 
const fs = require('fs');
const { title } = require('process');
const { count } = require('console');

// Globals
var data = []
var obj = []
var stream
let match
//let datadir = 'data/book.csv'

// serves stuff
app.use(express.static(path.join(__dirname, 'styling')));

async function process(datain) {
    data = [];
    console.log(datain);
    const lineReader = require('readline').createInterface({
        input: fs.createReadStream(datain)
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
}

// Index.html Redirect
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
    
    //app.use('/styling/style.css', express.static('public'));

});

io.on('connection', function(client) { 
    //process('data/book.csv');
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
        re.push(r_data);

        for(var j = 0; j < data.length; j++) {
            if (data[j][0] == r_data[0]){
                data[j][31] = r_data[31];
            }
        }
        var retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }

        // data = r_data;
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
        re.push(r_data);

        for(var j = 0; j < data.length; j++) {
            if (data[j][0] == r_data[0]){
                data[j][25] = r_data[25];
            }
        }
        var retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }

        // data = r_data;
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
        re.push(r_data);

        for(var j = 0; j < data.length; j++) {
            if (data[j][0] == r_data[0]){
                data[j][43] = r_data[43];
            }
        }
        var retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }

        // data = r_data;
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
        re.push(r_data);

        for(var j = 0; j < data.length; j++) {
            if (data[j][0] == r_data[0]){
                data[j][3] = r_data[3];
            }
        }
        var retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }

        // data = r_data;
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
        re.push(r_data);

        for(var j = 0; j < data.length; j++) {
            if (data[j][0] == r_data[0]){
                data[j][20] = r_data[20];
            }
        }
        var retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }

        // data = r_data;
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
        re.push(r_data);

        for(var j = 0; j < data.length; j++) {
            if (data[j][0] == r_data[0]){
                data[j][15] = r_data[15];
            }
        }
        var retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }

        // data = r_data;
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
        re.push(r_data);

        for(var j = 0; j < data.length; j++) {
            if (data[j][0] == r_data[0]){
                data[j][21] = r_data[21];
            }
        }
        var retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }

        // data = r_data;
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
        re.push(r_data);

        for(var j = 0; j < data.length; j++) {
            if (data[j][0] == r_data[0]){
                data[j][26] = r_data[26];
            }
        }
        var retdata = [];

        for(var i = 0; i < re.length; i++) {
            var arrayToString = JSON.stringify(Object.assign({}, re[i]));
            var stringToJsonObject = JSON.parse(arrayToString);
            retdata.push(stringToJsonObject);
        }

        // data = r_data;
        io.emit('senddata', retdata);
    });

    client.on('clear', function(client){
        retdata = [];
        io.emit('empty', retdata);
    });

    client.on('backup', function(id){

        //let csvContent = "data:text/csv;charset=utf-8,";
        let csvContent;

        data.forEach(function(rowArray) {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        });

        stream = fs.createWriteStream("data/backup.csv");
        stream.write(csvContent);
        io.emit('backup', []);
    });

    client.on('updateinput', function(id){
        datadir = 'data/' + id;
        process(datadir);
    });

       // Returns the frequency of each data field in a filter
    client.on('frequency_of_filter', function(id){
        var re = []
        let indexOfPassedInFilter = 0;

        // Finds the specific filter in the data to get its contents
        for(var i = 0; i < data.length; ++i) {
            if(id === data[0][i]) {
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
        io.emit('filterFrequency', frequency_result);
    });

    // Returns the frequency of each data field in a filter
    client.on('average_severity_of_filter', function(id, id2){
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
        for(var j = 0; j < data.length; j++) {
            re.push(data[j][indexOfPassedInFilter]); // Humidity
            re2.push(data[j][indexOfPassedInFilter2]); // Severity
        }
        
        // Holds each unique value of humidity
        var analyticsArr = re.filter((value, index, self) => {return self.indexOf(value) === index;});

        // Will hold the average severity of each humidity percent
        var avgSeverity = Array(analyticsArr.length).fill(0);
    
        // Counts the amount of times severity 
        var counter = Array(analyticsArr.length).fill(0);

        // Now get the average severity(id2) of each humidity percent(id)  
        for(let i = 1; i < data.length; i++) {
            for(let j = 1; j < analyticsArr.length; j++) {
                if(re[i] == analyticsArr[j]) {
                    counter[j] += 1; 
                    avgSeverity[j] = avgSeverity[j] + parseFloat(re2[j]);
                }
            }
        }
       
        // Have to make a separate loop to calculate correct average cause didn't when did embedded for loop
        for(let j = 1; j < avgSeverity.length; j++) {
             avgSeverity[j] = avgSeverity[j] / counter[j];
           
        }

        re = [analyticsArr, avgSeverity]
        console.log(re)
        io.emit('filterFrequency', re);
    });
});

// Starting the server and listening to the port
server.listen(3000, function(){
}); 