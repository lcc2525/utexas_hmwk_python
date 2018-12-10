
function buildguage(sample) {
  var url4 = "/wfreq/" + sample;
  console.log(url4);


 // Setup success handler and error handler when fetching data
 d3.json(url4).then(handleSuccess).catch(handleError);

 // error handler function
 function handleError(error){
   console.log('An error occurred. Here is the error: ', error);
 }

 // success handler function
 function handleSuccess(result){
   console.log('Able to successfully retrieve chart data. Here it is: ', result, typeof result);
   console.log('this is the WFREQ NUMBER:', sample.WFREQ);
// Convert sample number into degrees
var n = sample.WFREQ;
if (n <=0)                   
  { level = 0}
else if (n > 0 && n <= 1)
  {level = 15 }
else if (n > 1 && n <= 2)
  {level = 40}
else if (n > 2 && n <= 3)
  {level = 60}
else if (n > 3 && n <= 4)
  {level = 85}
else if (n > 4 && n <= 5)
  {level = 95}
else if (n > 5 && n <= 6)
  {level = 120}
else if (n > 6 && n <= 7)
  {level = 145}
else if (n > 7 && n <= 8)
  {level = 170}
else {
  level = 180}

 // level = 175;

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
    name: 'speed',
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
  labels: ['9-8', '8-6', '6-4', '4-2', '2-1', '1-0', ''],
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
  title: 'Belly Button Washing Frequency <br> Scrubs per Week',
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

