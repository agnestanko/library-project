import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";

const CATEGORIES = ["General", "Classic", "Fantasy", "Science Fiction", "Programming", "History"];

function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("General");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get(`/books/${id}`).then(r => {
      setTitle(r.data.title);
      setAuthor(r.data.author);
      setDescription(r.data.description);
      setCategory(r.data.category || "General");
      setImage(r.data.image || "");
    }).catch(() => setMessage("Could not load book"));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/books/${id}`, { title, author, description, category, image });
      navigate(-1);
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not update book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
      <Link
        to={`/books/${id}`}
        style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--muted)", textDecoration: "none", fontSize: 14, marginBottom: 28, transition: "color 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.color = "var(--gold-light)"}
        onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
      >
        ← Back
      </Link>

      <div className="glass fade-up" style={{ padding: "36px 40px" }}>
        <h1 style={{ margin: "0 0 6px", fontSize: 28 }}>Edit book</h1>
        <p style={{ margin: "0 0 28px", color: "var(--muted)", fontSize: 14 }}>Update the book details</p>

        <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Title *</label>
              <input className="fancy-input" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Author *</label>
              <input className="fancy-input" value={author} onChange={e => setAuthor(e.target.value)} required />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Description *</label>
            <textarea className="fancy-input" value={description} onChange={e => setDescription(e.target.value)} rows={4} style={{ resize: "vertical" }} required />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Category</label>
              <select className="fancy-input" value={category} onChange={e => setCategory(e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Image URL</label>
              <input className="fancy-input" placeholder="https://..." value={image} onChange={e => setImage(e.target.value)} />
            </div>
          </div>

          {image && (
            <div style={{ borderRadius: 10, overflow: "hidden", height: 160 }}>
              <img src={image} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}

          {message && (
            <div style={{ padding: "10px 16px", borderRadius: 8, background: "rgba(224,85,85,0.1)", border: "1px solid rgba(224,85,85,0.3)", color: "var(--danger)", fontSize: 13 }}>
              {message}
            </div>
          )}

          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 8 }}>
            <button type="button" className="btn-ghost" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn-gold" disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBookPage;
