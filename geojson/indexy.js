// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// set up array for markers
markerarr = [];

// Define a markerSize function that will give each city a different radius based on its mag
function markerColor(mag) {
    console.log(mag);
    // function getColor(d) {
    return mag > 5 ? 'Maroon' :
            mag > 4 ? 'Crimson' :
            mag > 3 ? 'Darkorange' :
            mag > 2 ? 'Coral' :
            mag > 1 ? 'BurlyWood' :
            mag > 0 ? 'Aqua' :
                      'Yellow';
  }
  
  // Define a markerSize function that will give each city a different radius based on its mag
  function markerSize(mag) {
    console.log(mag*15);
    return mag * 10;
  }

d3.json(queryUrl, function(data) {
    console.log(data);
    feature = data.features;
    console.log(feature);
    for (var i =0; i < feature.length; i++) {
        console.log(feature.length);
        latlong = feature[i].geometry.coordinates;
        console.log(latlong);
        markerarr.push(L.circleMarker([latlong[1],latlong[0]], {
            fillOpacity: .30,
            color: markerColor(feature[i].properties.mag),
            fillColor: markerColor(feature[i].properties.mag),
            dashArray: '3',
      // Setting our circle's radius equal to the output of our markerSize function
      // This will make our marker's size proportionate to its mag
            radius: markerSize(feature[i].properties.mag)
            }).bindPopup("<h3>" + "location : " + (feature[i].geometry.coordinates[1] + " , " + feature[i].geometry.coordinates[0]) + "<h3>" + feature[i].properties.place + ", magnitude: " + feature[i].properties.mag 
            + "</h3><hr><p>" + new Date(feature[i].properties.time) + "</p>"));
            
          // console.log(layer);
        }
    var markerlayer = L.layerGroup(markerarr); 
        console.log(markerarr);


  // Adding tile layers to the map
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });
  
  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });
  
  // Define a baseMaps object to hold our base layers
  var baseMaps = {
      "Street Map": streetmap,
      "Dark Map": darkmap
    };
  
  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: markerlayer
  };
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 4,
  layers: [streetmap, markerlayer]
});
 
// Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

 // Create legend for map
 var legend = L.control({position: 'bottomright'});

 legend.onAdd = function (myMap) {

 var div = L.DomUtil.create('div', 'info legend'),
     grades = [0, 1, 2, 3, 4, 5],
     labels = [];

 // loop through our density intervals and generate a label with a colored square for each interval
 for (var i = 0; i < grades.length; i++) {
     div.innerHTML +=
         '<i style="background:' + markerColor(grades[i] + 1) + '"></i> ' +
         grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
 }
 console.log(legend);
 return div;
};  
legend.addTo(myMap);  

// final closed bracket
});