import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-slate-800 text-white px-4 py-2 rounded w-full">
          Register
        </button>
      </form>

      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
}

export default RegisterPage;