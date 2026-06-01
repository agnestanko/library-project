import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/", { replace: true });
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "calc(100vh - 64px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      background: "radial-gradient(ellipse at 60% 50%, rgba(201,168,76,0.04) 0%, transparent 60%)",
    }}>
      <div className="glass fade-up" style={{ width: "100%", maxWidth: 420, padding: "40px 36px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📚</div>
          <h1 style={{ margin: "0 0 6px", fontSize: 28 }}>Welcome back!</h1>
          <p style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Email
            </label>
            <input className="fancy-input" type="email" placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Password
            </label>
            <input className="fancy-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>

          {message && (
            <div style={{ padding: "10px 16px", borderRadius: 8, background: "rgba(224,85,85,0.1)", border: "1px solid rgba(224,85,85,0.3)", color: "var(--danger)", fontSize: 13 }}>
              {message}
            </div>
          )}

          <button type="submit" className="btn-gold" disabled={loading} style={{ width: "100%", marginTop: 8, fontSize: 15, padding: "12px" }}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="divider" />

        <p style={{ textAlign: "center", margin: 0, fontSize: 14, color: "var(--muted)" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "var(--gold-light)", textDecoration: "none", fontWeight: 500 }}>
            Create one now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
