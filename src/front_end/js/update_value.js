function updateValue() {
    let id = document.getElementById('update_value_record_id').value;
    let attribute = document.getElementById('update_value_attribute_select').value;
    let newValue = document.getElementById('update_value_new_value').value;
    
    socket.emit('update', [id, attribute, newValue]);
    updateTable();
}