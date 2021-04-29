
function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);

    d3.json('samples.json').then(data => {
        // console.log(data)
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0, 10).map(otuId => ` OTU ${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: 'bar',
            text: otu_labels.slice(0, 10).reverse(),
            orientation: 'h'
        }

        var barArray = [barData];

        var barLayout = {
            title: 'Top 10 Bacteria Cultures Found',
            margin: {t: 30, l: 150}
        }

        Plotly.newPlot('bar', barArray, barLayout);

    });

};

function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);

    d3.json('samples.json').then(data => {
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            type: 'scatter',
            mode: 'markers',
            marker: {
                size: sample_values
            }
        };

        var data = [bubbleData];

        var bubbleLayout = {
            title: 'OTU'
        };

        Plotly.plot('bubble', data, bubbleLayout)


    });

    }


function ShowMetadata(sampleId) {
    console.log(`ShowMetadata(${sampleId})`);

}

function optionChanged(newSampleId) {
    console.log(`user selected  ${newSampleId}`);

    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    ShowMetadata(newSampleId);
}

function InitDashboard() {

    var selector = d3.select('#selDataset');

    d3.json('samples.json').then(function(data) {

    var sampleNames = data.names;

    sampleNames.forEach(sampleId => {
        selector.append('option')
        .text(sampleId)
        .property('value', sampleId);
    });
    
    var id = sampleNames[0];

    DrawBargraph(id);

    DrawBubblechart(id);

    ShowMetadata(id);

});
    // update bubblechart
    //update demographic info

}

InitDashboard();
