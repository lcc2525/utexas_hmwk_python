var myDiv = document.getElementById("zipcode");
//Create and append select list
var selectList = document.createElement("value");
// selectList.id = "mySelect";
myDiv.appendChild(selectList);

// filter to find unique zipcodes
filteredzip = tableData.zipcode;
var filteredzip = tableData.map(zip => zip.zipcode);
var unique = filteredzip.filter( onlyUnique ); // returns ['a', 1, 2, '1']
console.log(unique);

//Create and append the options
for (var i = 0; i < unique.length; i++) {
   var option = document.createElement("option");
   option.value = unique[i];
   option.text = unique[i];
   selectList.appendChild(option);
};

// create array for zip codes
// var array2 = [];
// for (var i=0;i < array2.length; i++) {
//   array2.push(tableData.zipcode[i]);
//   print.console(array2);
// }

function onlyUnique(value, index, self) {
   return self.indexOf(value) === index;
}