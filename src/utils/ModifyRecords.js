function updateSnow(data, r_data) {
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

    return retdata;
}

function updateHumid(data, r_data) {
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

    return retdata;
}

function updateTrafficSig(data, r_data) {
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

    return retdata;
}

function updateSeverity(data, r_data) {
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

    return retdata;
}

function updateTimezone(data, r_data) {
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

    return retdata;
}

function updateCity(data, r_data) {
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

    return retdata;
}

function updateAirport(data, r_data) {
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

    return retdata;
}

function updatePressure(data, r_data) {
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

    return retdata;
}

function deleteRecord(data) {
    for(var j = 0; j < data.length; j++) {
        if (data[j][0] == id){
            data.splice(j, 1);
        }
    }
}

function insertRecord(data, field) {
    var retdata = []
    console.log(data[data.length-1]);
    retdata.push(field);
    data.push(field);

    return retdata;
}

exports.updateSnow = updateSnow;
exports.updateHumid = updateHumid;
exports.updateTrafficSig = updateTrafficSig;
exports.updateSeverity = updateSeverity;
exports.updateTimezone = updateTimezone;
exports.updateCity = updateCity;
exports.updateAirport = updateAirport;
exports.updatePressure = updatePressure;
exports.deleteRecord = deleteRecord;
exports.insertRecord = insertRecord;