function buttonBackup() {
    socket.emit('backup');
}

function updateCSV() {
    var fn = document.getElementById('import_csv_file_id');
    socket.emit('updateinput', fn.value);
}

socket.on('csvexport', function(csvContent) {
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
});

socket.on('backup', function(backup){
    console.log('backup successful'); 
});