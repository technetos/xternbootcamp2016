var mutants_url = "https://mutant-school.herokuapp.com/api/v1/mutants";

function processData(results) {
    $.each(results, function(i, mutant) {
        addMutant(mutant);
    });
}

function addMutant(mutant) {
    var li = $('li.template')
        .clone().removeClass('template')
        .attr('data-id', mutant.id);
        
    li.find('.mutant_name').html(mutant.mutant_name);
    $('#mutant-list').append(li);
}

$.get({
    url: mutants_url,
    success: processData,
})
