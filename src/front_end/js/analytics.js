let analyticsCache = {};
let startTime;
let endTime;

const data = {
    labels: [],
    datasets: [{
        label: "",
        data: [],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        plugins: {
            title: {
                display: true,
                text: "",
                font: {
                    size: 20,
                    weight: 'bold'
                }
            },
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: "",
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: "",
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                beginAtZero: true
            }
        }
    },
};

let chart;

function updateGraph(isInc) {
    startTime = Date.now();

    let graphRequest = isInc ? 'getAvgGraphData' : 'getGraphData';
    let queryElementID = isInc ? 'inc_analytics_query_select' : 'analytics_query_select';
    let query = document.getElementById(queryElementID).value;

    if (analyticsCache[query]) {
        renderAndCacheAnalyticsDisplays(query, ...Object.values(analyticsCache[query]));
    } else {
        socket.emit(graphRequest, query, renderAndCacheAnalyticsDisplays);
    }
}

function renderAndCacheAnalyticsDisplays(query, graphX, graphY, title, titleX, titleY) {
    renderGraph(graphX, graphY, title, titleX, titleY);
    renderAnalyticsTable(graphX, graphY, titleX, titleY);

    endTime = Date.now();
    
    console.log(endTime - startTime);

    if (!analyticsCache[query])
        analyticsCache[query] = {};

    analyticsCache[query].graphX = graphX;
    analyticsCache[query].graphY = graphY;
    analyticsCache[query].title = title;
    analyticsCache[query].titleX = titleX;
    analyticsCache[query].titleY = titleY;
}

function renderGraph(graphX, graphY, title, titleX, titleY) {
    if (!chart) {
        chart = new Chart(document.getElementById('analytics_graph'), config);
    }

    chart.data.labels.splice(0, chart.data.labels.length);
    chart.data.datasets[0].data.splice(0, chart.data.datasets[0].data.length);

    for (xLabel of graphX)
        chart.data.labels.push(xLabel);

    for (yLabel of graphY)
        chart.data.datasets[0].data.push(yLabel);

    chart.options.plugins.title.text = title;
    chart.options.scales.x.title.text = titleX;
    chart.options.scales.y.title.text = titleY;
    chart.update();
}

function renderAnalyticsTable(graphX, graphY, titleX, titleY) {
    let attributes = [titleX, titleY];

    let data = [];
    for (let i = 0; i < graphX.length; i++)
        data.push([graphX[i], graphY[i]]);

    displayTable(data, attributes, 'analytics_table');
}

function clearCache() {
    analyticsCache = {};
}