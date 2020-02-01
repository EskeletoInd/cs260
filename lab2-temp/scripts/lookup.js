document.getElementById("searchbtn").onclick = function(event) {
  event.preventDefault();
  if (selected_city === null) {
    console.log("No City to search");
    showToast();
  } else {
    console.log("Searching for " + selected_city);
    populateWeather(selected_city);
  }
};

function showToast() {
  $('#noCityToast').toast('show');
}

function populateWeather(city_id) {
  new Promise((resolve, reject) => {
    resolve([getWeather(city_id, "weather"), getWeather(city_id, "forecast")]);
  }).then(function(results) {
    drawResults(results[0], results[1]);
  });
}

function getWeather(city_id, call) {
  const url = "http://api.openweathermap.org/data/2.5/" + call + "?id=" + city_id + "&units=imperial" + "&APPID=f708e944fc17fad73b301d123d4695ec";
  var a = fetch(url)
    .then(function(response) {
      resolve(response.json());
    }).then(function(json) {
      console.log(json);
      return json;
    });
  return a;
}

function drawResults(current, forecast) {
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
