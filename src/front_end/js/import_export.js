function backup() {
    socket.emit('backup', onBackupReturn);
}

function onBackupReturn(message) {
    console.log(message);
}

function updateCSV() {
    let filename = document.getElementById('import_csv_file_id').value;
    socket.emit('updateinput', filename);
    clearCache();
}