const axios = require("axios");
// add weather API
// const weatherAppID = "bff087f159c4f0f8f86174f72117926c";
/*
// create function to call the openweathermap api
function getWeatherInfo(city, callback) {
  var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city+"&units=imperial" + "&APPID=" + weatherAppID;

  
  fetch(weatherUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    callback({
        city: json.name,
        main: json.weather[0].main,
        description: json.weather[0].description,
        image: "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png",
        temp: json.main.temp,
        pressure: json.main.pressure,
        humidity: json.main.humidity
    });
});
}
*/
/*
getWeatherInfo("Boston", function(response) {
    console.log (response)
}
);
*/
/*
module.exports = getWeatherInfo;
*/
module.exports = {
    get: (req, res) => {
        var city = req.params.loc;
        // add weather API
        const weatherAppID = "bff087f159c4f0f8f86174f72117926c";
        var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city+ "&units=imperial" + "&APPID=" + weatherAppID;

        axios(weatherUrl)
        .then(function(json) {
            console.log('result', json);
            res.json({
                city: json.data.name,
                main: json.data.weather[0].main,
                description: json.data.weather[0].description,
                image: "http://openweathermap.org/img/w/" + json.data.weather[0].icon + ".png",
                temp: json.data.main.temp,
                pressure: json.data.main.pressure,
                humidity: json.data.main.humidity
            });
        });
    }
};
