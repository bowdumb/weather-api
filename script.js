var apiKey = "df5e9990ffbf1afeef20c40f5637942e"; //A variable that stores my personal OpenWeatherMaps API key.
var citySearch = []; //creates a variable with an empty array for storing the content of the getCity function.
var citySearchText = document.querySelector("#city-search");
var submitButton = document.querySelector("#submit-button");
var currentWeatherContainer = document.querySelector('#currentWeather')
var searchedCities = document.getElementById("saved-cities");
// var currentWeatherSearchContainer = document.querySelector("#currentWeatherSearch");

// submitButton.addEventListener("click", cityInputSubmit)

var cityInputSubmit = function (event) {
    event.preventDefault();
    var cityInput = citySearchText.value.toLowerCase();
    console.log(cityInput);
    if (cityInput.length == 0) {
        return;
    };

var dateToday = new Date();
var formatDate = dateToday.toLocaleDateString('en-US', {month: 'numeric', day: 'numeric', year: 'numeric'});

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
        console.log(data)
        console.log("City Name:", data.city.name);
        console.log(data.list[0].main.temp);
        console.log("The current date is: ", dateToday);
        console.log(data.list[0].wind.speed, "MPH");
        console.log(data.list[0].main.humidity);
      
        var card = document.createElement("div");
        card.classList.add("card");

    var currentCardWeather = `
    <h2>${data.city.name} (${formatDate})</h2>
    <p> Current temperature: ${data.list[0].main.temp} °F</p>
    <p>Wind speed: ${data.list[0].wind.speed} mph</p>
    <p>Humidity: ${data.list[0].main.humidity}%</p>
    `
        card.innerHTML = currentCardWeather;
        currentWeatherContainer.appendChild(card);
    });
};

function cityHistory() {
    localStorage.setItem('City', cityInput);
    var citySearches = localStorage.getItem('City');
    var storedCity = document.createElement("button");
    storedCity.textContent = citySearches;
    searchedCities.appendChild(storedCity);
    console.log(citySearches);
}

submitButton.addEventListener("click", cityInputSubmit);


