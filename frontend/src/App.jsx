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

      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/books/:id" element={<BookDetailsPage />} />
        <Route path="/books/:id/edit" element={<EditBookPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <footer className="text-center py-4 text-gray-500">
        Online Library © 2026
      </footer>
    </BrowserRouter>
  );
}

export default App;
