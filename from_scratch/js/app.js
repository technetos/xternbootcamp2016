var App = {

    addMutants: function(mutant) {
        var li = $('li.template')
            .clone()
            .removeClass('template')
            .attr('data-id', mutant.id);

        li.find('.mutant-name')
            .html(mutant.mutant_name);

        $('#mutant-list').append(li);
    },

    processMutants: function(mutants) {
        $.each(mutants, function(i, mutant) {
            // I have no idea how to do this without referencing
            // the object by name
            App.addMutants(mutant);
        });
    },

    getMutants: function() {
        $.get({
            url: this.url,
            success: this.processMutants,
        });
    },

    setupURL: function(url) {
        this.url = url;
        if(!/^.*\/$/.test(this.url))
            this.url = this.url + '/';
    },
    
    init: function(url) {
        this.setupURL(url);
        this.getMutants()
    },
}

App.init("https://mutant-school.herokuapp.com/api/v1/mutants");
