const router = require("express").Router();
const citiesController = require("../../controllers/Cities");

// Matches with "/api/cities"
router.route("/:_id").get(citiesController.get);
router.route("/").post(citiesController.create);
router.route("/").delete(citiesController.delete);

module.exports = router;
