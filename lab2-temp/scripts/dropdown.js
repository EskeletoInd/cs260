var selected_city = null;

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
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  btn = div.getElementsByTagName("button");
  for (i = 0; i < btn.length; i++) {
    txtValue = btn[i].textContent || btn[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      btn[i].style.display = "";
    } else {
      btn[i].style.display = "none";
    }
  }
}

async function getData() {
  const url = "http://lab2.jacobrohde.me/data/citylist.json";
  var data = fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      return json;
    });
    return data;
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
  btn.style.width = "230px";
  btn.style.height = "30px";
  btn.style.border = "none";
  btn.onclick = function(event) {
    selected_city = id;
  };
  return btn;
}

function populate() {
  var data = getDataTemp();
  var dropdown = document.getElementById("myDropdown");
  for (i = 0; i < data.length; i++) {
    var current_city = data[i];
    var current_button = createBtn(current_city.id, current_city.name, current_city.country);
    dropdown.appendChild(current_button);
  }
}

populate()
