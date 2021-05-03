const data = {
    labels: [],
    datasets: [{
        label: "Analytics Bar Graph",
        data: [],
        borderWidth: 1
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
};

var chart = new Chart(document.getElementById('analytics_graph'), config);

function updateGraph() {
    let query = document.getElementById('analytics_query_select').value;
    socket.emit('getGraphData', query);
}

function renderGraph(graphX, graphY) {
    chart.data.labels = graphX;
    chart.data.datasets[0].data = graphY;
    chart.update();
}

socket.on('renderGraph', renderGraph);