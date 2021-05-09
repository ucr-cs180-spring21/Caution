const data = {
    labels: [],
    datasets: [{
        label: "",
        data: [],
        borderWidth: 2
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

function updateGraph() {
    let query = document.getElementById('analytics_query_select').value;
    socket.emit('getGraphData', query, renderGraph);
}

function renderGraph(graphX, graphY, title, titleX, titleY) {
    if (!chart) {
        chart = new Chart(document.getElementById('analytics_graph'), config);
    }

    chart.data.labels = graphX;
    chart.data.datasets[0].data = graphY;
    chart.options.plugins.title.text = title;
    chart.options.scales.x.title.text = titleX;
    chart.options.scales.y.title.text = titleY;
    chart.update();
}