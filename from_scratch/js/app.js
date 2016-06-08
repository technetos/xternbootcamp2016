var App = {

    newMutant: function(mutant) {
        $.ajax({
            url: this.url,
            method: "post",
            headers: { "Content-Type":"application/json" },
            contentType: "application/json",
            data:
                JSON.stringify({
                    "mutant":{
                        "mutant_name":mutant,
                        "real_name":"unknown",
                        "power":"none",
                    }
            })
        }).done(this.addMutants);
    },

    updateMutant: function(mutant) {
       /*
        $.ajax({
            url: this.url,
            method: "put",
            */

        console.log(mutant.mutant_name);
        $("form#mutant-form").off("submit");
        this.setupAddFormHandler();
    },

    deleteMutant: function(id, li) {
        $.ajax({
            url: this.url + id,
            method: "delete",
        }).done(function() {
            if(li) { li.remove(); }
        })
    },

    addMutants: function(mutant) {
        var li = $("li.template")
            .clone()
            .removeClass("template")
            .attr("data-id", mutant.id);

        li.find(".mutant-name").html(mutant.mutant_name);

        $("#mutant-list").append(li);
    },

    modifyMutant: function(mutant) {
        $("input").val(mutant.mutant_name);
        $("input").focus();
        $("form#mutant-form").off("submit");
        this.setupUpdateFormHandler(mutant);
    },

    processMutants: function(mutants) {
        $.each(mutants, function(i, mutant) {
            this.addMutants(mutant);
        }.bind(this));
    },

    getExistingMutant: function(id) {
        $.get({
            url: this.url + id,
        }).done(this.modifyMutant.bind(this));
    },

    getMutants: function() {
        $.get({
            url: this.url,
        }).done(this.processMutants.bind(this));
    },

    setupURL: function(url) {
        this.url = url;
        if(!/^.*\/$/.test(this.url))
            this.url = this.url + "/";
    },

    setupDeleteHandler: function() {
        $("#mutant-list").on("click", "a.delete", function(ev) {
            ev.preventDefault();
            var li = $(ev.currentTarget).closest("li");
            var id = li.data("id");
            this.deleteMutant(id, li);
        }.bind(this));
    },

    setupEditHandler: function() {
        $("#mutant-list").on("click", "a.edit", function(ev) {
            ev.preventDefault();
            var li = $(ev.currentTarget).closest("li");
            var id = li.data("id");
            this.getExistingMutant(id);
        }.bind(this));
    },

    setupAddFormHandler: function() {
        $("form#mutant-form").on("submit", function(ev) {
            ev.preventDefault();
            this.newMutant(ev.currentTarget.name.value);
            ev.currentTarget.reset();
            ev.currentTarget.focus();
        }.bind(this));
    },

    setupUpdateFormHandler: function(mutant) {
        $("form#mutant-form").on("submit", function(ev) {
            ev.preventDefault();
            mutant.mutant_name = $("input").val();
            this.updateMutant(mutant);
            ev.currentTarget.reset();
            ev.currentTarget.focus();
        }.bind(this));
    },

    init: function(url) {
        this.setupURL(url);
        this.setupDeleteHandler();
        this.setupEditHandler();
        this.setupAddFormHandler();
        this.getMutants();
    },
}

App.init("https://mutant-school.herokuapp.com/api/v1/mutants");
