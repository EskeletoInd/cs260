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
    drawCurrentWeather(current);
  })
  fetch(urlBuilder(city_id, "forecast"))
  .then((resp) => resp.json())
  .then((forecast) => {
    //drawForecastWeather(forecast);
  })
}

//<div class="reviews">
//  <div class="review">
//    <div class="avatar">
//      <img src="/images/georgeIII.jpg" alt="">
//    </div>
//    <h3 class="username">King George III</p>
//    <p class="comment">Absolute terrible service. Ended slapping my drink out of my hand</p>
//  </div>

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

function drawForecastWeather(forecast) {
  console.log(forecast);
  let results = "";
  results += '<h2>Forecast of ' + forecast.name + "</h2>";
  for (let i = 0; i < forecast.weather.length; i++) {
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
  document.getElementById("forecastResults").innerHTML = results;
}
