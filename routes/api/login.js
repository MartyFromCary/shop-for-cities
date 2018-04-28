const router = require("express").Router();
const userController = require("../../controllers/Users");
const loginController = require("../../controllers/Login");

// Matches with "/api/login"
router.route("/").post(userController.login);
// Matches with "/api/login/test"
router.route("/test").post(loginController.test);

module.exports = router;
