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
// Deb commented out zomato to test google
// const zomatoAPIKey = "9e66cf4217417a4634b38dc4c51f247d";
// const zomatoURL = "https://developers.zomato.com/api/v2.1/geocode";
var URL;
const googleKey = "AIzaSyDp_oAh4hQ_MZcAM-mtx5vJW65NCs_cxMA";
var queryUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?rankby=distance" + "&key=" + googleKey + "&location=";

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
    // , {
    //   headers: {
    //     "user-key": googleKey
    //   }
    // }
    axios
      .get(`${queryUrl}${coordinates[0]},${coordinates[1]}&type=restaurant`)
      .then(rsp => {
        console.log(rsp.data.results);
        const restaurants = rsp.data.results
          .map( restaurant  => {
            var obj = {};
            obj["name"]= restaurant.name
            obj["address"]= restaurant.vicinity
            // // cuisine: restaurant.cuisines,
            // // cost_for_2: restaurant.average_cost_for_two,
            obj["rating"]= restaurant.rating
            obj["url"]= `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${restaurant.place_id}`
            obj["lat"]= restaurant.geometry.location.lat
            obj["long"]= restaurant.geometry.location.lng
            // distance: simpleDistance(
            //   coordinates[0],
            //   coordinates[1],
            //   restaurant.geometry.location.lat,
            //   restaurant.geometry.location.lng
            // )
            console.log(obj);
            return obj;
          })
          .sort((a, b) => a.distance - b.distance);
        console.log(restaurants);
        //return restaurants;
        res.json(restaurants);
      })
      .catch(err => console.log(err));
  }
};
