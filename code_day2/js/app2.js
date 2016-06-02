$(document).foundation();

var RosterObject = {

    prependChild: function(parent, child) {
        parent.insertBefore(child, parent.firstChild);
    },

    buildLink: function(options) {
        var link = document.createElement('a');
        link.href = '#';
        link.innerText = options.text;
        link.onclick = options.func;
        return link;
    },

    deleteButton: function(item) {
        var btn = {
            text: 'Remove',
            // Call remove child from the parent node of item.
            func: function() { item.parentElement.removeChild(item); }
        }
        return this.buildLink(btn);
    },

    promoteButton: function(item) {
        var btn = {
            text: 'Promote',
            func: function() {
                if(item.previousSibling) {
                    item.parentNode.insertBefore(item, item.previousSibling);
                }
            }
        }
        return this.buildLink(btn);
    },

    buildListItem: function(studentName) {
        // Create our list html element.
        var item = document.createElement('li');
        
        // Our delete button for deleting a list entry.
        var deleteButton = this.deleteButton(item);

        // Our promote button for promoting a list entry above others.
        var promoteButton = this.promoteButton(item);
        // Write the data passed in as the function
        // parameter to our list element.
        item.innerText = studentName;

        // Append our delete button as a child node to our list.
        item.appendChild(deleteButton);
        
        // Append our promote button as a child node to our list.
        item.appendChild(promoteButton);

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
