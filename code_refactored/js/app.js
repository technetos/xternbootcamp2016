$(document).foundation();

var App = {
    
    buildElement: function(options) {
        if(options) {
            // Create the HTML element options.what.
            if(options.what) {
                var element = document.createElement(options.what);
                
                // Set the id attribute.
                if(options.id) { element.setAttribute('id', options.id); }

                // Set classname.
                if(options.classname) { element.classname = options.classname; }
                
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
    
    buildListItemFunctions: function(li) {
        if(li) {

            // Remove
            li.appendChild(this.buildElement({
                what:'a', id:'remove-link', classname:'remove-link', href:'#', text:'Remove', func:function() {
                    li.parentNode.removeChild(li);
                }
            }));
            
            // Up
            li.appendChild(this.buildElement({
                what:'a', id:'up-link', classname:'up-link', href:'#', text:'Up', func:function() {
                    if(li.previousSibling) {
                        li.parentNode.insertBefore(li, li.previousSibling);
                    }
                }
            }));

            // Down
            li.appendChild(this.buildElement({
                what:'a', id:'down-link', classname:'down-link', href:'#', text:'Down', func:function() {
                    if(li.nextSibling) {
                        li.parentNode.insertBefore(li.nextSibling, li);
                    }
                }
            }));

            // Top
            li.appendChild(this.buildElement({
                what:'a', id:'top-link', classname:'top-link', href:'#', text:'Top', func:function() {
                    if(li.parentNode.firstChild !== li) {
                        li.parentNode.insertBefore(li, li.parentNode.firstChild);
                    }
                }
            }));

            // Bottom
            li.appendChild(this.buildElement({
                what:'a', id:'bottom-link', classname:'bottom-link', href:'#', text:'Bottom', func:function() {
                    if(li.parentNode.lastChild !== li) {
                        li.parentNode.appendChild(li);
                    }
                }
            }));

            // Edit
            li.appendChild(this.buildElement({
                what:'a', id:'editable-link', classname:'editable-link', href:'#', text:'Edit', func:function() {
                    var span = li.querySelector('#entryContents');
                    var spanModifierLink = span.parentNode.querySelector('#editable-link');
                    if(span.contentEditable === 'true') {
                        span.contentEditable = 'false';
                        spanModifierLink.innerText = 'Edit';
                    } else {
                        span.contentEditable = 'true';
                        spanModifierLink.innerText = 'Update';
                        span.focus();
                    }

                }
            }));

            return li;
        }
    },

    buildListItem: function(data) {
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

        // Set the formData to the content of the form input.
        var formData = f.inputForm.value;

        // Create the list item.
        var listItem = this.buildListItemFunctions(this.buildListItem(formData));

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
