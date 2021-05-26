function updateValue() {
    let id = document.getElementById('update_value_record_id').value;
    let attribute = document.getElementById('update_value_attribute_select').value;
    let newValue = document.getElementById('update_value_new_value').value;
    
    socket.emit('update', [id, attribute, newValue]);
    updateQueryTable(true);
}

function deleteRecord() {
    var id = document.getElementById('delete_record_record_id').value;

    socket.emit('delete', id);
    updateQueryTable(true);
}

function insertRecord() {
    let attributeValues = [];

    let gridContainer = document.getElementById('insert_record_grid');
    for (let element of gridContainer.children) {
        if (element.tagName == "INPUT") {
            attributeValues.push(element.value);
        }
    }

    socket.emit('new', attributeValues);
    updateQueryTable(true);
}