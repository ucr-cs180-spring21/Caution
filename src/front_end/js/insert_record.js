function newRecord(){
    var attributeValues = [];

    var child = document.getElementsByClassName('recordForm');
    child = Array.prototype.slice.call(child);

    console.log(child);
    count += 1;
    attributeValues.push('B-' + count);
    for (var i = 0; i < child.length; i++){
        attributeValues.push(child[i].value);
    }
    //console.log(attributeValues);
    socket.emit('new', attributeValues);
}