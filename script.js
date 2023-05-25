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
    // saveCity(cityInput);

    // savedCityStorage();

    

    var dateToday = new Date();
    var formatDate = dateToday.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });

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
            

            var currentCardWeather = `
                <h2>${data.city.name} (${formatDate})</h2>
                <p>Current temperature: ${data.list[0].main.temp} °F</p>
                <p>Wind speed: ${data.list[0].wind.speed} mph</p>
                <p>Humidity: ${data.list[0].main.humidity}%</p>
            `;
            currentWeatherContainer.innerHTML = ""; //Resets the currentWeatherContainer so that only one city's current weather is shown when another is searched.
            card.innerHTML = currentCardWeather;
            currentWeatherContainer.appendChild(card);

            

            renderFiveDay(data);

            var savedCitySearch = localStorage.setItem("cities", cityInput);
            // localStorage.setItem("recentSearch", JSON.stringify(cityListArray));
        });
};

function renderFiveDay(data) {
    // var formatFiveDate = new Date();
    // var formatFive = formatFiveDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
    futureCardContainer.innerHTML = ""; // Clear previous five-day forecast cards

    for (var i = 0; i < 5; i++) {
        var card = document.createElement("div");
        card.classList.add("card", "col-2", "m-2");

        var cardContent = document.createElement("div");
        cardContent.classList.add("card-body");

        var cardTitle = document.createElement("h5");
        cardTitle.textContent = data.city.name; // Update with the city name
        cardContent.appendChild(cardTitle);

        
        var forecastData = data.list[i * 9]; // Get forecast data to display for the five days following the current day.
        var forecastContent = `
            <p>Date: ${forecastData.dt_txt} </p>
            <p>Temperature: ${forecastData.main.temp} °F</p>
            <p>Wind speed: ${forecastData.wind.speed} mph</p>
            <p>Humidity: ${forecastData.main.humidity}%</p>
        `;
        cardContent.innerHTML += forecastContent; //concatenates and assigns the value of forecastContent to cardContent.innerHTML

        card.appendChild(cardContent);
        futureCardContainer.appendChild(card);

        
        
    }
}

submitButton.addEventListener("click", cityInputSubmit);
