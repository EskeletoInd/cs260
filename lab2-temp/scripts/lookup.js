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

function getWeather(cityId, call) {
  const url = "http://api.openweathermap.org/data/2.5/" + call + "?id=" + cityId + "&units=imperial" + "&APPID=f708e944fc17fad73b301d123d4695ec";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      return json;
    });
}

async function populateWeather(selected_city) {
  var current = await getWeather(selected_city, "weather");
  var forecast = await getWeather(selected_city, "forecast");
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
