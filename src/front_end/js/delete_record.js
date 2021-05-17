//var { tableCache } = require('./analytics');

function del() {
    var id = document.getElementById('delete_record_record_id').value;
    /*if(tableCache.has(id) == true) {
        tableCache.delete(id);
    }*/
    socket.emit('delete', id);
    updateTable();
}