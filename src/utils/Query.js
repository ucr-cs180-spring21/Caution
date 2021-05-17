function queryRecords(data, queryType) {
    let returnData;

    switch (queryType) {
        case "all_records":
            returnData = data;
            break;
        case "traffic_signal_true":
            returnData = queryTrafficSig(data);
            break;
        case "weather_condition_light_snow":
            returnData = querySnow(data);
            break;
        case "humidity_100%":
            returnData = queryHumid(data);
            break;
        case "severity_3/3":
            returnData = querySeverity(data);
            break;
        case "timezone_us/eastern":
            returnData = queryTimezone(data);
            break;
        case "city_dayton":
            returnData = queryCity(data);
            break;
        case "airport_kday":
            returnData = queryAirport(data);
            break;
        case "pressure_29.61_in":
            returnData = queryPressure(data);
            break;
    }

    return returnData;
}

function querySnow(data) {
    var returnData = []

    for(var j = 0; j < data.length; j++) {
        if (data[j][31] == 'Light Snow'){
            returnData.push(data[j]);
        }
    }

    return returnData;
}

function queryHumid(data) {
    var returnData = []

    for(var j = 0; j < data.length; j++) {
        if (data[j][25] == '100'){
            returnData.push(data[j]);
        }
    }

    return returnData;
}

function queryTrafficSig(data) {
    var returnData = []

    for(var j = 0; j < data.length; j++) {
        if (data[j][43] == 'TRUE'){
            returnData.push(data[j]);
        }
    }

    return returnData;
}

function querySeverity(data) {
    var returnData = []

    for(var j = 0; j < data.length; j++) {
        if (data[j][3] == '3'){
            returnData.push(data[j]);
        }
    }

    return returnData;
}

function queryTimezone(data) {
    var returnData = []

    for(var j = 0; j < data.length; j++) {
        if (data[j][20] == 'US/Eastern'){
            returnData.push(data[j]);
        }
    }

    return returnData;
}

function queryCity(data) {
    var returnData = []

    for(var j = 0; j < data.length; j++) {
        if (data[j][15] == 'Dayton'){
            returnData.push(data[j]);
        }
    }

    return returnData;
}

function queryAirport(data) {
    var returnData = []

    for(var j = 0; j < data.length; j++) {
        if (data[j][21] == 'KDAY'){
            returnData.push(data[j]);
        }
    }

    return returnData;
}

function queryPressure(data) {
    var returnData = []

    for(var j = 0; j < data.length; j++) {
        if (data[j][26] == '29.61'){
            returnData.push(data[j]);
        }
    }

    return returnData;
}

exports.queryRecords = queryRecords;