function getGraphData(data, query) {
    let graphData;

    switch (query) {
        case 'Weather_Condition':
            graphData = getFrequencyData(data, 31, "Weather VS Frequency of Accidents", "Weather", "Frequency of Accidents");
            break;
        case 'Humidity(%)':
            graphData = getFrequencyData(data, 25, "Humidity(%) VS Frequency of Accidents", "Humidity(%)", "Frequency of Accidents");
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

function getAvgGraphData(data, query) {
    let avgGraphData;

    switch (query) {
        case 'Weather_Condition,Severity':
            avgGraphData = getAvgData(data, 31, 3, "Weather VS Average Severity of Accidents", "Weather", "Average Severity of Accidents");
            break;
        case 'Airport_Code,Severity':
            avgGraphData = getAvgData(data, 21, 3, "Airport VS Average Severity of Accidents", "Airport", "Average Severity of Accidents");
            break;
        case 'Humidity(%),Severity':
            avgGraphData = getAvgData(data, 25, 3, "Humidity(%) VS Average Severity of Accidents", "Humidity(%)", "Average Severity of Accidents");
            break;
        case 'Wind_Direction,Wind_Speed(mph)':
            avgGraphData = getAvgData(data, 28, 29, "Wind Direction VS Average Wind Speed(mph) of Accidents", "Wind Direction", "Average Wind Speed(mph) of Accidents");
            break;
        case 'Weather_Condition,Visibility(mi)':
            avgGraphData = getAvgData(data, 31, 27, "Weather VS Average Visibility(mi) of Accidents", "Weather", "Average Visibility(mi) of Accidents");
            break;
    }

    return avgGraphData;
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

function getAvgData(data, xColumnIndex, yColumnIndex, pTitle, pTitleX, pTitleY) {
    let graphData = {};
    let categoryCounts = {};

    for (record of data) {
        let total = graphData[record[xColumnIndex]];
        if (!total) {
            graphData[record[xColumnIndex]] = Number(record[yColumnIndex]);
            categoryCounts[record[xColumnIndex]] = 1;
        } else {
            graphData[record[xColumnIndex]] += Number(record[yColumnIndex]);
            categoryCounts[record[xColumnIndex]]++;
        }
    }

    for (const xVal in graphData)
        graphData[xVal] /= categoryCounts[xVal];

    return { 
        graphX: Object.keys(graphData), 
        graphY: Object.values(graphData),
        title: pTitle,
        titleX: pTitleX,
        titleY: pTitleY
    };
}

exports.getGraphData = getGraphData;
exports.getAvgGraphData = getAvgGraphData;