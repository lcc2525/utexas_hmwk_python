// from data.js
var tableData = data;
var tbody = d3.select("tbody");
// YOUR CODE HERE!
// select the submit button
var submit = d3.select("#filter-btn");

submit.on('click', function() {
  d3.event.preventDefault(); 
  var inputElement = d3.select("#datetime");    
  var inputValue = inputElement.property("value");

  console.log(inputValue, inputElement);

  var filteredData = tableData.filter(sighting => sighting.datetime === inputValue);
  console.log(filteredData);



filteredData.forEach((sighting) => {
  var row = tbody.append("tr");
  Object.entries(sighting).forEach(([key, value]) => {
  var cell = tbody.append("td");
  cell.text(value);
    });
  });
});
