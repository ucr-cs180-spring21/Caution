function queryRecords(data, queryType) {
    let returnData;

    switch (queryType) {
        case "all_records":
            returnData = data;
            break;
        case "traffic_signal_true":
            returnData = getQueryResults(data, 43, 'TRUE');
            break;
        case "weather_condition_light_snow":
            returnData = getQueryResults(data, 31, 'Light Snow');
            break;
        case "humidity_100%":
            returnData = getQueryResults(data, 25, '100');
            break;
        case "severity_3/3":
            returnData = getQueryResults(data, 3, '3');
            break;
        case "timezone_us/eastern":
            returnData = getQueryResults(data, 20, 'US/Eastern');
            break;
        case "city_dayton":
            returnData = getQueryResults(data, 15, 'Dayton');
            break;
        case "airport_kday":
            returnData = getQueryResults(data, 21, 'KDAY');
            break;
        case "pressure_29.61_in":
            returnData = getQueryResults(data, 26, '29.61');
            break;
    }

    return returnData;
}

function getQueryResults(data, columnIndex, value) {
    var returnData = []

    for(let i = 0; i < data.length; i++) {
        if (data[i][columnIndex] == value){
            returnData.push(data[i]);
        }
    }

    return returnData;
}

exports.queryRecords = queryRecords;