function querySnow(data) {
    var re = []

    for(var j = 0; j < data.length; j++) {
        if (data[j][31] == 'Light Snow'){
            re.push(data[j]);
        }
    }
    retdata = [];

    for(var i = 0; i < re.length; i++) {
        var arrayToString = JSON.stringify(Object.assign({}, re[i]));
        var stringToJsonObject = JSON.parse(arrayToString);
        retdata.push(stringToJsonObject);
    }

    return retdata;
}

function queryHumid(data) {
    var re = []

    for(var j = 0; j < data.length; j++) {
        if (data[j][25] == '100'){
            re.push(data[j]);
        }
    }

    retdata = [];

    for(var i = 0; i < re.length; i++) {
        var arrayToString = JSON.stringify(Object.assign({}, re[i]));
        var stringToJsonObject = JSON.parse(arrayToString);
        retdata.push(stringToJsonObject);
    }

    return retdata;
}

function queryTrafficSig(data) {
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

    return retdata;
}

function querySeverity(data) {
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

    return retdata;
}

function queryTimezone(data) {
    var re = []

    for(var j = 0; j < data.length; j++) {
        if (data[j][20] == 'US/Eastern'){
            re.push(data[j]);
        }
    }

    retdata = [];

    for(var i = 0; i < re.length; i++) {
        var arrayToString = JSON.stringify(Object.assign({}, re[i]));
        var stringToJsonObject = JSON.parse(arrayToString);
        retdata.push(stringToJsonObject);
    }

    return retdata;
}

function queryCity(data) {
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

    return retdata;
}

function queryAirport(data) {
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

    return retdata;
}

function queryPressure(data) {
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

    return retdata;
}