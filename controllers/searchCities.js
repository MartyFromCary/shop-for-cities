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
        .sort((a, b) => b.population - a.population)),

  getByTags: (req, res) => {
    const [tags, lat, long, radius, limit] = req.params.plist.split(":");
    const URL =
      sygicURLBase +
      [
        `tags=${tags}`,
        `area=${[lat, long, Math.floor(radius * miles2meters)].join(",")}`,
        `limit=${limit || defaultLimit}`
      ].join("&");

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
