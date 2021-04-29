
function InitDashboard() {

    var selector = d3.select('#selDataset');

    d3.json('samples.json').then(function(data) {
    console.log(data.names);

    var sampleNames = data.names;

    sampleNames.forEach(sampleId => {
        console.log(sampleId)
        selector.append('option')
        .text(sampleId)
        .property('value', sampleId);
    })
});
    // update bar chart 
    // update bubblechart

}

InitDashboard();