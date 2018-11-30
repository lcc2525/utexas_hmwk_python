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
  // url will match the route setup via Flask and what's in index.html: /schoolsummary/<sample>
  var url = "/metadata/" + sample;
  console.log(url);

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
  
  }
}


function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  // @TODO: Build a Bubble Chart using the sample data
  // @TODO: Build a Pie Chart
  // HINT: You will need to use slice() to grab the top 10 sample_values,
  // otu_ids, and labels (10 each).
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  // url will match the route setup via Flask and what's in index.html: /samples/<sample>

  var url = "/samples/" + sample
  console.log(url);

  // Setup success handler and error handler when fetching data
  d3.json(url).then(handleSuccess).catch(handleError)

  // error handler function
  function handleError(error){
    console.log('An error occurred. Here is the error: ', error)
  }

  // success handler function
  function handleSuccess(result){
    console.log('Able to successfully retrieve chart data. Here it is: ', result, typeof result);
    
    //set up data for bubble charts
    var trace1 = {
      x: result.otu_ids,
      y: result.sample_values, 
      hovertext: "{result.otu_labels}",
      toolTipContent: "{hovertext}",
      mode: 'markers',
      marker: {
        color: result.sample_values*2,
        size: result.sample_values
      }
    };
    
 
    var data2 = [trace1];
    var layout2 = {
      height: 600,
      width: 900
    };
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
    Plotly.newPlot("bubble", data2, layout2);
// end handle success pie chart  
  };


// last closing bracket build charts
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