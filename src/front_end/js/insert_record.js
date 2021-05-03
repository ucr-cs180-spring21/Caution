function insertRecord() {
    let attributeValues = [];

    // var child = document.getElementsByClassName('recordForm');
    // child = Array.prototype.slice.call(child);

    // console.log(child);
    // count += 1;
    // attributeValues.push('B-' + count);
    // for (var i = 0; i < child.length; i++){
    //     attributeValues.push(child[i].value);
    // }

    let gridContainer = document.getElementById('insert_record_grid');
    for (let element of gridContainer.children) {
        if (element.tagName == "INPUT") {
            attributeValues.push(element.value);
        }
    }

    socket.emit('new', attributeValues);
    updateTable();
}