function updateQueryTable(getAllRecords) {
    let queryRequest;

    if (getAllRecords) {
        queryRequest = "all_records";
    } else {
        let query = document.getElementById("table_options_query_select").value;

        switch(query) {
            case "traffic_signal_true":
                queryRequest = "traffic_signal_true";
                break;
            case "weather_condition_light_snow":
                queryRequest = "weather_condition_light_snow";
                break;
            case "humidity_100%":
                queryRequest = "humidity_100%";
                break;
            case "severity_3/3":
                queryRequest = "severity_3/3";
                break;
            case "timezone_us/eastern":
                queryRequest = "timezone_us/eastern";
                break;
            case "city_dayton":
                queryRequest = "city_dayton";
                break;
            case "airport_kday":
                queryRequest = "airport_kday";
                break;
            case "pressure_29.61_in":
                queryRequest = "pressure_29.61_in";
                break;
        }
    }

    socket.emit("query", queryRequest, displayQueryTable);
}

function renderTable(tableID) {
    $('#' + tableID).DataTable({
        "pagingType": "full_numbers",
        "bDestroy": true,
        "ordering": false
    }); 
}

function displayTable(data, attributes, tableID) {
    let table = "";

    table += '<thead>';
    table += '<tr>';
    
    for(let i of attributes)
        table += '<th>' + i + '</th>';

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
    
    document.getElementById(tableID).innerHTML = table;
    
    renderTable(tableID);
}

function displayQueryTable(data) {
    let attributes = ['ID', 'Source', 'TMC', 'Severity', 'Start_Time', 'End_Time', 'Start_Lat', 'Start_Lng', 'End_Lat', 
                      'End_Lng', 'Distance(mi)', 'Description', 'Number', 'Street', 'Side', 'City', 'County', 'State', 'Zipcode', 'Country', 
                      'Timezone', 'Airport_Code', 'Weather_Timestamp', 'Temperature(F)', 'Wind_Chill(F)', 'Humidity(%)', 'Pressure(in)', 
                      'Visibility(mi)', 'Wind_Direction', 'Wind_Speed(mph)', 'Precipitation(in)', 'Weather_Condition', 'Amenity', 'Bump', 
                      'Crossing', 'Give_Way', 'Junction', 'No_Exit', 'Railway', 'Roundabout', 'Station', 'Stop', 'Traffic_Calming', 
                      'Traffic_Signal', 'Turning_Loop', 'Sunrise_Sunset', 'Civil_Twilight', 'Nautical_Twilight', 'Astronomical_Twilight'];

    displayTable(data, attributes, 'record_table');
}