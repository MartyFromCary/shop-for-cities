const cities = require("all-the-cities-mongodb").map(city => ({
  id: city.cityId,
  name: city.name,
  state: city.adminCode,
  country: city.country,
  population: city.population,
  lat: city.loc.coordinates[0],
  long: city.loc.coordinates[1]
})); //console.log(`Count: ${cities.length}`);

/// Count: 127,420

module.exports = {
  get: (req, res) => {
    const cityArr = cities
      .filter(city => city.name.match(new RegExp(req.params.loc, "i")))
      .sort((a, b) => b.population - a.population);
    res.json(cityArr);
  }
};
