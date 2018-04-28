const router = require("express").Router();
const citiesController = require("../../controllers/Cities");

// Matches with "/api/cities"
router.route("/").post(citiesController.create);

module.exports = router;
