const Book = require("../models/Book");

const getBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate("createdBy", "username email role")
      .sort({ createdAt: -1 });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Eroare la obținerea cărților",
      error: error.message,
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "createdBy",
      "username email role",
    );

    if (!book) {
      return res.status(404).json({
        message: "Cartea nu a fost găsită",
      });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      message: "Eroare la obținerea cărții",
      error: error.message,
    });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, description, image, category } = req.body;

    if (!title || !author || !description) {
      return res.status(400).json({
        message: "Titlul, autorul și descrierea sunt obligatorii",
      });
    }

    if (title.length < 2) {
      return res.status(400).json({
        message: "Book title must have at least 2 characters",
      });
    }

    if (author.length < 2) {
      return res.status(400).json({
        message: "Author must have at least 2 characters",
      });
    }

    if (description.length < 10) {
      return res.status(400).json({
        message: "Description must have at least 10 characters",
      });
    }

    const book = await Book.create({
      title,
      author,
      description,
      image,
      category: category || "General",
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Carte creată cu succes",
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Eroare la crearea cărții",
      error: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { title, author, description, image, category } = req.body;

    const book = await Book.findById(req.params.id);

console.log("USER ID:", req.user._id.toString());
console.log("USER ROLE:", req.user.role);
console.log("BOOK OWNER:", book.createdBy.toString());

    if (!book) {
      return res.status(404).json({
        message: "Cartea nu a fost găsită",
      });
    }

    if (
      book.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Nu ai dreptul să modifici această carte",
      });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.category = category || book.category;
    book.image = image !== undefined ? image : book.image;

    const updatedBook = await book.save();

    res.status(200).json({
      message: "Carte actualizată cu succes",
      book: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Eroare la actualizarea cărții",
      error: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Cartea nu a fost găsită",
      });
    }

    if (
      book.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Nu ai dreptul să ștergi această carte",
      });
    }

    await book.deleteOne();

    res.status(200).json({
      message: "Carte ștearsă cu succes",
    });
  } catch (error) {
    res.status(500).json({
      message: "Eroare la ștergerea cărții",
      error: error.message,
    });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
