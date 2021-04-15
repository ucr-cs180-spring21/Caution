
var btnGet = document.querySelector('.data');
var myTable = document.querySelector('#table');

var arr = [["3", "R", "Riverside", "8"],["4", "L", "Miami", "9"], 
["2", "R", "Houston", "7"]];

var headers = [];
var i;

if(arr[0].length > 0){
for (i = 1; i < arr[0].length+1; i++){
      headers.push("Col " + i);
}

btnGet.addEventListener('click', () => {
    var table = document.createElement('table');
    var headerRow = document.createElement('tr');

    headers.forEach(headerText => {
        var header = document.createElement('th');
        var textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    arr.forEach(emp => {
        var row = document.createElement('tr');
        
        Object.values(emp).forEach(text => {
            var cell = document.createElement('td');
            var textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        })

        table.appendChild(row);
    });

    myTable.appendChild(table);
});

}