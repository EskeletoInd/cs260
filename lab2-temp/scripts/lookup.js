document.getElementById("searchbtn").onclick = function(event) {
  event.preventDefault();
  if (selected_city === null) {
    console.log("No City to search");
    showToast();
  } else {
    console.log("Searching for " + selected_city);
    getWeather(selected_city);
    closeDropdown();
  }
};

function showToast() {
  $('#noCityToast').toast('show');
}

function urlBuilder(city_id, call) {
  return "http://api.openweathermap.org/data/2.5/" + call + "?id=" + city_id +
  "&units=imperial&APPID=f708e944fc17fad73b301d123d4695ec";
}

function getWeather(city_id) {
  fetch(urlBuilder(city_id, "weather"))
  .then((resp) => resp.json())
  .then((current) => {
    console.log(current);
    //drawCurrentWeather(current);
  })
  fetch(urlBuilder(city_id, "forecast"))
  .then((resp) => resp.json())
  .then((forecast) => {
    drawForecastWeather(forecast);
  })
}

function drawCurrentWeather(current) {
  var holder = document.createElement("div");

  console.log(current);
  let results = "";
  results += '<h2>Weather in ' + current.name + "</h2>";
  for (let i = 0; i < current.weather.length; i++) {
    results += '<img src="http://openweathermap.org/img/w/' + current.weather[i].icon + '.png"/>';
  }
  results += '<h2>' + current.main.temp + " &deg;F</h2>"
  results += "<p>"
  for (let i = 0; i < current.weather.length; i++) {
    results += current.weather[i].description
    if (i !== current.weather.length - 1)
      results += ", "
  }
  results += "</p>";
  document.getElementById("weatherResults").innerHTML = results;
}

function timeToString(time) {
  // Input = "2020-02-02 09:00:00"
  return time;
}

function degreeToDirection(degree) {
  // Input = 178
  var val = Math.floor((degree / 22.5) + 0.5);
  var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
}

function buildForecastRow(current_weather) {
  var row = document.createElement("tr");

  // Add the Icon
  var cell = document.createElement("td");
  var img = document.createElement("img");
  img.src = "http://openweathermap.org/img/w/" + current_weather.weather[0].icon + ".png";
  cell.appendChild(img);
  row.appendChild(cell);

  // Add the Time
  var cell = document.createElement("td");
  cell.innerHTML = timeToString(current_weather.dt_txt);
  cell.style.textAlign = "center";
  row.appendChild(cell);

  // Add the Low
  var cell = document.createElement("td");
  cell.innerHTML = current_weather.main.temp_min;
  row.appendChild(cell);

  // Add the High
  var cell = document.createElement("td");
  cell.innerHTML = current_weather.main.temp_max;
  row.appendChild(cell);

  // Add the Humidity
  var cell = document.createElement("td");
  cell.innerHTML = current_weather.main.humidity;
  row.appendChild(cell);

  // Add the Cloudiness
  var cell = document.createElement("td");
  cell.innerHTML = current_weather.clouds.all;
  row.appendChild(cell);

  // Add the Wind Direction
  var cell = document.createElement("td");
  cell.innerHTML = degreeToDirection(current_weather.wind.deg);
  row.appendChild(cell);

  // Add the Wind Speed
  var cell = document.createElement("td");
  cell.innerHTML = current_weather.wind.speed;
  row.appendChild(cell);

  return row;
}

function drawForecastWeather(forecast) {
  console.log(forecast);
  let table = document.getElementById("forecastTable");
  for (i = 0; i < forecast.list.length; i++) {
    var row = buildForecastRow(forecast.list[i]);
    table.appendChild(row);
  }
}
