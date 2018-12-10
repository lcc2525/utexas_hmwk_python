
// function that builds the sample metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  // url will match the route setup via Flask and what's in index.html: /schoolsummary/<sample>
  var url = "/metadata/" + sample
  console.log(url);

  // Setup success handler and error handler when fetching data
  d3.json(url).then(handleSuccess).catch(handleError)

  // error handler function
  function handleError(error){
  console.log('An error occurred. Here is the error: ', error)
  }
  
  // success handler function
  function handleSuccess(response){
  console.log('Able to successfully retrieve bb summary data. Here it is: ', response)
  
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
  
    