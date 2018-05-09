const router = require("express").Router();
const usersRoutes = require("./users");
const loginRoutes = require("./login");
const searchCitiesRoutes = require("./searchCities");
const citiesRoutes = require("./cities");
const notesRoutes = require("./notes");
const weatherRoutes = require("./weather");

router.use("/user", usersRoutes);
router.use("/saved", usersRoutes);

router.use("/login", loginRoutes);
router.use("/searchcities", searchCitiesRoutes);
router.use("/cities", citiesRoutes);
router.use("/notes", notesRoutes);
router.use("/weather", weatherRoutes);

module.exports = router;
