const router = require("express").Router();
const usersRoutes = require("./users");
const loginRoutes = require("./login");
const searchCitiesRoutes = require("./searchCities");
const citiesRoutes = require("./cities");

router.use("/user", usersRoutes);
router.use("/saved", usersRoutes);

router.use("/login", loginRoutes);
router.use("/searchcities", searchCitiesRoutes);
router.use("/cities", citiesRoutes);

module.exports = router;
