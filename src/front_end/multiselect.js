// // Global variables
// var socket = io.connect();
// // Global variables
// let selectedFilters = [];

// // Function executes immediately and displays which filters are selected
// (function(filters, selectTag) {
//     var selectTag = document.querySelector('select');
//     filters = new Array(selectTag.length);
  
//     selectTag.addEventListener('click', function(e) {
//         // Initialize all the filters to be unselected 
//         filters[e.target.index] = !filters[e.target.index];
        
//         // If filter is selected, mark it
//         for(var i = 0; i < filters.length; ++i) {
//             selectTag.options[i].selected = filters[i];
//         }
//     });
// })();


// // This function gets the filters that are selected
// function updateFilters() {
//     selectedFilters.push(document.getElementById("multi-select").value);
//     console.log(selectedFilters)

//     // Removes duplicates, because it indicates that a filter has been unselected 
//     /*var uniqArray = new Array(1);
//     uniqArray.push(selectedFilters[0]);
//     console.log(uniqArray);
//     for(let i = 1; i < selectedFilters.length; ++i) {
//         for(let j = 0; j < uniqArray.length; ++j) {
//             if(selectedFilters[i] != uniqArray[j]) {
//                 uniqArray.push(selectedFilters);
//             }
//         }
//     }
//     selectedFilters.forEach((index) => {
//         if(!uniqArray.includes(index)) {
//             uniqArray.push(index)
//         }
//     });
//     console.log(uniqArray);
//     selectedFilters = [];
//     for(let i = 0; uniqArray.length; ++i) {
//         selectedFilters[i] = uniqArray[i];
//     }*/
// }


// // This function returns the names of the filters that were selected
// function getFilters() {
//     return selectedFilters;
// }

// // When the update button is pressed, update the table
// function updateTable(){
//     for(let i = 0; i < selectedFilters.length; ++i) {
//         switch(selectedFilters[i]) {
//             case 'bump':
//                 socket.emit('bump');
//             case 'snow':
//                 socket.emit('snow');
//             case 'humid':
//                 socket.emit('humid');
//             case 'severity':
//                 socket.emit('severity');
//             case 'timezone':
//                 socket.emit('timezone');
//             case 'city':
//                 socket.emit('city');
//             case 'airport':
//                 socket.emit('airport');
//             case 'pressure':
//                 socket.emit('pressure');
//         }
//     }
// }


// // Button is pressed clears the table
// function buttonClear() {
//     socket.emit('clear');
// }


// // When the server sends, update the HTML
// socket.on('hello world', function(data){
//     console.log("Hello World!");
//     document.getElementById("hellow").innerHTML = 'Hello World!';
// });


// socket.on('empty', function(data){
//     var table = '<table>';
//     table += '<tr>';
//     testarr = ['ID', 'Source', 'TMC', 'Severity', 'Start_Time', 'End_Time', 'Start_Lat', 'Start_Lng', 'End_Lat', 
//     'End_Lng', 'Distance(mi)', 'Description', 'Number', 'Street', 'Side', 'City', 'County', 'State', 'Zipcode', 'Country', 
//     'Timezone', 'Airport_Code', 'Weather_Timestamp', 'Temperature(F)', 'Wind_Chill(F)', 'Humidity(%)', 'Pressure(in)', 'Visibility(mi)',
//     'Wind_Direction', 'Wind_Speed(mph)', 'Precipitation(in)', 'Weather_Condition', 'Amenity', 'Bump', 'Crossing', 'Give_Way', 'Junction',
//     'No_Exit', 'Railway', 'Roundabout', 'Station', 'Stop', 'Traffic_Calming', 'Traffic_Signal', 'Turning_Loop', 'Sunrise_Sunset', 'Civil_Twilight',
//     'Nautical_Twilight', 'Astronomical_Twilight']
    
//     for(var i in data[0]) {
//         table += '<th>' + i + '</th>';
//         console.log(i);
//     }

//     table += '</tr>';
//     for(var j = 0; j < data.length; j++){
//         table += '<tr>';
//         for(var k in data[j]){
//         table += '<td>' + data[j][k] + '</td>';
//         }
//         table += '</tr>';
//     }
//     table += '</table>';
//     document.getElementById('infotable').innerHTML = table;
// });


// socket.on('senddata', function(data){
//     console.log("Received Data");
//     //method learned from: https://stackoverflow.com/questions/44127872/convert-array-of-objects-into-html-table-with-jquery-or-javascript
//     var table = '<table>';
//     table += '<tr>';
//     testarr = ['ID', 'Source', 'TMC', 'Severity', 'Start_Time', 'End_Time', 'Start_Lat', 'Start_Lng', 'End_Lat', 
//     'End_Lng', 'Distance(mi)', 'Description', 'Number', 'Street', 'Side', 'City', 'County', 'State', 'Zipcode', 'Country', 
//     'Timezone', 'Airport_Code', 'Weather_Timestamp', 'Temperature(F)', 'Wind_Chill(F)', 'Humidity(%)', 'Pressure(in)', 'Visibility(mi)',
//     'Wind_Direction', 'Wind_Speed(mph)', 'Precipitation(in)', 'Weather_Condition', 'Amenity', 'Bump', 'Crossing', 'Give_Way', 'Junction',
//     'No_Exit', 'Railway', 'Roundabout', 'Station', 'Stop', 'Traffic_Calming', 'Traffic_Signal', 'Turning_Loop', 'Sunrise_Sunset', 'Civil_Twilight',
//     'Nautical_Twilight', 'Astronomical_Twilight']
    
//     // for(var i in data[0]) {
//     // 	table += '<th>' + i + '</th>';
//     // 	console.log(i);
//     // }

//     for(var i in testarr) {
//         table += '<th>' + testarr[i] + '</th>';
//         console.log(i);
//     }

//     table += '</tr>';
//     for(var j = 0; j < data.length; j++){
//         table += '<tr>';
//         for(var k in data[j]){
//         table += '<td>' + data[j][k] + '</td>';
//         }
//         table += '</tr>';
//     }
//     table += '</table>';
//     document.getElementById('infotable').innerHTML = table;
// });