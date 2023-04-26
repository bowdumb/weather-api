var apiKey = "df5e9990ffbf1afeef20c40f5637942e"; //A variable that stores my personal OpenWeatherMaps API key.
var atlLat = 33.7488
var atlLong = -84.3877
var citySearch = []; //creates a variable with an empty array for storing the content of the getCity function.
var citySearchText = document.querySelector("#city-search");

// fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + atlLat + '&lon=' + atlLong + '&appid=df5e9990ffbf1afeef20c40f5637942e&units')
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log(data);
//     })



    fetch('http://api.openweathermap.org/geo/1.0/direct?q=New York,us-ny,840&limit=1&appid=df5e9990ffbf1afeef20c40f5637942e&units')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })

    //city name
    //country
    //lattitude
    //longitude



    // citySearchText.addEventListener("submit", getCity)

    // var formEl = ""
    //     if (formEl.addEventListener) {
    //         formEl.addEventListener("submit", getCity);
    //         console.log(formEl);
    //     }
    
//   document.getElementById("city-search").subm = function() {getCity()};


    

    var citySearchText = document.getElementById("city-search").value;
    
    console.log(citySearchText);
  
