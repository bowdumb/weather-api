var apiKey = "df5e9990ffbf1afeef20c40f5637942e";
var citySearchText = document.querySelector("#city-search");
var submitButton = document.querySelector("#submit-button");
var currentWeatherContainer = document.querySelector('#currentWeather');
var futureCardContainer = document.getElementById("future-card");
var savedCities = document.getElementById("saved-cities");
var savedList = [];

var cityInputSubmit = function (event) {
  event.preventDefault();
  var cityInput = citySearchText.value.toLowerCase();

  if (cityInput.length === 0) {
    return;
  }

  var dateToday = new Date();
  var formatDate = dateToday.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });

  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&appid=' + apiKey + '&units=imperial')
    .then(function (response) {
      if (response.status !== 200) {
        console.log(response.status);
        alert('That is not a valid city. Please enter another city name.');
        return;
      }
      return response.json();
    })
    .then(function (data) {
      var card = document.createElement("div");
      card.classList.add("card");

      console.log(data)
      var currentCardWeather = `
        <h2>${data.city.name} (${formatDate})</h2>
        <p>Current temperature: ${data.list[0].main.temp} °F</p>
        <p>Wind speed: ${data.list[0].wind.speed} mph</p>
        <p>Humidity: ${data.list[0].main.humidity}%</p>
      `

      currentWeatherContainer.innerHTML = "";
      card.innerHTML = currentCardWeather;

      var iconCode = data.list[0].weather[0].icon;
      var iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
      var weatherIcon = document.createElement("img");
      weatherIcon.src = iconUrl;
      card.appendChild(weatherIcon);

      currentWeatherContainer.appendChild(card);

      localStorage.setItem("recentSearch", cityInput);
      renderSaved();
      renderFiveDay(data, cityInput);
    });
};

function renderSaved() {
  var lastCitySearch = localStorage.getItem("recentSearch");
  var savedCityButton = document.createElement('button');
  savedCityButton.textContent = lastCitySearch;
  savedCityButton.addEventListener("click", function () {
    citySearchText.value = lastCitySearch;
    cityInputSubmit();
  });
  savedCities.appendChild(savedCityButton);
}

function renderFiveDay(data, cityInput) {
  futureCardContainer.innerHTML = "";

  var forecastData = [
    data.list[0],
    data.list[8],
    data.list[16],
    data.list[24],
    data.list[32]
  ];

  for (var i = 0; i < forecastData.length; i++) {
    var card = document.createElement("div");
    card.classList.add("card", "col-2", "m-2");

    var cardContent = document.createElement("div");
    cardContent.classList.add("card-body");

    var cardTitle = document.createElement("h5");
    cardTitle.textContent = data.city.name;
    cardContent.appendChild(cardTitle);

    var forecast = forecastData[i];
    var forecastContent = `
      <p>Date: ${forecast.dt_txt} </p>
      <p>Temperature: ${forecast.main.temp} °F</p>
      <p>Wind speed: ${forecast.wind.speed} mph</p>
      <p>Humidity: ${forecast.main.humidity}%</p>
    `

    var iconCode = forecast.weather[0].icon;
    var iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    var weatherIcon = document.createElement("img");
    weatherIcon.src = iconUrl;
    cardContent.appendChild(weatherIcon);

    cardContent.innerHTML += forecastContent;

    card.appendChild(cardContent);
    futureCardContainer.appendChild(card);
  }
}

submitButton.addEventListener("click", cityInputSubmit);