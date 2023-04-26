var apiKey = "df5e9990ffbf1afeef20c40f5637942e";
var atlLat = 33.7488
var atlLong = -84.3877


fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + atlLat + '&lon=' + atlLong + '&appid=df5e9990ffbf1afeef20c40f5637942e&units')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })



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

    // function(city) {

    // }