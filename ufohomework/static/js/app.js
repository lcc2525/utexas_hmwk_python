// from data.js
var tableData = data;
var tbody = d3.select("tbody");

// select the submit button using d3 selectors
var submit = d3.select("#filter-btn");
// Create click on function, need several inputs for multiple variables
submit.on('click', function() {
    d3.event.preventDefault();
    var inputElement = d3.select("#datetime");
    var inputValue = inputElement.property("value");
    var inputElement = d3.select("#city");
    var inputValue2 = inputElement.property("value");
    var inputElement = d3.select("#state");
    var inputValue3 = inputElement.property("value");
    var inputElement = d3.select("#country");
    var inputValue4 = inputElement.property("value");
    var inputElement = d3.select("#shape");
    var inputValue5 = inputElement.property("value");
    // console.log(inputValue, inputElement);

    // filterd table by only entered parameters
    var filteredData = (inputValue !== "") ? (tableData.filter(sighting => sighting.datetime === inputValue)) : tableData;
    var filteredData2 = (inputValue2 !== "") ? (filteredData.filter(sighting => sighting.city === inputValue2)) : filteredData;
    var filteredData3 = (inputValue3 !== "") ? (filteredData2.filter(sighting => sighting.state === inputValue3)) : filteredData2;
    var filteredData4 = (inputValue4 !== "") ? (filteredData3.filter(sighting => sighting.country === inputValue4)) : filteredData3;
    var filteredData5 = (inputValue5 !== "") ? (filteredData4.filter(sighting => sighting.shape === inputValue5)) : filteredData4;
    // console.log(filteredData, filteredData2, filteredData3, filteredData4);
    // console.log(inputValue2, inputValue3, inputValue5)

    // Print filterd data into table
    filteredData5.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            var cell = tbody.append("td");
            cell.text(value);
        });
    });
});