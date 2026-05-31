import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import CommentSection from "../components/CommentSection";

const CATEGORY_COLORS = {
  Fantasy:           { bg: "rgba(139,92,246,0.15)", color: "#c4b5fd", border: "rgba(139,92,246,0.3)" },
  Classic:           { bg: "rgba(201,168,76,0.12)", color: "#e8c97a", border: "rgba(201,168,76,0.3)" },
  "Science Fiction": { bg: "rgba(59,130,246,0.12)", color: "#93c5fd", border: "rgba(59,130,246,0.3)" },
  Programming:       { bg: "rgba(16,185,129,0.12)", color: "#6ee7b7", border: "rgba(16,185,129,0.3)" },
  History:           { bg: "rgba(245,158,11,0.12)", color: "#fcd34d", border: "rgba(245,158,11,0.3)" },
  General:           { bg: "rgba(120,116,128,0.12)", color: "#c4c2cb", border: "rgba(120,116,128,0.3)" },
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
      .catch(() => setMessage("Nu s-au putut încărca detaliile cărții"));
  }, [id]);

  const handleDelete = async () => {
    if (!token) { setMessage("Trebuie să fii logat."); return; }
    if (!window.confirm("Ești sigur că vrei să ștergi această carte?")) return;
    try {
      await api.delete(`/books/${id}`);
      navigate("/", { replace: true });
    } catch (error) {
      setMessage(error.response?.data?.message || "Eroare la ștergere.");
    }
  };

  if (message && !book) {
    return (
      <div style={{ maxWidth: 800, margin: "60px auto", padding: "0 24px", textAlign: "center" }}>
        <p style={{ color: "var(--danger)", fontSize: 16 }}>{message}</p>
        <Link to="/" className="btn-ghost" style={{ marginTop: 16, display: "inline-block" }}>← Înapoi</Link>
      </div>
    );
  }

  if (!book) {
    return (
      <div style={{ maxWidth: 800, margin: "60px auto", padding: "0 24px", textAlign: "center", color: "var(--muted)" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
        Se încarcă...
      </div>
    );
  }

  const catStyle = CATEGORY_COLORS[book.category] || CATEGORY_COLORS.General;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      {/* Back */}
      <Link
        to="/"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--muted)", textDecoration: "none", fontSize: 14, marginBottom: 28, transition: "color 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.color = "var(--gold-light)"}
        onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
      >
        ← Înapoi la colecție
      </Link>

      {/* Book Hero */}
      <div className="glass fade-up" style={{ overflow: "hidden", marginBottom: 32 }}>
        {book.image && (
          <div style={{ height: 360, overflow: "hidden" }}>
            <img
              src={book.image}
              alt={book.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}

        <div style={{ padding: "32px 36px" }}>
          {/* Badge */}
          <div style={{
            display: "inline-block",
            padding: "4px 12px", borderRadius: 999,
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
            de {book.author}
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
                ✏️ Editează
              </Link>
              <button className="btn-danger" onClick={handleDelete} style={{ fontSize: 14 }}>
                🗑 Șterge
              </button>
            </div>
          )}
          {message && <p style={{ color: "var(--danger)", marginTop: 12, fontSize: 13 }}>{message}</p>}
        </div>
      </div>

      {/* Comments */}
      <CommentSection bookId={id} />
    </div>
  );
}

export default BookDetailsPage;
