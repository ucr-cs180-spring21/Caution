let frequencyGraphs = [
    {
        name: "Weather_Condition",
        columnIndex: 31,
        title: "Weather VS Frequency of Accidents",
        titleX: "Weather",
        titleY: "Frequency of Accidents"
    },
    {
        name: "Humidity(%)",
        columnIndex: 25,
        title: "Humidity(%) VS Frequency of Accidents",
        titleX: "Humidity(%)",
        titleY: "Frequency of Accidents"
    },
    {
        name: "Distance(mi)",
        columnIndex: 10,
        title: "Distance(mi) VS Frequency of Accidents",
        titleX: "Distance(mi)",
        titleY: "Frequency of Accidents"
    },
    {
        name: "Bump",
        columnIndex: 33,
        title: "Bump VS Frequency of Accidents",
        titleX: "Bump",
        titleY: "Frequency of Accidents"
    },
    {
        name: "Stop",
        columnIndex: 41,
        title: "Stop VS Frequency of Accidents",
        titleX: "Stop",
        titleY: "Frequency of Accidents"
    },
    {
        name: "State",
        columnIndex: 17,
        title: "State VS Frequency of Accidents",
        titleX: "State",
        titleY: "Frequency of Accidents"
    },
    {
        name: "Zipcode",
        columnIndex: 18,
        title: "Zipcode VS Frequency of Accidents",
        titleX: "Zipcode",
        titleY: "Frequency of Accidents"
    },
    {
        name: "Side",
        columnIndex: 14,
        title: "Side VS Frequency of Accidents",
        titleX: "Side",
        titleY: "Frequency of Accidents"
    }
];

let avgGraphs = [
    {
        name: "Weather_Condition,Severity",
        xColumnIndex: 31,
        yColumnIndex: 3,
        title: "Weather VS Average Severity of Accidents",
        titleX: "Weather",
        titleY: "Average Severity of Accidents"
    },
    {
        name: "Airport_Code,Severity",
        xColumnIndex: 21,
        yColumnIndex: 3,
        title: "Airport VS Average Severity of Accidents",
        titleX: "Airport",
        titleY: "Average Severity of Accidents"
    },
    {
        name: "Humidity(%),Severity",
        xColumnIndex: 25,
        yColumnIndex: 3,
        title: "Humidity(%) VS Average Severity of Accidents",
        titleX: "Humidity(%)",
        titleY: "Average Severity of Accidents"
    },
    {
        name: "Wind_Direction,Wind_Speed(mph)",
        xColumnIndex: 28,
        yColumnIndex: 29,
        title: "Wind Direction VS Average Wind Speed(mph) of Accidents",
        titleX: "Wind Direction",
        titleY: "Average Wind Speed(mph) of Accidents"
    },
    {
        name: "Weather_Condition,Visibility(mi)",
        xColumnIndex: 31,
        yColumnIndex: 27,
        title: "Weather VS Average Visibility(mi) of Accidents",
        titleX: "Weather",
        titleY: "Average Visibility(mi) of Accidents"
    }
];

function getGraphData(data, query) {
    let graphData;

    for (graph of frequencyGraphs) {
        if (graph.name == query) {
            graphData = getFrequencyData(data, graph.columnIndex, graph.title, graph.titleX, graph.titleY);
            break;
        }
    }
    
    return graphData;
}

function getAvgGraphData(data, query) {
    let avgGraphData;

    for (graph of avgGraphs) {
        if (graph.name == query) {
            avgGraphData = getAvgData(data, graph.xColumnIndex, graph.yColumnIndex, graph.title, graph.titleX, graph.titleY);
            break;
        }
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