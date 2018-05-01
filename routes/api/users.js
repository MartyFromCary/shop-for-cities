const router = require("express").Router();
const userController = require("../../controllers/Users");

// Matches with "/api/user"
router.route("/").post(userController.create);
// Matches with "/api/user"
// Matches with "/api/saved"
router.route("/").get(userController.get);

module.exports = router;
