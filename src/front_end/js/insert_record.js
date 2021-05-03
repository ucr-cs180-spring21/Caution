function insertRecord() {
    let attributeValues = [];

    let gridContainer = document.getElementById('insert_record_grid');
    for (let element of gridContainer.children) {
        if (element.tagName == "INPUT") {
            attributeValues.push(element.value);
        }
    }

    socket.emit('new', attributeValues);
    updateTable();
}