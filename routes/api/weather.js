const router = require("express").Router();
const weatherAPIController = require("../../controllers/weatherAPI");

// Matches with "/api/weather/:loc"
router.route("/:lat/:long").get(weatherAPIController.get);

module.exports = router;