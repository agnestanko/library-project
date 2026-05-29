import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-800 text-white px-6 py-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">
        📚 Online Library
      </Link>

      <div className="space-x-4">
        <Link to="/">Books</Link>

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
