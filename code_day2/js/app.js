$(document).foundation();

var RosterObject = {

    prependChild: function(parent, child) {
        parent.insertBefore(child, parent.firstChild);
    },

    buildLink: function(options) {
        
        // Create anchor element.
        var link = document.createElement('a');

        // Yay url. 
        link.href = '#';

        // Set the button text options.text.
        link.innerText = options.text;

        // Set the event handler to option.func.
        link.onclick = options.func;

        // Return newly created link.
        return link;
    },

    deleteLink: function(item) {
        var linkObject = {
            text: 'Remove',
            // Call remove child from the parent node of item.
            func: function() { item.parentElement.removeChild(item); }
        }
        return this.buildLink(linkObject);
    },

    upLink: function(item) {
        var linkObject = {
            text: 'Up',
            func: function() {
                if(item.previousSibling) {
                    item.parentNode.insertBefore(item, item.previousSibling);
                }
            }
        }
        return this.buildLink(linkObject);
    },

    downLink: function(item) {
        var linkObject = {
            text: 'Down',
            func: function() {
                if(item.nextSibling) {
                    item.parentNode.insertBefore(item.nextSibling, item);
                }
            }
        }
        return this.buildLink(linkObject);
    },

    buildListItem: function(studentName) {
        
        // Create our list html element.
        var item = document.createElement('li');
        
        // Our delete link for deleting a list entry.
        var deleteLink = this.deleteLink(item);

        // Our up link for moving a list entry up one position.
        var upLink = this.upLink(item);

        var downLink = this.downLink(item);
        
        // Write the data passed in as the function
        // parameter to our list element.
        item.innerText = studentName;

        // Append our delete link as a child node to our list.
        item.appendChild(deleteLink);
        
        // Append our up link as a child node to our list.
        item.appendChild(upLink);

        // Append our down link as a child node of our list.
        item.appendChild(downLink);

        // Return our newly created html list element.
        return item;
    },

    // addStudent is the event handler for onsubmit.
    addStudent: function(event) {
        
        // Prevent the default behavior of a form sumbittion.
        event.preventDefault();
        
        // Since we called bind in setupEventListener to preserve our
        // `this` pointing to our object, we no longer have a `this`
        // pointing to the form data.  We use event.currentTarget
        // instead to access the form data.
        var f = event.currentTarget;
        var studentName = f.name.value;

        // Create the list item.
        var item = this.buildListItem(studentName);
        
        // Now get the list element to append item to.
        var list = document.querySelector('#studentList');
        
        // We are prepending instead of appending.
        this.prependChild(list, item);
        
        // Reset the form so what we type is not there
        // after we submit it.
        f.reset();
        
        // Focus is now stuck on the form.
        f.name.focus();
    },
    
    // Sets up event listeners.
    setupEventListeners: function() {
        // Sets up addStudent to be the event that happens on `onsubmit`.
        document.querySelector('#studentForm').onsubmit = 
            // we use bind here to retain the `this` member in addStudent,
            // if we did not use `bind(this)` here then the `this` in
            // addStudent would point to the form data.
            this.addStudent.bind(this);
    },

    // Everything starts here.
    init: function() {
        this.setupEventListeners();
    },
};

RosterObject.init();
