const express = require("express");
const {
  getNoteById,
  getNotes,
  DeleteNote,
  UpdateNote,
  CreateNote,
} = require("../controllers/notesControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
router.route("/").get(protect, getNotes);
router
  .route("/:id")
  .get(getNoteById)
  .delete(protect, DeleteNote)
  .put(protect, UpdateNote);
router.route("/create").post(protect, CreateNote);
module.exports = router;
