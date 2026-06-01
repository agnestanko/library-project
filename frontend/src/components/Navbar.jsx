import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      background: "rgba(13,13,15,0.85)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--border)",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 24px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>📚</span>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 20,
            fontWeight: 700,
            background: "linear-gradient(90deg, #c9a84c, #e8c97a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Library
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <NavLink to="/" active={isActive("/")}>Books</NavLink>

          {!token ? (
            <>
              <NavLink to="/login" active={isActive("/login")}>Login</NavLink>
              <Link to="/register" className="btn-gold" style={{ marginLeft: 8, fontSize: 14 }}>
                Register
              </Link>
            </>
          ) : (
            <>
              <NavLink to="/profile" active={isActive("/profile")}>Profile</NavLink>
              <button
                onClick={logout}
                className="btn-ghost"
                style={{ marginLeft: 8, fontSize: 14 }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children, active }) {
  return (
    <Link
      to={to}
      style={{
        padding: "8px 16px",
        borderRadius: 8,
        textDecoration: "none",
        fontSize: 14,
        fontWeight: active ? 500 : 400,
        color: active ? "var(--gold-light)" : "var(--muted)",
        background: active ? "var(--gold-dim)" : "transparent",
        transition: "all 0.2s",
      }}
    >
      {children}
    </Link>
  );
}

export default Navbar;
