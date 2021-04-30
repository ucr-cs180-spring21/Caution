function del() {
    var id = document.getElementById('delete_record_record_id');
    socket.emit('delete', id.value);
}