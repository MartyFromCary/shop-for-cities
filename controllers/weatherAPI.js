const axios = require("axios");

module.exports = {
    get: ({ params }, res) => {
        const weatherAppID = "bff087f159c4f0f8f86174f72117926c";
        const weatherUrl =
            `http://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.long}&units=imperial&APPID=${weatherAppID}`;
        axios(weatherUrl)
            .then(({ data }) =>
                res.json({
                    city: data.name,
                    main: data.weather[0].main,
                    temp: data.main.temp,
                    pressure: data.main.pressure,
                    humidity: data.main.humidity
                })
            )
            .catch(err => console.log(err));
    }
};
