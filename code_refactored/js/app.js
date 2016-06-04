$(document).foundation();

var App = {
    
    buildElement: function(options) {
        if(options) {
            // Create the HTML element options.thing.
            if(options.thing) {
                var element = document.createElement(options.thing);
                
                // Set the id attribute.
                if(options.id) { element.setAttribute('id', options.id); }
                
                // Set the inner text.
                if(options.text) { element.innerText = options.text; }
                
                // Set the url that the href will point to.
                if(options.url) { element.href = options.url; }
                
                // Set the function that gets called when the element is clicked.
                if(options.func) { element.onclick = options.func; }
                
                // Return the element.
                return element;
            }
        } else { return undefined; }
    },

    buildEntry: function(entry) {

        // Create the list element.
        var listElement = this.buildElement({ thing:'li' });

        // Create the span element.
        var spanElement = this.buildElement({ thing:'span', id:'entryContents', text:entry });

        // Append spanElement as a child of listElement.
        listElement.appendChild(spanElement);

        return listElement;
    },

    newEntry: function(event) {
        event.preventDefault();

        // We used bind to retain `this` so we use event.currentTarget
        // to grab the event objects data.
        var f = event.currentTarget;

        // Set the entryContents to the content of the form input.
        var entryContents = f.inputForm.value;

        // Create the list entry.
        var entry = this.buildEntry(entryContents);

        // Grab the unsorted list HTML element we wish to append child nodes to.
        var unsortedList = document.querySelector('#dynamic-unsorted-list');

        // Prepend new entries to the unsorted list element.
        unsortedList.insertBefore(entry, unsortedList.firstChild);

        // Clear the inputForm after each usage.
        f.reset();

        // Retain focus on the inputForm.
        f.inputForm.focus();
    },

    setupEventListeners: function() {
        document.querySelector('#entryForm').onsubmit = this.newEntry.bind(this);
    },

    init: function() {
        this.setupEventListeners();
    },
};

App.init();
