function buttonBackup() {
    var fn = document.getElementById('fileName');
    socket.emit('backup');
}

function updateCSV() {
    var fn = document.getElementById('fileName');
    socket.emit('updateinput', fn.value);
}

socket.on('csvexport', function(csvContent) {
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
});

socket.on('backup', function(backup){
    console.log('backup successful'); 
});