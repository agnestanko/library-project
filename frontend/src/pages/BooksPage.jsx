import { useEffect, useState } from "react";
import api from "../services/api";
import BookCard from "../components/BookCard";

const CATEGORIES = ["General", "Classic", "Fantasy", "Science Fiction", "Programming", "History"];

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("General");

  const [searchTerm, setSearchTerm] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("");

  const fetchBooks = async () => {
    try {
      const response = await api.get("/books");
      setBooks(response.data);
    } catch {
      setMessage("Could not load books");
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await api.post("/books", { title, author, description, category, image });
      setTitle(""); setAuthor(""); setDescription(""); setCategory("General"); setImage("");
      setIsSuccess(true);
      setMessage("Book added successfully!");
      setShowForm(false);
      fetchBooks();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setIsSuccess(false);
      setMessage(error.response?.data?.message || "Could not add book");
    }
  };

  const filteredBooks = books
    .filter(b => b.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(b => b.author.toLowerCase().includes(authorFilter.toLowerCase()))
    .filter(b => categoryFilter ? b.category === categoryFilter : true)
    .sort((a, b) => {
      if (sortOption === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOption === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortOption === "title") return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>

      {/* Header */}
      <div className="fade-up" style={{ marginBottom: 40, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <p style={{ margin: "0 0 4px", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 500 }}>
            Collection
          </p>
          <h1 style={{ margin: 0, fontSize: 42, fontFamily: "'Playfair Display', serif" }}>
            Online <span className="gold-text">Library</span>
          </h1>
        </div>
        {token && (
          <button
            className="btn-gold"
            onClick={() => setShowForm(!showForm)}
            style={{ fontSize: 14 }}
          >
            {showForm ? "✕ Close" : "+ Add book"}
          </button>
        )}
      </div>

      {/* Message */}
      {message && (
        <div className="fade-up" style={{
          padding: "12px 20px", borderRadius: 10, marginBottom: 24,
          background: isSuccess ? "rgba(76,175,125,0.1)" : "rgba(224,85,85,0.1)",
          border: `1px solid ${isSuccess ? "rgba(76,175,125,0.3)" : "rgba(224,85,85,0.3)"}`,
          color: isSuccess ? "var(--success)" : "var(--danger)",
          fontSize: 14,
        }}>
          {message}
        </div>
      )}

      {/* Add Book Form */}
      {showForm && (
        <div className="glass fade-up" style={{ padding: 28, marginBottom: 32 }}>
          <h2 style={{ margin: "0 0 20px", fontSize: 20 }}>Add a new book</h2>
          <form onSubmit={handleAddBook} style={{ display: "grid", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Title *</label>
                <input className="fancy-input" placeholder="Book title" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Author *</label>
                <input className="fancy-input" placeholder="Author name" value={author} onChange={e => setAuthor(e.target.value)} required />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Description *</label>
              <textarea className="fancy-input" placeholder="Short description..." value={description} onChange={e => setDescription(e.target.value)} rows={3} style={{ resize: "vertical" }} required />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Category</label>
                <select className="fancy-input" value={category} onChange={e => setCategory(e.target.value)}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Image URL</label>
                <input className="fancy-input" placeholder="https://..." value={image} onChange={e => setImage(e.target.value)} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="btn-gold">Add book</button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="glass fade-up-1" style={{ padding: "16px 20px", marginBottom: 32, display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 12 }}>
        <input className="fancy-input" placeholder="🔍  Search by title..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <input className="fancy-input" placeholder="Author..." value={authorFilter} onChange={e => setAuthorFilter(e.target.value)} />
        <select className="fancy-input" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="">All categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="fancy-input" value={sortOption} onChange={e => setSortOption(e.target.value)}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="title">Title A-Z</option>
        </select>
      </div>

      {/* Stats */}
      <p className="fade-up-2" style={{ margin: "0 0 20px", fontSize: 13, color: "var(--muted)" }}>
        {filteredBooks.length} {filteredBooks.length === 1 ? "book found" : "books found"}
        {searchTerm || authorFilter || categoryFilter ? " (filtered)" : ""}
      </p>

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div style={{
          padding: 80, textAlign: "center",
          border: "1px dashed var(--border)", borderRadius: 16,
          color: "var(--muted)",
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
          <p style={{ margin: 0, fontSize: 16 }}>No books match your filters.</p>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 24,
        }}>
          {filteredBooks.map((book, i) => (
            <div key={book._id} className="fade-up" style={{ animationDelay: `${i * 0.05}s`, display: "flex" }}>
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BooksPage;
