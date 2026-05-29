import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setDescription(response.data.description);
        setImage(response.data.image || "");
      } catch (error) {
        setMessage("Could not load book");
      }
    };

    fetchBook();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/books/${id}`, {
        title,
        author,
        description,
        image,
      });

      navigate(`/books/${id}`);
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not update book");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input className="w-full border p-2 rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="w-full border p-2 rounded" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <textarea className="w-full border p-2 rounded" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input className="w-full border p-2 rounded" value={image} onChange={(e) => setImage(e.target.value)} />

        <button className="bg-slate-800 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>

      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
}

export default EditBookPage;