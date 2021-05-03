function updateGraph(query) {
    //let query;
    socket.emit('getGraphData', query);
}

function renderGraph(graphX, graphY) {
    const data = {
        labels: graphX,
        datasets: [{
            label: "Analytics Bar Graph",
            data: graphY,
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

    new Chart(document.getElementById('analytics_graph'), config);
}

socket.on('renderGraph', renderGraph);