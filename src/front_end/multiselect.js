// Global variables
let selectedFilters = [];

// Function executes immediately and displays which filters are selected
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


// This function gets the filters that are selected
function updateFilters() {
    selectedFilters.push(document.getElementById("multi-select").value);
    console.log(selectedFilters)

    // Removes duplicates, because it indicates that a filter has been unselected 
    /*var uniqArray = new Array(1);
    uniqArray.push(selectedFilters[0]);

    console.log(uniqArray);
    for(let i = 1; i < selectedFilters.length; ++i) {
        for(let j = 0; j < uniqArray.length; ++j) {
            if(selectedFilters[i] != uniqArray[j]) {
                uniqArray.push(selectedFilters);
            }
        }
    }

    selectedFilters.forEach((index) => {
        if(!uniqArray.includes(index)) {
            uniqArray.push(index)
        }
    });

    console.log(uniqArray);

    selectedFilters = [];
    for(let i = 0; uniqArray.length; ++i) {
        selectedFilters[i] = uniqArray[i];
    }*/
}


// This function returns the names of the filters that were selected
function getFilters() {
    return selectedFilters;
}
