import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [profileRes, booksRes] = await Promise.all([
          api.get("/auth/profile"),
          api.get("/books"),
        ]);
        setUser(profileRes.data.user);
        setBooks(booksRes.data);
      } catch {
        setMessage("You must be logged in to view your profile.");
      }
    };
    fetchProfile();
  }, []);

  if (message) {
    return (
      <div
        style={{
          maxWidth: 600,
          margin: "60px auto",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "var(--danger)" }}>{message}</p>
        <Link
          to="/login"
          className="btn-gold"
          style={{
            marginTop: 16,
            display: "inline-block",
            textDecoration: "none",
          }}
        >
          Go to Login
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          maxWidth: 600,
          margin: "60px auto",
          padding: "0 24px",
          textAlign: "center",
          color: "var(--muted)",
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
        Loading profile...
      </div>
    );
  }

  const myBooks = books.filter(
    (b) => b.createdBy?._id === user.id || b.createdBy === user.id,
  );

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>
      <div
        className="glass fade-up"
        style={{ padding: "36px 40px", marginBottom: 28 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--gold), #b8923f)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
              color: "#0d0d0f",
              flexShrink: 0,
              boxShadow: "0 0 0 4px rgba(201,168,76,0.2)",
            }}
          >
            {user.username[0].toUpperCase()}
          </div>
          <div>
            <h1 style={{ margin: "0 0 4px", fontSize: 28 }}>{user.username}</h1>
            <p style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>
              {user.email}
            </p>
          </div>
        </div>

        <div className="divider" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            marginTop: 24,
          }}
        >
          {[
            { label: "Books added", value: myBooks.length, icon: "📚" },
            { label: "Role", value: user.role || "user", icon: "🎭" },
            { label: "Status", value: "Active", icon: "✅" },
          ].map(({ label, value, icon }) => (
            <div
              key={label}
              style={{
                padding: "16px 20px",
                borderRadius: 12,
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  fontFamily: "'Playfair Display', serif",
                  color: "var(--gold-light)",
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--muted)",
                  marginTop: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass fade-up-1" style={{ padding: "28px 32px" }}>
        <h2 style={{ margin: "0 0 20px", fontSize: 22 }}>My Books</h2>

        {myBooks.length === 0 ? (
          <div
            style={{
              padding: "32px 0",
              textAlign: "center",
              color: "var(--muted)",
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>
            <p style={{ margin: 0 }}>You haven't added any books yet.</p>
            <Link
              to="/?openAddBook=true"
              style={{
                color: "var(--gold-light)",
                textDecoration: "none",
                fontSize: 14,
                display: "inline-block",
                marginTop: 12,
              }}
            >
              Add your first book →
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {myBooks.map((book, i) => (
              <Link
                key={book._id}
                to={`/books/${book._id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "14px 16px",
                  borderRadius: 10,
                  background: "var(--surface2)",
                  border: "1px solid var(--border)",
                  textDecoration: "none",
                  color: "var(--text)",
                  transition: "all 0.2s",
                  animation: `fadeUp 0.4s ${i * 0.05}s both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)";
                  e.currentTarget.style.background = "rgba(201,168,76,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "var(--surface2)";
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: book.image ? "transparent" : "var(--gold-dim)",
                    overflow: "hidden",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                  }}
                >
                  {book.image ? (
                    <img
                      src={book.image}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    "📖"
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 500,
                      fontSize: 15,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {book.title}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>
                    {book.author}
                  </div>
                </div>
                <span style={{ color: "var(--muted)", fontSize: 18 }}>→</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
