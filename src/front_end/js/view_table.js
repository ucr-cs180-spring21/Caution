function renderTable() {
    $('#record_table').DataTable({
        "pagingType": "full_numbers",
        "bDestroy": true,
        // "columnDefs": [
        // 	{ "targets": [0], "orderable": false }
        // ]
        "ordering": false
    });   
}

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

function clearTable() {
    let table = "";

    table += '<thead>';
    table += '<tr>';

    let attributes = ['ID', 'Source', 'TMC', 'Severity', 'Start_Time', 'End_Time', 'Start_Lat', 'Start_Lng', 'End_Lat', 
    'End_Lng', 'Distance(mi)', 'Description', 'Number', 'Street', 'Side', 'City', 'County', 'State', 'Zipcode', 'Country', 
    'Timezone', 'Airport_Code', 'Weather_Timestamp', 'Temperature(F)', 'Wind_Chill(F)', 'Humidity(%)', 'Pressure(in)', 
    'Visibility(mi)', 'Wind_Direction', 'Wind_Speed(mph)', 'Precipitation(in)', 'Weather_Condition', 'Amenity', 'Bump', 
    'Crossing', 'Give_Way', 'Junction', 'No_Exit', 'Railway', 'Roundabout', 'Station', 'Stop', 'Traffic_Calming', 
    'Traffic_Signal', 'Turning_Loop', 'Sunrise_Sunset', 'Civil_Twilight', 'Nautical_Twilight', 'Astronomical_Twilight']
    
    for(let i of attributes) {
        table += '<th>' + i + '</th>';
    }

    table += '</tr>';
    table += '</thead>';

    table += '<tbody>';
    table += '</tbody>';

    document.getElementById('record_table').innerHTML = table;

    renderTable();
}

socket.on('senddata', function(data){
    console.log("Received Data");

    let table = "";

    table += '<thead>';
    table += '<tr>';

    let attributes = ['ID', 'Source', 'TMC', 'Severity', 'Start_Time', 'End_Time', 'Start_Lat', 'Start_Lng', 'End_Lat', 
    'End_Lng', 'Distance(mi)', 'Description', 'Number', 'Street', 'Side', 'City', 'County', 'State', 'Zipcode', 'Country', 
    'Timezone', 'Airport_Code', 'Weather_Timestamp', 'Temperature(F)', 'Wind_Chill(F)', 'Humidity(%)', 'Pressure(in)', 
    'Visibility(mi)', 'Wind_Direction', 'Wind_Speed(mph)', 'Precipitation(in)', 'Weather_Condition', 'Amenity', 'Bump', 
    'Crossing', 'Give_Way', 'Junction', 'No_Exit', 'Railway', 'Roundabout', 'Station', 'Stop', 'Traffic_Calming', 
    'Traffic_Signal', 'Turning_Loop', 'Sunrise_Sunset', 'Civil_Twilight', 'Nautical_Twilight', 'Astronomical_Twilight']
    
    for(let i of attributes) {
        table += '<th>' + i + '</th>';
    }

    table += '</tr>';
    table += '</thead>';

    table += '<tbody>';
    for(let i = 0; i < data.length; i++){
        table += '<tr>';
        for(let j in data[i]) {
            table += '<td>' + data[i][j] + '</td>';
        }
        table += '</tr>';
    }
    table += '</tbody>';
    
    document.getElementById('record_table').innerHTML = table;
    
    renderTable();
});