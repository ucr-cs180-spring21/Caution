function getGraphData(data, query) {
    let graphData;

    switch (query) {
        case 'weather':
            graphData = getWeatherGraphData(data);
            break;
        case 'weather-severity':
            break;
        case 'city':
            break;
        case 'humidity':
            break;
    }

    return graphData;
}

function getWeatherGraphData(data) {
    let weatherMap = new Map();
    
    for (record of data) {
        let count = weatherMap.get(record[31]);
        if (!count)
            weatherMap.set(record[31], 1);
        else
            weatherMap.set(record[31], count + 1);
    }

    return { 
        graphX: Array.from(weatherMap.keys()), 
        graphY: Array.from(weatherMap.values())
    };
}

function getWeatherSeverityGraphData(data) {

}

function getCityGraphData(data) {

}

function getHumidityGraphData(data) {
    
}

exports.getGraphData = getGraphData;