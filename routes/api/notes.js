const router = require("express").Router();
const notesController = require("../../controllers/Notes");

// Matches with "/api/notes"
router.route("/").post(notesController.create);
router.route("/:id").get(notesController.get);

module.exports = router;
