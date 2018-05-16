const router = require("express").Router();
const searchCitiesController = require("../../controllers/searchCities");

// Matches with "/api/searchcities/:loc"
router.route("/:loc").get(searchCitiesController.get);

router.route("/tags/:plist").get(searchCitiesController.getByTags);

module.exports = router;
