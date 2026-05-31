import { Link } from "react-router-dom";

const CATEGORY_COLORS = {
  Fantasy:           { bg: "rgba(139,92,246,0.55)",  color: "#ede9fe", border: "rgba(139,92,246,0.8)" },
  Classic:           { bg: "rgba(180,130,30,0.65)",  color: "#fef3c7", border: "rgba(201,168,76,0.9)" },
  "Science Fiction": { bg: "rgba(37,99,235,0.55)",   color: "#dbeafe", border: "rgba(59,130,246,0.8)" },
  Programming:       { bg: "rgba(5,150,105,0.55)",   color: "#d1fae5", border: "rgba(16,185,129,0.8)" },
  History:           { bg: "rgba(180,110,0,0.60)",   color: "#fef9c3", border: "rgba(245,158,11,0.85)" },
  General:           { bg: "rgba(80,76,96,0.65)",    color: "#e5e3ec", border: "rgba(120,116,128,0.8)" },
};

function BookCard({ book }) {
  const catStyle = CATEGORY_COLORS[book.category] || CATEGORY_COLORS.General;

  return (
    <div
      className="glass"
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.2)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 200, overflow: "hidden", background: "var(--surface2)" }}>
        {book.image ? (
          <img
            src={book.image}
            alt={book.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 48,
            background: "linear-gradient(135deg, var(--surface2), var(--bg))",
          }}>
            📖
          </div>
        )}
        {/* Category badge over image */}
        <div style={{
          position: "absolute", top: 12, left: 12,
          padding: "3px 10px", borderRadius: 999,
          fontSize: 11, fontWeight: 500, letterSpacing: "0.05em",
          textTransform: "uppercase",
          background: catStyle.bg,
          color: catStyle.color,
          border: `1px solid ${catStyle.border}`,
          backdropFilter: "blur(8px)",
        }}>
          {book.category || "General"}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 18, fontWeight: 600,
          margin: "0 0 4px",
          color: "var(--text)",
          lineHeight: 1.3,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {book.title}
        </h2>
        <p style={{ margin: "0 0 8px", color: "var(--gold)", fontSize: 13, fontWeight: 500 }}>
          {book.author}
        </p>
        <p style={{
          margin: "0 0 20px", color: "var(--muted)", fontSize: 13, lineHeight: 1.6,
          flex: 1,
          display: "-webkit-box", WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {book.description}
        </p>

        <Link
          to={`/books/${book._id}`}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 13, fontWeight: 500,
            color: "var(--gold-light)",
            textDecoration: "none",
            padding: "8px 16px",
            borderRadius: 8,
            border: "1px solid rgba(201,168,76,0.3)",
            background: "rgba(201,168,76,0.07)",
            transition: "all 0.2s",
            alignSelf: "flex-start",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(201,168,76,0.15)";
            e.currentTarget.style.borderColor = "rgba(201,168,76,0.6)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(201,168,76,0.07)";
            e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)";
          }}
        >
          Vezi detalii →
        </Link>
      </div>
    </div>
  );
}

export default BookCard;
