const axios = require("axios");

const deg2rad = deg => deg * (Math.PI / 180);

const simpleDistance = (lat1, long1, lat2, long2) =>
  deg2rad(
    Math.hypot(
      lat1 - lat2,
      (long1 - long2) *
        Math.cos(deg2rad((parseFloat(lat1) + parseFloat(lat2)) / 2))
    )
  ) * 3959;

const zomatoAPIKey = "9e66cf4217417a4634b38dc4c51f247d";
const zomatoURL = "https://developers.zomato.com/api/v2.1/geocode";
var URL;

const cities = require("all-the-cities-mongodb").map(city => ({
  id: city.cityId,
  name: city.name,
  state: city.adminCode,
  country: city.country,
  population: city.population,
  lat: city.loc.coordinates[1],
  long: city.loc.coordinates[0]
})); //console.log(`Count: ${cities.length}`);

/// Count: 127,420

module.exports = {
  get: (req, res) =>
    res.json(
      cities
        .filter(city => city.name.match(new RegExp(req.params.loc, "i")))
        .sort((a, b) => b.population - a.population)
    ),
  getRestaurant: (req, res) => {
    const coordinates = req.params.coordinates.split(":");

    axios
      .get(`${zomatoURL}?lat=${coordinates[0]}&lon=${coordinates[1]}`, {
        headers: {
          "user-key": zomatoAPIKey
        }
      })
      .then(rsp => {
        const restaurants = rsp.data.nearby_restaurants
          .map(({ restaurant }) => ({
            name: restaurant.name,
            address: restaurant.location.address,
            cuisine: restaurant.cuisines,
            cost_for_2: restaurant.average_cost_for_two,
            rating: restaurant.user_rating.rating_text,
            url: restaurant.url,
            lat: restaurant.location.latitude,
            long: restaurant.location.longitude,
            distance: simpleDistance(
              coordinates[0],
              coordinates[1],
              restaurant.location.latitude,
              restaurant.location.longitude
            )
          }))
          .sort((a, b) => a.distance - b.distance);
        console.log(restaurants);
        //console.log("");
        //return restaurants;
        res.json(restaurants);
      })
      .catch(err => console.log(err));
  }
};
