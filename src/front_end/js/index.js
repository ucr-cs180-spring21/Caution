let collapseButtons = document.querySelectorAll('.collapse_button');

collapseButtons.forEach(function(button) {
    let id = button.id;
    let prefixEndIndex = id.indexOf("collapse_button");
    let collapsibleID = id.substring(0, prefixEndIndex) + "container";
    let collapsible = document.getElementById(collapsibleID);

    button.addEventListener("click", function() {
        const accordionContent = button.nextElementSibling;
        //collapsible.classList.toggle("collapsed");
        button.classList.toggle("collapsed");
        console.log(collapsibleID);
        
        if(button.classList.contains("collapsed")) {
            accordionContent.style.maxHeight = accordionContent.scrollHeight * 2 + 'px';
        } else {
            accordionContent.style.maxHeight = 0;
        }
        console.log(accordionContent.scrollHeight *3 + 'px');
    });

});
