// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
  // "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";
// set up array for markers
  markerarr = [];
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});
// Define a markerSize function that will give each city a different radius based on its mag
function markerColor(mag) {
  console.log(mag);
  if (mag > 0 && mag <= 1) {
    return 'olive';
  } else if (mag > 1 && mag <= 2) {
    return 'light orange';
  } else if (mag > 2 && mag <= 3) {
    return 'orange';
  } else if (mag > 3 && mag <= 4) {
    return 'dark orange';
  } else if (mag > 4 && mag <= 5) {
    return 'orange';
  } else  {
    return 'red';
  }   
};

// Define a markerSize function that will give each city a different radius based on its mag
function markerSize(mag) {
  console.log(mag*15);
  return mag * 15;
};
function createFeatures(earthquakeData, layer) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature) {
    // console.log(feature.properties.mag);
    latlong = feature.geometry.coordinates;
    // console.log(latlong[1],latlong[0]);
    
    markerarr.push(L.circleMarker([latlong[1],latlong[0]], {
      fillOpacity: 0.25,
      color: markerColor(feature.properties.mag),
      fillColor: markerColor(feature.properties.mag),
// Setting our circle's radius equal to the output of our markerSize function
// This will make our marker's size proportionate to its mag
      radius: markerSize(feature.properties.mag)
      }).bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"));
      
    // console.log(layer);
  };
  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    
    onEachFeature: onEachFeature
  });
  console.log(earthquakes);
  console.log(markerarr);
  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
  };
  
function createMap(earthquakes) {

  // Define streetmap and darkmap layers
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
// // An array which will be used to store created cityMarkers
// var cityMarkers = [];

// for (var i = 0; i < cities.length; i++) {
//   // loop through the cities array, create a new marker, push it to the cityMarkers array
//   cityMarkers.push(
//     L.marker(cities[i].location).bindPopup("<h1>" + cities[i].name + "</h1>")
//   );
// }

// // Add all the cityMarkers to a new layer group.
// // Now we can handle them as one group instead of referencing each individually
// var cityLayer = L.layerGroup(cityMarkers);

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };
// Create marker layer from array
var markerlayer = L.layerGroup(markerarr);
  
  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };
  
  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, markerlayer]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}