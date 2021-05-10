// const data = {
//     labels: [],
//     datasets: [{
//         label: "",
//         data: [],
//         borderWidth: 2
//     }]
// };

// const config = {
//     type: 'bar',
//     data: data,
//     options: {
//         plugins: {
//             title: {
//                 display: true,
//                 text: "",
//                 font: {
//                     size: 20,
//                     weight: 'bold'
//                 }
//             }
//         },
//         scales: {
//             x: {
//                 display: true,
//                 title: {
//                     display: true,
//                     text: "",
//                     font: {
//                         size: 16,
//                         weight: 'bold'
//                     }
//                 }
//             },
//             y: {
//                 display: true,
//                 title: {
//                     display: true,
//                     text: "",
//                     font: {
//                         size: 16,
//                         weight: 'bold'
//                     }
//                 },
//                 beginAtZero: true
//             }
//         }
//     },
// };

let chart;

function updateGraph() {
    let query = document.getElementById('analytics_query_select').value;
    console.log(query);
    socket.emit('cfilterFrequency', query);
}

// function renderGraph(graphX, graphY, title, titleX, titleY) {
//     if (!chart) {
//         chart = new Chart(document.getElementById('analytics_graph'), config);
//     }

//     chart.data.labels = graphX;
//     chart.data.datasets[0].data = graphY;
//     chart.options.plugins.title.text = title;
//     chart.options.scales.x.title.text = titleX;
//     chart.options.scales.y.title.text = titleY;
//     chart.update();
// }

socket.on('sfilterFrequency', function(arrayOfFrequencies){
    console.log("Comes back to client")
    console.log(arrayOfFrequencies);

    /*Bar Chart JavaScript
    Method Learned from: https://stackoverflow.com/questions/55290321/parsing-json-data-into-chart-js-bar-chart
    Biggest issue I had is the table doesn't work well when the let data is changed to another variable name that
    may have been just a stupid issue though */
    var ctx = document.getElementById('myChart').getContext('2d');

    let Xvals = [];
    let Yvals = [];
    var sz = arrayOfFrequencies.length-1;
    //data = arrayOfFrequencies.slice(1, sz);
    data = arrayOfFrequencies.slice(1, arrayOfFrequencies.length);

    try {
        data.map((item) => {
            console.log(item.Value);
            Yvals.push(item.Count);
            Xvals.push(item.Value);
    });


    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
        labels: [...Xvals],
        datasets: [{
            label: 'Accidents',
            data: [...Yvals],
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
        },
    });

    } catch (error) {
        console.log(error);
    }

    //var table = document.getElementById('infotable');
    //table.style.display = 'none';

    var table = '<table>';
    table += '<thead>'
    table += '<tr>';
    var labels = ['Analytic', 'Count'];
    for(var i in labels) {
        table += '<th>' + labels[i] + '</th>';
    }

    table += '</tr>';
    table += '<tbody>';
    for(var j = 1; j < arrayOfFrequencies.length; j++){
        table += '<tr>';
        for(var k in arrayOfFrequencies[j]){
        table += '<td>' + arrayOfFrequencies[j][k] + '</td>';
        }
        table += '</tr>';
    }
    table += '</tbody>';
    table += '</table>';
    document.getElementById('analytics_table').innerHTML = table;

    $(document).ready(function() {
        $('#analytics_table').DataTable( {
            "pagingType": "full_numbers",
            "bDestroy": true,
            "ordering": false
        } );
    });

});


function buttonfrequencyState() {
    console.log("Goes to server");
    socket.emit('frequency_of_filter', 'State');
}