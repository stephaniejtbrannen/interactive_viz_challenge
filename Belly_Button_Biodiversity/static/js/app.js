function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
 
  // // Use `d3.json` to fetch the metadata for a sample
  var url = `/metadata/${sample}`;
  // console.log(url);
  d3.json(url).then(function(d) {
    // console.log(d);
    var data = [d];
      
 
    // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select("#sample-metadata")

    // Use `.html("") to clear any existing metadata
    .html("");
    // Use `Object.entries` to add each key and value pair to the panel
    data.forEach((metaData) => {
      var row = panel.append("div");
      Object.entries(metaData).forEach(([key, value]) => {
        var cell = panel.append("div");
        cell.text(`${key}: ${value}`);
      });
    });
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

    
});
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/samples/${sample}`;
  // console.log(url);
  d3.json(url).then(function(d) {
    // console.log(d);
    // var sampleData = [d];
    // data.sort((a, b) => b - a);
    // console.log(sampleData);
  
    // var data = d.slice(0,10);
    // d = d.reverse();
    // console.log(d);

    var otu_ids= d.otu_ids;
    var otu_labels =d.otu_labels;
    var sample_values =d.sample_values;
    // @TODO: Build a Bubble Chart using the sample data

    // trace0 = {
    //   type: scatter,
    //   mode='markers',
    //   x= otu_ids,
    //   y= sample_values,
    //   marker={
    //       size=sample_values,
    //       color=otu_ids,
    //       text=otu_labels
    //   }
    // }
    
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      mode: "markers",
      marker: {
        color: otu_ids,
        size: sample_values,
        opacity: otu_ids,
      },
      hovertext: otu_labels,
      type: "scatter"
    };
  
  
  data = [trace1]
  Plotly.newPlot("bubble", data);

    // @TODO: Build a Pie Chart
    // Sort the data array using the greekSearchResults value
    // sampleData.sort(function(a, b) {
    //   return parseFloat(b.sample_values) - parseFloat(a.sample_values);
    // });

    // Slice the first 10 objects for plotting
    // TopSamples = sampleData.slice(0, 10);

    // // Reverse the array due to Plotly's defaults
    // TopSamples = TopSamples.reverse();
// sort((a, b) => b.sample_values - a.sample_values)
    var  trace1 = {
      values: sample_values.slice(0, 10),
      labels: otu_ids,
      hovertext: otu_labels,
      type: "pie"
    }
    console.log(trace1)
    var data = [trace1];
    var layout =  {
      height: 400,
      width: 500
    };

    Plotly.newPlot("pie", data, layout);
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  });
}
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
