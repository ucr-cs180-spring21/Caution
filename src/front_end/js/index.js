let collapseButtons = document.querySelectorAll('.collapse_button');
collapseButtons.forEach(function(button) {
    let id = button.id;
    let prefixEndIndex = id.indexOf("collapse_button");
    let collapsibleID = id.substring(0, prefixEndIndex) + "container";
    let collapsible = document.getElementById(collapsibleID);

    button.addEventListener("click", function() {
        collapsible.classList.toggle("collapsed");
    });
});