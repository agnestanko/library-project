const Comment = require("../models/Comment");
const Book = require("../models/Book");

const getCommentsByBook = async (req, res) => {
  try {
    const comments = await Comment.find({ book: req.params.bookId })
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message: "Eroare la obținerea comentariilor",
      error: error.message,
    });
  }
};

const createComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Comentariul nu poate fi gol",
      });
    }

    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({
        message: "Cartea nu a fost găsită",
      });
    }

    const comment = await Comment.create({
      text,
      book: req.params.bookId,
      user: req.user._id,
    });

    const populatedComment = await Comment.findById(comment._id).populate(
      "user",
      "username email",
    );

    const io = req.app.get("io");
    io.to(req.params.bookId).emit("newComment", populatedComment);

    res.status(201).json({
      message: "Comentariu adăugat cu succes",
      comment: populatedComment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Eroare la adăugarea comentariului",
      error: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comentariul nu a fost găsit",
      });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Nu ai dreptul să ștergi acest comentariu",
      });
    }

    await comment.deleteOne();

    res.status(200).json({
      message: "Comentariu șters cu succes",
    });
  } catch (error) {
    res.status(500).json({
      message: "Eroare la ștergerea comentariului",
      error: error.message,
    });
  }
};

module.exports = {
  getCommentsByBook,
  createComment,
  deleteComment,
};
