var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

// function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
      d3.max(data, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}

// // function used for updating y-scale var upon click on axis label
// function yScale(data, chosenYAxis) {
//   // create scales
//   var yLinearScale = d3.scaleLinear()
//     .domain([d3.min(data, d => d[chosenYAxis]) * 0.8,
//       d3.max(data, d => d[chosenYAxis]) * 1.2
//     ])
//     .range([0, height]);

//   return yLinearScale;

// }

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// // function used for updating yAxis var upon click on axis label
// function renderAxes(newYScale, yAxis) {
//   var leftAxis = d3.axisleft(newYScale);

//   yAxis.transition()
//     .duration(1000)
//     .call(leftAxis);

//   return yAxis;
// }
// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXaxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  if (chosenXAxis === "poverty") {
    var label = "Poverty:";
  }
  else {
    var label = "Age:";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.abbr}<br>${label} ${d[chosenXAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data, this);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
var file = "assets/data/data.csv";
d3.csv(file).then(successHandle, errorHandle);

function errorHandle(error){
  throw error;
}

function successHandle(data) {

  // parse data
  data.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    // data.age = +data.age;
    // data.smokes = +data.smokes;
    
  });

  // xLinearScale function above csv import
  var xLinearScale = xScale(data, chosenXAxis);

  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[chosenYAxis])])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 20)
    .attr("fill", "blue")
    .attr("opacity", ".5");
  
 

  // Create group for  2 x- axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var povertylabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty") // value to grab for event listener
    .classed("active", true)
    .text("In Poverty (%)");

  var agelabels = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "age") // value to grab for event listener
    .classed("inactive", true)
    .text("Age");

  // append y axis
  // Create group for  2 y- axis labels
  // var labelsGroup2 = chartGroup.append("g")
  //   .attr("transform", "rotate(-90)")

  // var healthcarelabels = labelsGroup2.append("text")
  //   .attr("y", 0 - margin.left)
  //   .attr("x", 0 - (height /2 ))
  //   .attr("value", "healthcare") // value to grab for event listener
  //   .attr("dy", "1em")
  //   .classed("active", true)
  //   .text("Lacks Health Care (%)");

  // var smokeslabel = labelsGroup2.append("text")
  //   .attr("y", 0 - margin.left + 20)
  //   .attr("x", 0 - (height /2))
  //   .attr("value", "smokes") // value to grab for event listener
  //   .attr("dy", "1em") 
  //   .classed("inactive", true)
  //   .text("Smokes");

  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Lacks Health Insurance (%)");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(data, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "age") {
          agelabels
            .classed("active", true)
            .classed("inactive", false);
          povertylabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          agelabels
            .classed("active", false)
            .classed("inactive", true);
          povertylabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });
} // last bracket y axis event listener

// // y axis labels event listener
// labelsGroup2.selectAll("text")
// .on("click", function() {
//   // get value of selection
//   var value = d3.select(this).attr("value");
//   if (value !== chosenYAxis) {

//     // replaces chosenYAxis with value
//     chosenYAxis = value;

//     console.log(chosenYAxis)

//     // functions here found above csv import
//     // updates y scale for new data
//     yLinearScale = yScale(data, chosenYAxis);

//     // updates y axis with transition
//     yAxis = renderAxes(yLinearScale, yAxis);

//     // updates circles with new y values
//     circlesGroup = renderCircles(circlesGroup, yLinearScale, chosenYAxis);

//     // updates tooltips with new info
//     circlesGroup = updateToolTip(chosenYAxis, circlesGroup);

//     // changes classes to change bold text
//     if (chosenYAxis === "heathcare") {
//       healthcarelabels
//         .classed("active", true)
//         .classed("inactive", false);
//       smokeslabel
//         .classed("active", false)
//         .classed("inactive", true);
//     }
//     else {
//       healthcarelabels
//         .classed("active", false)
//         .classed("inactive", true);
//       smokeslabel
//         .classed("active", true)
//         .classed("inactive", false);
//     }
//   }
// });
