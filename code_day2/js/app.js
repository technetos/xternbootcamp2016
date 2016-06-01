$(document).foundation();

var Roster = {

    init: function() {
        document.querySelector('form').onsumbit = this.addValuesToRoster;
    },

    buildList: function(listValues) {
        var dl = document.createElement('dl');
        dl.style.border = '1px solid #000000';
        dl.appendChild(this.buildListItem('Name', listValues.name));
        return dl;
    },

    buildListItem: function(term, def) {
        var li = document.createElement('li');
        var dt = document.createElement('dt');
        var dd = document.createElement('dd');
        dt.innerHTML = term;
        dd.innerHTML = def;
        li.appendChild(dt);
        li.appendChild(dd);
        return li;
    },

    addValuesToRoster: function(ev) {
        ev.preventDefault();
        var roster = document.querySelector('.details');
        // Roster values object
        var rosterValues = {
            name: this.name.value,
        };

        roster.appendChild(Roster.buildList(rosterValues));
    }
};

Roster.init();
