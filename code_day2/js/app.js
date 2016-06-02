$(document).foundation();

var Roster = {

    init: function() {
        document.querySelector('form').onsubmit = this.addValuesToRoster;
    },

    buildList: function(list) {
        var dl = document.createElement('dl');
        dl.id = 'dlid';
        dl.appendChild(this.buildListItem('Name', list.name));
        return dl;
    },

    buildListItem: function(term, def) {
        var li = document.createElement('li');
        var dt = document.createElement('dt');
        var dd = document.createElement('dd');
        li.id = def;
        dt.innerHTML = term;
        dd.innerHTML = def;
        li.appendChild(dt);
        li.appendChild(dd);
        return li;
    },

    buildDeleter: function(list) {
        var button = document.createElement('button');
        button.innerHTML = 'DELETE';
        button.onclick = this.deleter(list);
        return button;
    },

    deleter: function(list) {
        var parent = document.getElementById('dlid');
        var child = document.getElementById(list.name);
        parent.removeChild(child);
    },

    addValuesToRoster: function(ev) {
        ev.preventDefault();
        
        // Grab the DOM element!
        var details = document.querySelector('.details');
        var formValues = {
            name: this.name.value,
        };
        
        details.appendChild(Roster.buildList(formValues) + Roster.buildDeleter(formValues));
     
    }
};

Roster.init();
