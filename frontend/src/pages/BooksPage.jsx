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
  const [authorFilter, setAuthorFilter] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  const [category, setCategory] = useState("General");
  const [categoryFilter, setCategoryFilter] = useState("");

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
        category,
        image,
      });

      setTitle("");
      setAuthor("");
      setDescription("");
      setCategory("General");
      setImage("");
      setMessage("Book added successfully");
      fetchBooks();
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not add book");
    }
  };

  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((book) =>
      book.author.toLowerCase().includes(authorFilter.toLowerCase()),
    )
    .filter((book) =>
      categoryFilter ? book.category === categoryFilter : true,
    )
    .sort((a, b) => {
      if (sortOption === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      if (sortOption === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }

      if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      }

      return 0;
    });

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

        <select
          className="w-full border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Classic">Classic</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Programming">Programming</option>
          <option value="History">History</option>
        </select>

        <button className="bg-slate-800 text-white px-4 py-2 rounded">
          Add Book
        </button>
      </form>

      {message && <p className="mb-4 text-blue-600">{message}</p>}

      <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Filter by author..."
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All categories</option>
          <option value="General">General</option>
          <option value="Classic">Classic</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Programming">Programming</option>
          <option value="History">History</option>
        </select>

        <select
          className="border p-2 rounded"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="title">Title A-Z</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default BooksPage;
