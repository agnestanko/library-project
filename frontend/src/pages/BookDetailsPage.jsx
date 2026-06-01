import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import CommentSection from "../components/CommentSection";

const CATEGORY_COLORS = {
  Fantasy:           { bg: "rgba(139,92,246,0.55)",  color: "#ede9fe", border: "rgba(139,92,246,0.8)" },
  Classic:           { bg: "rgba(180,130,30,0.65)",  color: "#fef3c7", border: "rgba(201,168,76,0.9)" },
  "Science Fiction": { bg: "rgba(37,99,235,0.55)",   color: "#dbeafe", border: "rgba(59,130,246,0.8)" },
  Programming:       { bg: "rgba(5,150,105,0.55)",   color: "#d1fae5", border: "rgba(16,185,129,0.8)" },
  History:           { bg: "rgba(180,110,0,0.60)",   color: "#fef9c3", border: "rgba(245,158,11,0.85)" },
  General:           { bg: "rgba(80,76,96,0.65)",    color: "#e5e3ec", border: "rgba(120,116,128,0.8)" },
};

function BookDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    api.get(`/books/${id}`)
      .then(r => setBook(r.data))
      .catch(() => setMessage("Could not load book details"));
  }, [id]);

  const handleDelete = async () => {
    if (!token) { setMessage("You must be logged in."); return; }
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await api.delete(`/books/${id}`);
      navigate("/", { replace: true });
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not delete book.");
    }
  };

  if (message && !book) {
    return (
      <div style={{ maxWidth: 800, margin: "60px auto", padding: "0 24px", textAlign: "center" }}>
        <p style={{ color: "var(--danger)", fontSize: 16 }}>{message}</p>
        <Link to="/" className="btn-ghost" style={{ marginTop: 16, display: "inline-block" }}>← Back</Link>
      </div>
    );
  }

  if (!book) {
    return (
      <div style={{ maxWidth: 800, margin: "60px auto", padding: "0 24px", textAlign: "center", color: "var(--muted)" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
        Loading...
      </div>
    );
  }

  const catStyle = CATEGORY_COLORS[book.category] || CATEGORY_COLORS.General;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      <Link
        to="/"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--muted)", textDecoration: "none", fontSize: 14, marginBottom: 28, transition: "color 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.color = "var(--gold-light)"}
        onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
      >
        ← Back to collection
      </Link>

      <div className="glass fade-up" style={{ overflow: "hidden", marginBottom: 32 }}>
        {book.image && (
          <div style={{ height: 360, overflow: "hidden" }}>
            <img src={book.image} alt={book.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}

        <div style={{ padding: "32px 36px" }}>
          <div style={{
            display: "inline-block", padding: "4px 12px", borderRadius: 999,
            fontSize: 11, fontWeight: 500, letterSpacing: "0.07em",
            textTransform: "uppercase", marginBottom: 16,
            background: catStyle.bg, color: catStyle.color, border: `1px solid ${catStyle.border}`,
          }}>
            {book.category || "General"}
          </div>

          <h1 style={{ margin: "0 0 8px", fontSize: 36, fontFamily: "'Playfair Display', serif", lineHeight: 1.2 }}>
            {book.title}
          </h1>
          <p style={{ margin: "0 0 20px", fontSize: 18, color: "var(--gold)", fontWeight: 500 }}>
            by {book.author}
          </p>

          <div className="divider" />

          <p style={{ margin: "20px 0", fontSize: 15, lineHeight: 1.8, color: "var(--text)" }}>
            {book.description}
          </p>

          {token && (
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <Link
                to={`/books/${id}/edit`}
                className="btn-ghost"
                style={{ fontSize: 14, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                ✏️ Edit
              </Link>
              <button className="btn-danger" onClick={handleDelete} style={{ fontSize: 14 }}>
                🗑 Delete
              </button>
            </div>
          )}
          {message && <p style={{ color: "var(--danger)", marginTop: 12, fontSize: 13 }}>{message}</p>}
        </div>
      </div>

      <CommentSection bookId={id} />
    </div>
  );
}

export default BookDetailsPage;
