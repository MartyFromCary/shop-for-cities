const axios = require("axios");

const defaultLimit = 100;
const deg2rad = deg => deg * (Math.PI / 180);

const simpleDistance = (lat1, long1, lat2, long2) =>
  deg2rad(
    Math.hypot(
      lat1 - lat2,
      (long1 - long2) *
        Math.cos(deg2rad((parseFloat(lat1) + parseFloat(lat2)) / 2))
    )
  ) * 3959;

const miles2meters = 1609.34;

// Deb commented out zomato to test google
const zomatoAPIKey = "9e66cf4217417a4634b38dc4c51f247d";
const zomatoURL = "https://developers.zomato.com/api/v2.1/geocode";
const sygicApiKey = "IpXhsdxZ5m2shf6P5X2qc5BPIJG0DlJF2oCPQm31";
const sygicURLBase = "https://api.sygictravelapi.com/1.0/en/places/list?";
var URL;
const googleKey = "AIzaSyDp_oAh4hQ_MZcAM-mtx5vJW65NCs_cxMA";

var queryUrl =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?rankby=distance" +
  "&key=" +
  googleKey +
  "&location=";

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
  /*
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
  },*/

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
            distance: simpleDistance(
              coordinates[0],
              coordinates[1],
              restaurant.location.latitude,
              restaurant.location.longitude
            )
          }))
          .sort((a, b) => a.distance - b.distance);
        res.json(restaurants);
      })
      .catch(err => console.log(err));
  },

  getSchool: (req, res) => {
    const coordinates = req.params.coordinates.split(":");
    // , {
    //   headers: {
    //     "user-key": googleKey
    //   }
    // }
    axios
      .get(`${queryUrl}${coordinates[0]},${coordinates[1]}&type=school`)
      .then(rsp => {
        const schools = rsp.data.results
          .map(school => ({
            name: school.name,
            address: school.vicinity,
            rating: school.rating,
            url: `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${
              school.place_id
            }`,
            distance: simpleDistance(
              coordinates[0],
              coordinates[1],
              school.geometry.location.lat,
              school.geometry.location.lng
            )
          }))
          .sort((a, b) => a.distance - b.distance);

        res.json(schools);
      })
      .catch(err => console.log(err));
  },
  /*
  getHospital: (req, res) => {
    const coordinates = req.params.coordinates.split(":");
    // , {
    //   headers: {
    //     "user-key": googleKey
    //   }
    // }
    axios
      .get(`${queryUrl}${coordinates[0]},${coordinates[1]}&type=hospital`)
      .then(rsp => {
        console.log(rsp.data.results);
        const hospitals = rsp.data.results
          .map(hospital => {
            var obj = {};
            obj["name"] = hospital.name;
            obj["address"] = hospital.vicinity;
            obj["rating"] = hospital.rating;
            obj[
              "url"
            ] = `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${
              hospital.place_id
            }`;
            obj["lat"] = hospital.geometry.location.lat;
            obj["long"] = hospital.geometry.location.lng;
            // distance: simpleDistance(
            //   coordinates[0],
            //   coordinates[1],
            //   hospital.geometry.location.lat,
            //   hospital.geometry.location.lng
            // )
            console.log(obj);
            return obj;
          })
          .sort((a, b) => a.distance - b.distance);
        console.log(hospitals);
        //return hospitals;
        res.json(hospitals);
      })
      .catch(err => console.log(err));
  }
  */

  getByTags: (req, res) => {
    const [tags, lat, long, radius, limit] = req.params.plist.split(":");
    console.log(tags, lat, long, radius, limit);
    const URL =
      sygicURLBase +
      [
        `tags=${tags}`,
        `area=${[lat, long, Math.floor(radius * miles2meters)].join(",")}`,
        `limit=${limit || defaultLimit}`
      ].join("&");
    console.log(URL);

    axios
      .get(URL, { headers: { "x-api-key": sygicApiKey } })
      .then(rsp =>
        res.json(
          rsp.data.data.places
            .map(place => ({
              name: place.name,
              address: place.name_suffix,
              url: place.url,
              distance: simpleDistance(
                lat,
                long,
                place.location.lat,
                place.location.lng
              )
            }))
            .sort((a, b) => a.distance - b.distance)
        )
      )
      .catch(err => console.log(err));
  }
};
