const router = require("express").Router();
const notesController = require("../../controllers/Notes");

// Matches with "/api/notes"
router.route("/:id").get(notesController.get);
router.route("/").post(notesController.create);
router.route("/").put(notesController.update);
router.route("/").delete(notesController.delete);

module.exports = router;