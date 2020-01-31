const MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
  {name: "Everest", height: 8848, place: "Nepal"},
  {name: "Mount Fuji", height: 3776, place: "Japan"},
  {name: "Vaalserberg", height: 323, place: "Netherlands"},
  {name: "Denali", height: 6168, place: "United States"},
  {name: "Popocatepetl", height: 5465, place: "Mexico"},
  {name: "Mont Blanc", height: 4808, place: "Italy/France"}
];

var headers = {name: "Name", height: "height", place:"Place"};

var table = document.createElement("table");
for (i = -1; i < MOUNTAINS.length; i++) {
  var row = document.createElement("tr");
  table.appendChild(row);
  for (j = 0; j < 3; j++) {
    if (i === -1) {
      var item = document.createElement("th");
      item.innerHTML = headers[Object.keys(headers)[j]];
    }
    else {
      var item = document.createElement("td");
      item.innerHTML = MOUNTAINS[i][Object.keys(MOUNTAINS[i])[j]];
      if (j === 1) {
        item.style.textAlign = "right";
      }
    }
    item.style.paddingLeft = "50px";
    row.appendChild(item);
  }
  document.getElementById("mountains").appendChild(table);
}
