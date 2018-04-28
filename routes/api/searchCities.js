const router = require("express").Router();
const searchCitiesController = require("../../controllers/searchCities");

// Matches with "/api/searchcities/:loc"
router.route("/:loc").get(searchCitiesController.get);

module.exports = router;
