function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  // url will match the route setup via Flask and what's in index.html: /samples/<sample>

  var url = "/sample/" + sample
  console.log(url);

  // Setup success handler and error handler when fetching data
  d3.json(url).then(handleSuccess).catch(handleError)

  // error handler function
  function handleError(error){
    console.log('An error occurred. Here is the error: ', error)
  }

  // success handler function
  function handleSuccess(result){
    console.log('Able to successfully retrieve sample data. Here it is: ', result)

    // Build a Pie Chart showing the Demographics at a particular school using the sample data
    var school_name = result.campus_name
    var school_enrollment = result.enrollment
    var pie_pct_other = 100 - (result.pct_african_american + result.pct_asian + result.pct_hispanic + result.pct_white)
    console.log(pie_pct_other);
    var pie_demographic_pct_values = [result.pct_african_american, result.pct_asian, result.pct_hispanic, result.pct_white, pie_pct_other]
    console.log(pie_demographic_pct_values);

    pie_values = [];
    for (var i = 0; i < pie_demographic_pct_values.length; i++) {
      var val = school_enrollment * (pie_demographic_pct_values[i] / 100)
      console.log(val);
      pie_values.push(val)
    }
    console.log(pie_values);

    var pie_labels = ["African American", "Asian", "Hispanic", "White", "Other"]
    console.log(pie_labels);

    var pie_trace = {
      labels: pie_labels,
     values: pie_values,
     type: 'pie'
   };
  
   var pie_data = [pie_trace];
  
  //  added <br> to title
   var pie_layout = {
     title: school_name + " Demographics" + "<br> (Enrollment: " + school_enrollment + ")"
   };
  
  //  add {responsive: true}
   Plotly.newPlot("pie", pie_data, pie_layout ,{responsive: true});
   //
  };