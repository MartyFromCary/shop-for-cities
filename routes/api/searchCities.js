const router = require("express").Router();
const searchCitiesController = require("../../controllers/searchCities");

// Matches with "/api/searchcities/:loc"
router.route("/:loc").get(searchCitiesController.get);
router
  .route("/restaurants/:coordinates")
  .get(searchCitiesController.getRestaurant);

module.exports = router;
