// Global variables
var socket = io.connect();
var selectedFilters = [];
var count = 0;

// Function executes immediately and displays which filters are selected
// window.onload = multiselectFeature(); 
// function multiselectFeature() {
//     var selectTag = document.getElementById('multi-select');
//     filters = new Array(selectTag.length);

//     selectTag.addEventListener('click', function(e) {
//         // Initialize all the filters to be unselected 
//         filters[e.target.index] = !filters[e.target.index];
        
//         // If filter is selected, mark it
//         for(var i = 0; i < filters.length; ++i) {
//             selectTag.options[i].selected = filters[i];
//         }
//     })
// }

// This function gets the filters that are selected
// function updateFilters() {
//     // Convert all of the options to an array
//     // Then, get an array of only the options that are selected
//     // Then, get an array of the selected option values
//     selectedFilters = Array.from(document.getElementById("multi-select").options).filter(function (option) {
//         return option.selected;
//     }).map(function (option) {
//         return option.value;
//     });
//     console.log(selectedFilters)
// }


// This function returns the names of the filters that were selected
// function getFilters() {
//     return selectedFilters;
// }


// When the update button is pressed, update the table
function updateTable() {
    let query = document.getElementById("table_options_query_select").value;
    
    switch(query) {
        case "traffic_signal_true":
            socket.emit("trafficsig");
            break;
        case "weather_condition_light_snow":
            socket.emit("snow");
            break;
        case "humidity_100%":
            socket.emit("humid");
            break;
        case "severity_3/3":
            socket.emit("severity");
            break;
        case "timezone_us/eastern":
            socket.emit("timezone");
            break;
        case "city_dayton":
            socket.emit("city");
            break;
        case "airport_kday":
            socket.emit("airport");
            break;
        case "pressure_29.61_in":
            socket.emit("pressure");
            break;
    }

    // if(selectedFilters[0] == 'trafficsig') {
    //     socket.emit('trafficsig');
    // }
    // else if(selectedFilters[0] == 'snow') {
    //     socket.emit('snow');
    // }
    // else if(selectedFilters[0] == 'humid') {
    //     socket.emit('humid');
    // }
    // else if(selectedFilters[0] == 'severity') {
    //     socket.emit('severity');
    // }
    // else if(selectedFilters[0] == 'timezone') {
    //     socket.emit('timezone');
    // }
    // else if(selectedFilters[0] == 'city') {
    //     socket.emit('city');
    // }
    // else if(selectedFilters[0] == 'airport') {
    //     socket.emit('airport');
    // }
    // else if(selectedFilters[0] == 'pressure') {
    //     socket.emit('pressure');
    // }
    // else if(selectedFilters[0] == 'bump') {
    //     socket.emit('bump');
    // }
}


// When button is pressed updates the 
function update() {
    var id = document.getElementById('recordID');

    socket.emit('update', id.value);
}


function del() {
    var id = document.getElementById('recordID');

    socket.emit('delete', id.value);
}


function newRecord(){
    var attributeValues = [];

    var child = document.getElementsByClassName('recordForm');
    child = Array.prototype.slice.call(child);

    console.log(child);
    count += 1;
    attributeValues.push('B-' + count);
    for (var i = 0; i < child.length; i++){
        attributeValues.push(child[i].value);
    }
    //console.log(attributeValues);
    socket.emit('new', attributeValues);
}


// Emits to the server
function buttonClickedhello() {
    socket.emit('hello');
}


// When the button is pressed, clears the table
function buttonClear() {
    socket.emit('clear');
}


function buttonBackup() {
    var fn = document.getElementById('fileName');
    socket.emit('backup');
}

function updateCSV() {
    var fn = document.getElementById('fileName');
    socket.emit('updateinput', fn.value);
}

// Button exports the filtered data to be downloaded on client's comp
// function buttonExport(){
//     socket.emit('csvexport');
// }

// When the server sends, update the HTML
socket.on('hello world', function(data){
    console.log("Hello World!");
    document.getElementById("hellow").innerHTML = 'Hello World!';
});

socket.on('csvexport', function(csvContent) {
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
});

socket.on('update_return', function(data) {
    var id = document.getElementById('recordID');
    var dd = document.getElementById('attributeChange');
    var newval = document.getElementById('newValue');
    var j_ind = 0;
    console.log(id.value);

    for(var j = 0; j < data.length; j++) {
        if (data[j][0] == String(id.value)){
            if(String(dd.value) == 'snow') {
                data[j][31] = newval.value;
                console.log(data[j]);
                socket.emit('update_snow', data[j]);
            }
            else if(String(dd.value) == 'traffic_sig') {
                data[j][43] = newval.value;
                console.log(data[j][43]);
                socket.emit('update_trafficsig', data[j]);
            }
            else if(String(dd.value) == 'humid') {
                data[j][25] = newval.value;
                console.log(data[j][25]);
                socket.emit('update_humid', data[j]);
            }
            else if(String(dd.value) == 'severity') {
                data[j][3] = newval.value;
                console.log(data[j][3]);
                socket.emit('update_severity', data[j]);
            }
            else if(String(dd.value) == 'timezone') {
                data[j][20] = newval.value;
                console.log(data[j][20]);
                socket.emit('update_timezone', data[j]);
            }
            else if(String(dd.value) == 'city') {
                data[j][15] = newval.value;
                console.log(data[j][15]);
                socket.emit('update_city', data[j]);
            }
            else if(String(dd.value) == 'airport') {
                data[j][21] = newval.value;
                console.log(data[j][21]);
                socket.emit('update_airport', data[j]);
            }
            else if(String(dd.value) == 'pressure') {
                data[j][26] = newval.value;
                console.log(data[j][26]);
                socket.emit('update_pressure', data[j]);
            }
        }
    }
});


socket.on('empty', function(data){
    //method learned from: https://stackoverflow.com/questions/44127872/convert-array-of-objects-into-html-table-with-jquery-or-javascript
    var table = '<table>';
    table += '<thead>';
    table += '<tr>';
    testarr = ['ID', 'Source', 'TMC', 'Severity', 'Start_Time', 'End_Time', 'Start_Lat', 'Start_Lng', 'End_Lat', 
    'End_Lng', 'Distance(mi)', 'Description', 'Number', 'Street', 'Side', 'City', 'County', 'State', 'Zipcode', 'Country', 
    'Timezone', 'Airport_Code', 'Weather_Timestamp', 'Temperature(F)', 'Wind_Chill(F)', 'Humidity(%)', 'Pressure(in)', 'Visibility(mi)',
    'Wind_Direction', 'Wind_Speed(mph)', 'Precipitation(in)', 'Weather_Condition', 'Amenity', 'Bump', 'Crossing', 'Give_Way', 'Junction',
    'No_Exit', 'Railway', 'Roundabout', 'Station', 'Stop', 'Traffic_Calming', 'Traffic_Signal', 'Turning_Loop', 'Sunrise_Sunset', 'Civil_Twilight',
    'Nautical_Twilight', 'Astronomical_Twilight']
    
    for(var i in data[0]) {
        table += '<th>' + i + '</th>';
    }

    table += '</tr>';
    table += '<tbody>';
    for(var j = 0; j < data.length; j++){
        table += '<tr>';
        for(var k in data[j]){
        table += '<td>' + data[j][k] + '</td>';
        }
        table += '</tr>';
    }
    table += '</tbody>';
    table += '</table>';
    document.getElementById('infotable').innerHTML = table;
    $(document).ready(function() {
        $('#infotable').DataTable( {
            "pagingType": "full_numbers",
            "bDestroy": true,
            // "columnDefs": [
            // 	{ "targets": [0], "orderable": false }
            // ]
            "ordering": false
        } );
    } );
});


socket.on('senddata', function(data){
    console.log("Received Data");
    //method learned from: https://stackoverflow.com/questions/44127872/convert-array-of-objects-into-html-table-with-jquery-or-javascript
    var table = "";
    table += '<thead>';
    table += '<tr>';
    testarr = ['ID', 'Source', 'TMC', 'Severity', 'Start_Time', 'End_Time', 'Start_Lat', 'Start_Lng', 'End_Lat', 
    'End_Lng', 'Distance(mi)', 'Description', 'Number', 'Street', 'Side', 'City', 'County', 'State', 'Zipcode', 'Country', 
    'Timezone', 'Airport_Code', 'Weather_Timestamp', 'Temperature(F)', 'Wind_Chill(F)', 'Humidity(%)', 'Pressure(in)', 'Visibility(mi)',
    'Wind_Direction', 'Wind_Speed(mph)', 'Precipitation(in)', 'Weather_Condition', 'Amenity', 'Bump', 'Crossing', 'Give_Way', 'Junction',
    'No_Exit', 'Railway', 'Roundabout', 'Station', 'Stop', 'Traffic_Calming', 'Traffic_Signal', 'Turning_Loop', 'Sunrise_Sunset', 'Civil_Twilight',
    'Nautical_Twilight', 'Astronomical_Twilight']
    
    // for(var i in data[0]) {
    // 	table += '<th>' + i + '</th>';
    // 	console.log(i);
    // }

    for(var i in testarr) {
        table += '<th>' + testarr[i] + '</th>';
    }

    table += '</tr>';
    table += '<tbody>';
    for(var j = 0; j < data.length; j++){
        table += '<tr>';
        for(var k in data[j]){
        table += '<td>' + data[j][k] + '</td>';
        }
        table += '</tr>';
    }
    table += '</tbody>';
    
    document.getElementById('record_table').innerHTML = table;
    $(document).ready(function() {
        $('#record_table').DataTable( {
            "pagingType": "full_numbers",
            "bDestroy": true,
            // "columnDefs": [
            // 	{ "targets": [1], "orderable": false }
            // ]
            "ordering": false
        } );
    } );
});
// client side export button
// socket.on('csvexport', function(csvContent) {
// 	console.log('ehehe');
// 	var encodedUri = encodeURI(csvContent);
// 	window.open(encodedUri);
// });
socket.on('backup', function(backup){
    console.log('backup successful');
    
});