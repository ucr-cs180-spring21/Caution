// Function executes immediately 
(function(filters, selectTag) {
    var selectTag = document.querySelector('select');
    filters = new Array(selectTag.length);
  
    selectTag.addEventListener('click', function(e) {
        // Initialize all the filters to be unselected 
        filters[e.target.index] = !filters[e.target.index];
        
        // If filter is selected, mark it
        for(var i = 0; i < filters.length; ++i) {
            selectTag.options[i].selected = filters[i];
        }
    });
})();