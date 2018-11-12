// from data.js
var tableData = data;
var tbody = d3.select("tbody");

// select the submit button
var submit = d3.select("#filter-btn");

// find element for appending date
var myDiv = document.getElementById("dates");
//Create and append select list
var selectList = document.createElement("value");
// selectList.id = "mySelect";
myDiv.appendChild(selectList);

// filter for unique dates to enter list of
filtereddate = tableData.datetime;
var filtereddate = tableData.map(date => date.datetime);
var unique = filtereddate.filter( onlyUnique );
console.log(unique);

// enter option into html
for (var i = 0; i < unique.length; i++) {
  var option = document.createElement("option");
  option.value = unique[i];
  option.text = unique[i];
  selectList.appendChild(option);
};

// call the function to trigger on the click button
submit.on('click', function() {
  d3.event.preventDefault(); 
  var inputElement = d3.select("#datetime");    
  var inputValue = inputElement.property("value");


//  filter by inputted data
  var filteredData = tableData.filter(sighting => sighting.datetime === inputValue);
  
//  output filtered data to website
filteredData.forEach((sighting) => {
  var row = tbody.append("tr");
  Object.entries(sighting).forEach(([key, value]) => {
  var cell = tbody.append("td");
  cell.text(value);
    });
  });
});


// function to find unique elements in array
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}