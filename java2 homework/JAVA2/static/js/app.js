// from data.js
var tableData = data;
console.log('tableData is:', tableData);



function buildMetadata(tableData) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  // var url = "/sample/" + sample;
  // console.log(url);
    // Use d3 to select the panel with id of `#sample-metadata`
  d3.json(tableData).then(handleSuccess).catch(handleError);

  // error handel function
  function handleError(error){
    console.log('An error occured. Here is the error: ', error);
  }

  // function handle sucess
  function handleSuccess(response){
  console.log('Able to successfully retrieve data summary info', response);
  
  // Use d3 to slect the panel with id
  var panel_body = d3.select("#sample-metadata");  
  
  // Use `.html("") to clear any existing metadata
  panel_body.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
   
    // take object called response and make into array of objects
  var response_arr = [response];
  console.log("response_arr is: ", response_arr);

  // Use 'Object.entries' to add each key and value pair to the panel
  // 
    response_arr.forEach(function(item){
      console.log('now inside response_arr forEach');
      console.log(item);
      
      var cell_key = panel_body.append("td");
      cell_key.text('Otu_id : ' + item["otu_id"]);
      var cell_val = panel_body.append("td");
      console.log(cell_val);
      panel_body.append("br");
  //
      var cell_key = panel_body.append("td");
      cell_key.text('otu_label: ' + item["otu_label"]);
      console.log(cell_key);
      var cell_val = panel_body.append("td");
      panel_body.append("br");
  //
      var cell_key = panel_body.append("td");
      cell_key.text('Sample: ' + item["sample"]);
      console.log(cell_key);
      var cell_val = panel_body.append("td");
      panel_body.append("br");
  //
  });
  //

}

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}
buildMetadata(tableData);
function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
	var url = "/metadata/" + sample;
	console.log(url);
    d3.json(url).then(handleSuccess).catch(handleError);
	
	function handleError(error){
		console.log('Here is the error: ', error);}
	// Success handler function
	function handleSuccess(result) {
		console.log('Success', result);
		
	// @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
		var element_id = (result.otu_id).slice(0,9);
		var element_label = (result.otu_label).slice(0,9);
		var element_sample	= (result.sample).slice(0,9);

	// HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
		for (var i=0;i < element_sample.length; i++) {
      total_value_samples += element_sample[i];
      console.log(total_value_samples);
    return total_value_samples;
  }

		// find pie values
		pie_values = [];
		for (var i=0;i< element_id.length; i++){
			var val = (element_sample[i] / total_value_samples)*100
      console.log(val);
      pie_values.push(val);
      console.log(pie_values);
};
		// set up pie_variable
		var pie_variable = {
			labels: element_label,
			values: pie_values,
			type: 'pie'
		};
	// create pie variable
	var pie_data = [pie_variable];
	
  // pie layout 
/*
	var pie_layout = {
    title: 
*/
	
	Plotly.newPlot("pie", pie_data);
  }
};
buildCharts(tableData);
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
      console.log(selector);
  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    console.log(sampleNames);
  });
}