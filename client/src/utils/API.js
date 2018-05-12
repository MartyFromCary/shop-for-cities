import axios from "axios";
// import fetch from "node-fetch";

export default {
  getUser: data => axios.get("/api/user", data),

  // Saves a user to the database
  saveUser: data => axios.post("/api/user", data),
  //saveUser: user => fetch("/api/user", { method: "POST", body: user }),
  createSaved: data => axios.post("/api/cities", data),
  getSaved: data => axios.get("/api/cities", data),
  getCity: data => axios.get(`/api/cities/${data}`),
  deleteSaved: data => axios.delete("/api/cities", data),
  loginUser: data => axios.post("/api/login", data /*{ href: "/search" }*/),

  searchCities: loc => axios.get("/api/searchcities/" + loc.name),
  getWeatherInfo: data =>
    axios.get("/api/weather/" + data.lat + "/" + data.long),
  // line 19 duplicate of line 16
  //   searchCities: loc => axios.get(`/api/searchcities/${loc.name}`),
  restaurants: (lat, long) =>
    axios.get(`/api/searchcities/restaurants/${lat}:${long}`),
  schools: (lat, long) => axios.get(`/api/searchcities/schools/${lat}:${long}`),

  getByTags: plist => axios.get("/api/searchcities/tags/" + plist.join(":"))
};
