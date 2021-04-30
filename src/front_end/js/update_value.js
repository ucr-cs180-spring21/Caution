function updateValue() {
    var id = document.getElementById('update_value_record_id');
    socket.emit('update', id.value);
}

socket.on('update_return', function(data) {
    var id = document.getElementById('update_value_record_id');
    var dd = document.getElementById('update_value_attribute_select');
    var newval = document.getElementById('update_value_new_value');
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