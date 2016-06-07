var App = {

    deleteMutant: function(id, li) {
        $.ajax({
            url: this.url + id,
            method: 'delete',
            success: function() {
                if(li) {
                    li.remove();
                }
            }
        });
    },

    addMutants: function(mutant) {
        var li = $("li.template")
            .clone()
            .removeClass("template")
            .attr("data-id", mutant.id);

        li.find(".mutant-name")
            .html(mutant.mutant_name);

        $("#mutant-list").append(li);
    },

    processMutants: function(mutants) {
        $.each(mutants, function(i, mutant) {
            this.addMutants(mutant);
        }.bind(this));
    },

    getMutants: function() {
        $.get({
            url: this.url,
            success: this.processMutants.bind(this),
        });
    },

    setupURL: function(url) {
        this.url = url;
        if(!/^.*\/$/.test(this.url))
            this.url = this.url + '/';
    },

    setupEventHandlers: function() {
        $("#mutant-list").on("click", "a.delete", function(ev) {
            ev.preventDefault();
            var li = $(ev.currentTarget).closest("li");
            var id = li.data('id');
            this.deleteMutant(id, li);
        }.bind(this));
    },
    
    init: function(url) {
        this.setupURL(url);
        this.setupEventHandlers();
        this.getMutants();

    },
}

App.init("https://mutant-school.herokuapp.com/api/v1/mutants");
