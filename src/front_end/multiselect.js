(function(values, sel) {
    var sel = document.querySelector('select');
    values = new Array(sel.length);
  
    sel.addEventListener('click', function(e) {
        values[e.target.index] = !values[e.target.index];    
        for(var i = 0; i < values.length; ++i) {
            sel.options[i].selected = values[i];
        }
    });
})();