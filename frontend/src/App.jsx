import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BooksPage from "./pages/BooksPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import EditBookPage from "./pages/EditBookPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main style={{ minHeight: "calc(100vh - 64px - 60px)" }}>
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/books/:id" element={<BookDetailsPage />} />
          <Route path="/books/:id/edit" element={<EditBookPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      <footer style={{
        borderTop: "1px solid var(--border)",
        padding: "20px 24px",
        textAlign: "center",
        color: "var(--muted)",
        fontSize: 13,
        background: "var(--surface)",
      }}>
        📚 <span style={{ color: "var(--gold)", fontFamily: "'Playfair Display', serif" }}>Biblioteca Online</span>
        {" "}— Proiect TD © 2026
      </footer>
    </BrowserRouter>
  );
}

export default App;
