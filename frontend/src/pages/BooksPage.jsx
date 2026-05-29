import { useEffect, useState } from "react";
import api from "../services/api";
import BookCard from "../components/BookCard";

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const fetchBooks = async () => {
    try {
      const response = await api.get("/books");
      setBooks(response.data);
    } catch (error) {
      setMessage("Could not load books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();

    try {
      await api.post("/books", {
        title,
        author,
        description,
        image,
      });

      setTitle("");
      setAuthor("");
      setDescription("");
      setImage("");
      setMessage("Book added successfully");

      fetchBooks();
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not add book");
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Books</h1>

      <form
        onSubmit={handleAddBook}
        className="bg-white p-4 rounded shadow mb-8 space-y-3"
      >
        <h2 className="text-xl font-bold">Add Book</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button className="bg-slate-800 text-white px-4 py-2 rounded">
          Add Book
        </button>
      </form>

      {message && <p className="mb-4 text-blue-600">{message}</p>}

      <input
        className="w-full border p-3 rounded mb-6"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default BooksPage;
