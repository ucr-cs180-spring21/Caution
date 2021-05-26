function getGraphData(data, query) {
    let graphData;

    switch (query) {
        case 'Weather_Condition':
            graphData = getFrequencyData(data, 31, "Weather VS Frequency of Accidents", "Weather", "Frequency of Accidents");
            break;
        case 'Humidity(%)':
            graphData = getHumidityGraphData(data);
            break;
        case 'Distance(mi)':
            graphData = getFrequencyData(data, 10, "Distance(mi) VS Frequency of Accidents", "Distance(mi)", "Frequency of Accidents");
            break;
        case 'Bump':
            graphData = getFrequencyData(data, 33, "Bump VS Frequency of Accidents", "Bump", "Frequency of Accidents");
            break;
        case 'Stop':
            graphData = getFrequencyData(data, 41, "Stop VS Frequency of Accidents", "Stop", "Frequency of Accidents");
            break;
        case 'State':
            graphData = getFrequencyData(data, 17, "State VS Frequency of Accidents", "State", "Frequency of Accidents");
            break;
        case 'Zipcode':
            graphData = getFrequencyData(data, 18, "Zipcode VS Frequency of Accidents", "Zipcode", "Frequency of Accidents");
            break;
        case 'Side':
            graphData = getFrequencyData(data, 14, "Side VS Frequency of Accidents", "Side", "Frequency of Accidents");
            break;
    }
    
    return graphData;
}

function getFrequencyData(data, columnIndex, pTitle, pTitleX, pTitleY) {
    let graphData = {};

    for (record of data) {
        let count = graphData[record[columnIndex]];
        if (!count)
            graphData[record[columnIndex]] = 1;
        else
            graphData[record[columnIndex]]++;
    }

    return { 
        graphX: Object.keys(graphData), 
        graphY: Object.values(graphData),
        title: pTitle,
        titleX: pTitleX,
        titleY: pTitleY
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
        graphY: Object.values(humidityValues),
        title: "Humidity VS Number of Accidents",
        titleX: "Humidity",
        titleY: "Number of Accidents"
    };
}

exports.getGraphData = getGraphData;