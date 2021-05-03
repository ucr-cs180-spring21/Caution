function getGraphData(data, query) {
    let graphData;

    switch (query) {
        case 'weather':
            graphData = getWeatherGraphData(data);
            break;
        case 'weather-severity':
            graphData = getWeatherSeverityGraphData(data);
            break;
        case 'city':
            graphData = getCityGraphData(data);
            break;
        case 'humidity':
            graphData = getHumidityGraphData(data);
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
    let weatherSeverityMap = new Map();
    
    for (record of data) {
        let severityAndCount = weatherSeverityMap.get(record[31]);
        if (!severityAndCount) {
            weatherSeverityMap.set(record[31], { totalSeverity: parseInt(record[3]), totalCount: 1 });
        } else {
            let newTotalSeverity = severityAndCount.totalSeverity + parseInt(record[3]);
            let newTotalCount = severityAndCount.totalCount + 1;
            weatherSeverityMap.set(record[31], { totalSeverity: newTotalSeverity, totalCount: newTotalCount });
        }
    }

    weatherSeverityMap.forEach(function(value, key, map) {
        let avgSeverity = map.get(key).totalSeverity / map.get(key).totalCount;
        map.set(key, avgSeverity);
    });

    return { 
        graphX: Array.from(weatherSeverityMap.keys()), 
        graphY: Array.from(weatherSeverityMap.values())
    };
}

function getCityGraphData(data) {
    let cityMap = new Map();
    
    for (record of data) {
        let count = cityMap.get(record[15]);
        if (!count)
            cityMap.set(record[15], 1);
        else
            cityMap.set(record[15], count + 1);
    }

    return { 
        graphX: Array.from(cityMap.keys()), 
        graphY: Array.from(cityMap.values())
    };
}

function getHumidityGraphData(data) {
    let humidityValues = {
        "0-10": 0,
        "11-20": 0,
        "21-30": 0,
        "31-40": 0,
        "41-50": 0,
        "51-60": 0,
        "61-70": 0,
        "71-80": 0,
        "81-90": 0,
        "91-100": 0
    };
    
    for (record of data) {
        let humidity = parseInt(record[25]);
       
        if (humidity <= 10)
            humidityValues["0-10"]++;
        else if (humidity <= 20)
            humidityValues["11-20"]++;
        else if (humidity <= 30)
            humidityValues["21-30"]++;
        else if (humidity <= 40)
            humidityValues["31-40"]++;
        else if (humidity <= 50)
            humidityValues["41-50"]++;
        else if (humidity <= 60)
            humidityValues["51-60"]++;
        else if (humidity <= 70)
            humidityValues["61-70"]++;
        else if (humidity <= 80)
            humidityValues["71-80"]++;
        else if (humidity <= 90)
            humidityValues["81-90"]++;
        else if (humidity <= 100)
            humidityValues["91-100"]++;
    }

    return { 
        graphX: Object.keys(humidityValues), 
        graphY: Object.values(humidityValues)
    };
}

exports.getGraphData = getGraphData;