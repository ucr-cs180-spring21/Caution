function updateTable(getAllRecords) {
    if (getAllRecords) {
        socket.emit("query", "all_records");
        return;
    }

    let query = document.getElementById("table_options_query_select").value;

    switch(query) {
        case "traffic_signal_true":
            socket.emit("query", "traffic_signal_true");
            break;
        case "weather_condition_light_snow":
            socket.emit("query", "weather_condition_light_snow");
            break;
        case "humidity_100%":
            socket.emit("query", "humidity_100%");
            break;
        case "severity_3/3":
            socket.emit("query", "severity_3/3");
            break;
        case "timezone_us/eastern":
            socket.emit("query", "timezone_us/eastern");
            break;
        case "city_dayton":
            socket.emit("query", "city_dayton");
            break;
        case "airport_kday":
            socket.emit("query", "airport_kday");
            break;
        case "pressure_29.61_in":
            socket.emit("query", "pressure_29.61_in");
            break;
    }
}

function renderTable() {
    $('#record_table').DataTable({
        "pagingType": "full_numbers",
        "bDestroy": true,
        "ordering": false
    });   
}

function displayTable(data) {
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

    if (data) {
        for(let i = 0; i < data.length; i++){
            table += '<tr>';
            for(let j in data[i]) {
                table += '<td>' + data[i][j] + '</td>';
            }
            table += '</tr>';
        }
    }

    table += '</tbody>';
    
    document.getElementById('record_table').innerHTML = table;
    
    renderTable();
}

socket.on('senddata', displayTable);
