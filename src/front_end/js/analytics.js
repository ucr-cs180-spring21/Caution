//const { Chart } = require("chart.js");

// Global variables
var tableCache = new Map(); // This is for improving performance
var newValueAdded = false;
var myChart;
var t0;
var t1;

let chart;

function updateGraph() {
    let query = document.getElementById('analytics_query_select').value;
    console.log(query);

    t0 = performance.now();

    if(tableCache.has(query) == false) { // If the table has not been created before call the backend else just display 
        socket.emit('cfilterFrequency', query);   
    }
    else { 
        displayExistingAnalytics(query);
        t1 = performance.now()
        console.log("Took " + (t1 - t0) + " milliseconds.")
    }
}

function updateGraph_Avg() {
    let query = document.getElementById('analytics_query_select_incremental').value;
    console.log(query);

    t0 = performance.now();

    if(tableCache.has(query) == false) { // If the table has not been created before call the backend else just display 
        if(query.includes('Weather_Condition,Severity')){
            socket.emit('average', 'Weather_Condition', 'Severity');
        }
        else if(query.includes('Airport_Code')){
            socket.emit('average', 'Airport_Code', 'Severity');
        }
        else if(query.includes('Humidity(%)')){
            socket.emit('average', 'Humidity(%)', 'Severity');
        }
        else if(query.includes('Wind_Speed(mph)')){
            socket.emit('average', 'Wind_Direction', 'Wind_Speed(mph)');
        }
        else if(query.includes('Visibility(mi)')){
            socket.emit('average', 'Weather_Condition', 'Visibility(mi)');
        }
        //socket.emit('average', query);   
    }
    else { 
        displayExistingAnalytics(query);
        t1 = performance.now()
        console.log("Took " + (t1 - t0) + " milliseconds.")
    }
}

// If the table already exists just redisplay that so it doesn't show 
function displayExistingAnalytics(nameOfAnalytic) {
    arrayOfFrequencies = tableCache.get(nameOfAnalytic);
    console.log("The table exists in our cache so use that one")
    
    /*Bar Chart JavaScript
    Method Learned from: https://stackoverflow.com/questions/55290321/parsing-json-data-into-chart-js-bar-chart
    Biggest issue I had is the table doesn't work well when the let data is changed to another variable name that
    may have been just a stupid issue though */
    var ctx = document.getElementById('myChart').getContext('2d');

    let Xvals = [];
    let Yvals = [];
    var zip_d = [];
    var dict = {};
    var sz = arrayOfFrequencies.length-1;

    //data = arrayOfFrequencies.slice(1, sz);
    data = arrayOfFrequencies.slice(1, arrayOfFrequencies.length);

    try {
        data.map((item) => {
            //console.log(item.Value);
            Yvals.push(item.Count);
            Xvals.push(item.Value);
            dict[item.Count] = item.Value;
        });

        if(nameOfAnalytic === 'Zipcode'){
            Yvals.sort().reverse();
            Yvals = Yvals.slice(0, 10);
            zip_d = Yvals;
            Xvals = [];

            for(var i = 0; i<Yvals.length; i++){
                Xvals.push(dict[Yvals[i]]);
            }

            console.log('Zipcode data');
            console.log(zip_d);
        }

        //console.log(myChart);

        if (!myChart) {
            myChart = new Chart(ctx, {
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
        }
        else {
            myChart.data.labels = Xvals;
            myChart.data.datasets[0].data = Yvals;
            myChart.update();
        }
    } catch (error) {
        console.log(error);
    }


    //var table = document.getElementById('infotable');
    //table.style.display = 'none';
    data = arrayOfFrequencies.slice(0, arrayOfFrequencies.length);

    var table = '<table>';
    table += '<thead>'
    table += '<tr>';
    var labels = ['Analytic', 'Count'];
    for(var i in labels) {
        table += '<th>' + labels[i] + '</th>';
    }

    table += '</tr>';
    table += '<tbody>';
    for(var j = 1; j < data.length; j++){
        table += '<tr>';
        for(var k in data[j]){
            table += '<td>' + data[j][k] + '</td>';
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

};


socket.on('sfilterFrequency', function(arrayOfFrequencies, id){
    console.log("Comes back to client TESTING")

    // Add to table since it doesn't exist
    tableCache.set(id, arrayOfFrequencies)
    //console.log(tableCache.get(id))

    /*Bar Chart JavaScript
    Method Learned from: https://stackoverflow.com/questions/55290321/parsing-json-data-into-chart-js-bar-chart
    Biggest issue I had is the table doesn't work well when the let data is changed to another variable name that
    may have been just a stupid issue though */

    var ctx = document.getElementById('myChart').getContext('2d');

    let Xvals = [];
    let Yvals = [];
    var zip_d = [];
    var dict = {};
    var sz = arrayOfFrequencies.length-1;

    //data = arrayOfFrequencies.slice(1, sz);
    data = arrayOfFrequencies.slice(1, arrayOfFrequencies.length);

    try {
        data.map((item) => {
            //console.log(item.Value);
            Yvals.push(item.Count);
            Xvals.push(item.Value);
            dict[item.Count] = item.Value;
        });

        if(id === 'Zipcode'){
            Yvals.sort().reverse();
            Yvals = Yvals.slice(0, 10);
            zip_d = Yvals;
            Xvals = [];

            for(var i = 0; i<Yvals.length; i++){
                Xvals.push(dict[Yvals[i]]);
            }

            console.log('Zipcode data');
            console.log(zip_d);
        }

        if (myChart) myChart.destroy();
        myChart = new Chart(ctx, {
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
    data = arrayOfFrequencies.slice(0, arrayOfFrequencies.length);
    console.log(data);

    var table = '<table>';
    table += '<thead>'
    table += '<tr>';
    var labels = ['Analytic', 'Count'];
    for(var i in labels) {
        table += '<th>' + labels[i] + '</th>';
    }

    table += '</tr>';
    table += '<tbody>';
    for(var j = 1; j < data.length; j++){
        table += '<tr>';
        for(var k in data[j]){
            table += '<td>' + data[j][k] + '</td>';
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
    t1 = performance.now();
    console.log("Took " + (t1 - t0) + " milliseconds.");
});

//exports.tableCache = tableCache;