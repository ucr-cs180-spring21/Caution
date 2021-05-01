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
}

// When the button is pressed, clears the table
function buttonClear() {
    socket.emit('clear');
}

socket.on('empty', function(data){
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
    
    for(var i in testarr) {
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
    document.getElementById('record_table').innerHTML = table;
    $(document).ready(function() {
        $('#record_table').DataTable( {
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