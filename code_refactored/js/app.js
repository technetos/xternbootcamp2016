$(document).foundation();

var App = {
    
    buildElement: function(options) {
        if(options) {
            // Create the HTML element options.what.
            if(options.what) {
                var element = document.createElement(options.what);
                
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
        }
    },
    
    buildListFunctions: function(entry) {
        if(entry) {
            // Remove
            entry.appendChild(this.buildElement({
                what:'a', id:'remove-link', href:'#', text:'Remove', func:function() {
                    entry.parentNode.removeChild(entry);
                }
            }));
            
            // Up
            entry.appendChild(this.buildElement({
                what:'a', id:'up-link', href:'#', text:'Up', func:function() {
                    if(entry.previousSibling) {
                        entry.parentNode.insertBefore(entry, entry.previousSibling);
                    }
                }
            }));

            // Down
            entry.appendChild(this.buildElement({
                what:'a', id:'down-link', href:'#', text:'Down', func:function() {
                    if(entry.nextSibling) {
                        entry.parentNode.insertBefore(entry.nextSibling, entry);
                    }
                }
            }));

            // Top
            entry.appendChild(this.buildElement({
                what:'a', id:'top-link', href:'#', text:'Top', func:function() {
                    if(entry.parentNode.firstChild !== entry) {
                        entry.parentNode.insertBefore(entry, entry.parentNode.firstChild);
                    }
                }
            }));

            // Bottom
            entry.appendChild(this.buildElement({
                what:'a', id:'bottom-link', href:'#', text:'Bottom', func:function() {
                    if(entry.parentNode.lastChild !== entry) {
                        entry.parentNode.appendChild(entry);
                    }
                }
            }));

            return entry;
        }
    },

    buildList: function(data) {
        if(data) {
            // Create the list element.
            var li = this.buildElement({ what:'li' });

            // Append a span HTML element as a child of li.
            li.appendChild(this.buildElement({ what:'span', id:'entryContents', text:data }));

            return li;
        }
    },

    newEntry: function(event) {
        event.preventDefault();

        // We used bind to retain `this` so we use event.currentTarget
        // to grab the event objects data.
        var f = event.currentTarget;

        // Set the entryContents to the content of the form input.
        var formData = f.inputForm.value;

        // Create the list item.
        var listItem = this.buildListFunctions(this.buildList(formData));

        // Grab the unsorted list HTML element we wish to append child nodes to.
        var unsortedList = document.querySelector('#dynamic-unsorted-list');

        // Prepend new list items to the unsorted list element.
        unsortedList.insertBefore(listItem, unsortedList.firstChild);

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
