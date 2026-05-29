const express = require("express");
const {
  getCommentsByBook,
  createComment,
  deleteComment,
} = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/book/:bookId", getCommentsByBook);
router.post("/book/:bookId", protect, createComment);
router.delete("/:commentId", protect, deleteComment);

module.exports = router;