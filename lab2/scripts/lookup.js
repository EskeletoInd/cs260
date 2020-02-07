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
    emptyCurrentWeather();
    drawCurrentWeather(current);
  })
  fetch(urlBuilder(city_id, "forecast"))
  .then((resp) => resp.json())
  .then((forecast) => {
    emptyForecastTable();
    drawForecastWeather(forecast);
  })
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

function emptyCurrentWeather() {
  var div = document.getElementById("weatherResults");
  div.innerHTML = "";
}

function emptyForecastTable() {
  var rows = document.getElementById("forecastTable").rows;
  for (var i = rows.length - 1; i >= 1; --i) {
    rows[i].remove();
  }
}

function drawCurrentWeather(current) {
  console.log(current);

  var details = document.createElement("div");
  details.classList.add("weatherDetails");
  // Add Image
  var img = document.createElement("img");
  img.src = "http://openweathermap.org/img/w/" + current.weather[0].icon + ".png";
  // First Column
  var col = document.createElement("div");
  details.appendChild(col);
  // Current Temp
  var item = document.createElement("div");
  item.innerHTML = "Current Temp: " + current.main.temp + "°F";
  col.appendChild(item);
  // Current RealFeel
  var item = document.createElement("div");
  item.innerHTML = "Feels Like: " + current.main.feels_like + "°F";
  col.appendChild(item);

  // Second Column
  var col = document.createElement("div");
  details.appendChild(col);
  // Temp Max
  var item = document.createElement("div");
  item.innerHTML = "Low: " + current.main.temp_min + "°F";
  col.appendChild(item);
  // Temp Min
  var item = document.createElement("div");
  item.innerHTML = "High: " + current.main.temp_max + "°F";
  col.appendChild(item);

  // Third Column
  var col = document.createElement("div");
  details.appendChild(col);
  // Humidity
  var item = document.createElement("div");
  item.innerHTML = "Humidity: " + current.main.humidity + "%";
  col.appendChild(item);
  // Cloudiness
  var item = document.createElement("div");
  item.innerHTML = "Cloudiness: " + current.clouds.all + "%";
  col.appendChild(item);

  // Four Column
  var col = document.createElement("div");
  details.appendChild(col);
  // Wind Direction
  var item = document.createElement("div");
  item.innerHTML = "Wind Direction: " + degreeToDirection(current.wind.deg);
  col.appendChild(item);
  // Wind Speed
  var item = document.createElement("div");
  item.innerHTML = "Feels Like: " + current.wind.speed + "mph";
  col.appendChild(item);

  var header = document.createElement("h1");
  header.innerHTML = current.name;
  var div = document.getElementById("weatherResults");
  div.appendChild(header);
  div.appendChild(details);
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
  table.style.display = "block";
}
