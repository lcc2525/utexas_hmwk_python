function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
  // Use d3 to select the panel with id of `#sample-metadata`
  // Use `.html("") to clear any existing metadata
  // Use `Object.entries` to add each key and value pair to the panel
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the metadata.
  // BONUS: Build the Gauge Chart
  // buildGauge(data.WFREQ);
// function that builds the sample metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  // url will match the route setup via Flask and what's in index.html
  var url = "/metadata/" + sample;
  var url2 = "/WFREQ/" + sample;
  // belly = guage.js
  console.log(url);
  console.log(url2);
  // Setup success handler and error handler when fetching data
  d3.json(url).then(handleSuccess).catch(handleError);

  // error handler function
  function handleError(error){
  console.log('An error occurred. Here is the error: ', error);
  }
  
  // success handler function
  function handleSuccess(response){
  console.log('Able to successfully retrieve sample summary data. Here it is: ', response);
  
  // Use d3 to select the panel with id of `#sample-metadata`
  var panel_body = d3.select("#sample-metadata");

  // Use `.html("") to clear any existing metadata
  panel_body.html("");
  
// take object called response and make into array of objects
  var response_arr = [response];
  console.log("response_arr is: ", response_arr);

  // Use `Object.entries` to add each key and value pair to the panel
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the metadata.


  response_arr.forEach(function(item){
    console.log('now inside response_arr forEach');
    console.log(item);
    var cell_key = panel_body.append("td");
    cell_key.text('Sample: ' + item["sample"]);
    var cell_val = panel_body.append("td");
    panel_body.append("br");
    //
    var cell_key = panel_body.append("td");
    cell_key.text('ETHNICITY: ' + item["ETHNICITY"]);
    var cell_val = panel_body.append("td");
    panel_body.append("br");
    //
    var cell_key = panel_body.append("td");
    cell_key.text('GENDER: ' + item["GENDER"]);
    var cell_val = panel_body.append("td");
    panel_body.append("br");
    //
    var cell_key = panel_body.append("td");
    cell_key.text('AGE: ' + item["AGE"]);
    var cell_val = panel_body.append("td");
    panel_body.append("br");
	//
    var cell_key = panel_body.append("td");
    cell_key.text('LOCATION: ' + item["LOCATION"]);
    var cell_val = panel_body.append("td");
    panel_body.append("br");
    //
    var cell_key = panel_body.append("td");
    cell_key.text('BBTYPE: ' + item["BBTYPE"]);
    var cell_val = panel_body.append("td");
    panel_body.append("br");
    //
	var cell_key = panel_body.append("td");
    cell_key.text('WFREQ: ' + item["WFREQ"]);
    var cell_val = panel_body.append("td");
    panel_body.append("br");
  });
  
  console.log('right before buildgauge', response.WFREQ)
  // buildGauge(response.WFREQ)
    console.log(response.WFREQ)
  var n = response.WFREQ;
    console.log('here is the n value', n);
    if (n <=0)                   
      { level = 0}
    else if (n > 0 && n <= 1)
      {level = 35 }
    else if (n > 1 && n <= 2)
      {level = 50}
    else if (n > 2 && n <= 3)
      {level = 65}
    else if (n > 3 && n <= 4)
      {level = 85}
    else if (n > 4 && n <= 5)
      {level = 95}
    else if (n > 5 && n <= 6)
      {level = 120}
    else if (n > 6 && n <= 7)
      {level = 140}
    else if (n > 7 && n <= 8)
      {level = 160}
    else {
      level = 180}
  
   
  
  // Trig to calc meter point
  var degrees = 180 - level,
       radius = 0.5;
  var radians = degrees * Math.PI / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);
  
  // Path: may have to change to create a better triangle
  var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
       pathX = String(x),
       space = ' ',
       pathY = String(y),
       pathEnd = ' Z';
  var path = mainPath.concat(pathX,space,pathY,pathEnd);
  
  var data = [{ type: 'scatter',
     x: [0], y:[0],
      marker: {size: 28, color:'850000'},
      showlegend: false,
      name: 'washes',
      text: level,
      hoverinfo: 'text+name'},
    { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
    rotation: 90,
    text: ['8-9', '6-8', '4-6', '2-4', '1-2', '0-1', ''],
    textinfo: 'text',
    textposition:'inside',
    marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                           'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                           'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                           'rgba(255, 255, 255, 0)']},
    labels: ['8-9', '6-8', '4-6', '2-4', '1-2', '0-1', ''],
    hoverinfo: 'label',
    hole: 0.5,
    type: 'pie',
    showlegend: false
  }];
  
  var layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
          color: '850000'
        }
      }],
    title: '<b>Belly Button Washing Frequency</b> <br>Scrubs per Week',
    height: 500,
    width: 500,
    xaxis: {zeroline:false, showticklabels:false,
               showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
               showgrid: false, range: [-1, 1]}
  };
  
  Plotly.newPlot("gauge", data, layout);
}
  // Last closing bracket
    }



function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  // @TODO: Build a Bubble Chart using the sample data
  // @TODO: Build a Pie Chart
  // HINT: You will need to use slice() to grab the top 10 sample_values,
  // otu_ids, and labels (10 each).
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  // url will match the route setup via Flask and what's in index.html: /samples/<sample>

  var url = "/samples/" + sample;
  var url3 = "/WFREQ/" + sample;
  console.log(url);
  console.log(url3);

  // Setup success handler and error handler when fetching data
  d3.json(url).then(handleSuccess).catch(handleError)

  // error handler function
  function handleError(error){
    console.log('An error occurred. Here is the error: ', error)
  }

  // success handler function
  function handleSuccess(result){
    console.log('Able to successfully retrieve (righthre)chart data. Here it is: ', result.WFREQ, typeof result);
    
  // set up data for bubble charts
    var trace1 = {
      x: result.otu_ids,
      y: result.sample_values, 
      text: result.otu_labels,
      hoverinfo: "x + text",
      
      mode: 'markers',
      marker: {
        color: result.sample_values,
        size: result.sample_values, 
        // label: result.otu_labels,
        colorscale: 'Jet',
      }
    };
    
 
    var data2 = [trace1];
    var layout2 = {
      height: 600,
      width: 1600
    };
    Plotly.newPlot("bubble", data2, layout2, {responsive: true});
    // set up gauge charts in plotly
    // not yet 

    // set up data for pie charts 
    var data = [{
      values: result.sample_values.slice(0,10),
      labels: result.otu_ids.slice(0,10),
      hovertext: result.otu_labels.slice(0.10),
      toolTipContent: "{hovertext}",
      type: 'pie'

    }];
    // create pie chart layout
    var layout = {
      height: 400,
      width: 500
    };
  
    Plotly.newPlot("pie", data, layout, {responsive: true});
   
// end handle success pie chart  
  };
  
  
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
    console.log(firstSample);
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