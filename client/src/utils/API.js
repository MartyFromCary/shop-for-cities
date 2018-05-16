import axios from "axios";
// import fetch from "node-fetch";

export default {
  getUser : data => axios.get("/api/user", data),

  // Saves a user to the database
  saveUser : data => axios.post("/api/user", data),
  //saveUser: user => fetch("/api/user", { method: "POST", body: user }),
  createSaved : data => axios.post("/api/cities", data),
  getSaved : data => axios.get("/api/cities", data),
  getCity : data => axios.get(`/api/cities/${data}`),
  deleteSaved : data => axios({method: "DELETE", url: "/api/cities", data: data}),
  loginUser : data => axios.post("/api/login", data/*{ href: "/search" }*/),

  searchCities : loc => axios.get("/api/searchcities/" + loc.name),
  getWeatherInfo : data => axios.get("/api/weather/" + data.lat + "/" + data.long),

  getByTags : plist => axios.get("/api/searchcities/tags/" + plist.join(":")),

  createNote : data => axios.post("/api/notes", data),
  updateNote : data => axios.put("/api/notes", data),
  deleteNote : data => axios({method: "DELETE", url: "/api/notes", data: data})
};
