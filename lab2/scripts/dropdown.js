var selected_city = null;

var all_cities = [];
var filteredCities = [];

function closeDropdown() {
  var style = window.getComputedStyle(document.getElementById("myDropdown"));
  if (style.display !== 'none') {
    toggleShow();
  }
}

function toggleShow() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  emptyCities();
  filteredCities = [];
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  filter = filter.replace(',', '').replace(' ', '');
  div = document.getElementById("myDropdown");
  for (i = 0; i < all_cities.length; i++) {
    var text = all_cities[i].name + all_cities[i].country;
    if (text.toUpperCase().indexOf(filter) > -1) {
      filteredCities.push(all_cities[i]);
    }
  }
  if (filteredCities.length < 10) {
    drawCities(filteredCities);
  }
}

function getDataTemp() {
  return [
    {
      id: 707860,
      name: "Hurzuf",
      country: "UA",
      coord: {
        lon: 34.283333,
        lat: 44.549999
      }
    },
    {
      id: 519188,
      name: "Novinki",
      country: "RU",
      coord: {
        lon: 37.666668,
        lan: 55.683334
      }
    },
    {
      id: 1283378,
      name: "Gorkhā",
      country: "NP",
      coord: {
        lon: 84.633331,
        lat: 28
      }
    },
    {
      id: 1270260,
      name: "State of Haryāna",
      country: "IN",
      coord: {
        lon: 76,
        lat: 29
      }
    },
    {
      id: 708546,
      name: "Holubynka",
      country: "UA",
      coord: {
        lon: 33.900002,
        lat: 44.599998
      }
    }];
}

function createBtn(id, city, country) {
  var btn = document.createElement("button");
  btn.innerText = city + ", " + country;
  btn.style.fontFamily = "arial, sans-serif";
  btn.style.padding = "8px 16px";
  btn.style.textDecoration = "none";
  btn.style.cursor = "pointer";
  btn.style.background = "none!important";
  btn.style.width = "260px";
  btn.style.height = "30px";
  btn.style.border = "none";
  btn.onclick = function(event) {
    selected_city = id;
    if (selected_city === null) {
      console.log("No City to search");
      showToast();
    } else {
      console.log("Searching for " + selected_city);
      getWeather(selected_city);
      closeDropdown();
    }
  };
  return btn;
}

function emptyCities() {
  var dropdown = document.getElementById("myDropdown").rows;
  if (filteredCities.length >= 10) {
    return;
  }
  for (var i = 0; i < filteredCities.length; i++) {
    var button = document.getElementById(i);
    button.parentNode.removeChild(button);
  }
}

function drawCities(cities) {
  var dropdown = document.getElementById("myDropdown");
  for (i = 0; i < cities.length; i++) {
    var current_city = cities[i];
    var current_button = createBtn(current_city.id, current_city.name, current_city.country);
    current_button.id = i;
    dropdown.appendChild(current_button);
  }
}

function populate() {
  const url = "http://lab2.jacobrohde.me/data/citylist.json";
  fetch(url)
  .then((resp) => resp.json())
  .then((data) => {
    all_cities = data;
  })
}

function populate_test() {
  all_cities = getDataTemp();
}

populate_test();
