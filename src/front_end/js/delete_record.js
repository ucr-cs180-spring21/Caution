function del() {
    var id = document.getElementById('delete_record_record_id').value;
    socket.emit('delete', id, function(confirmMessage) {
        console.log(confirmMessage);
        updateTable();
    });
}