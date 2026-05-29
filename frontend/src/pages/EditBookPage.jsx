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
  const [category, setCategory] = useState("General");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setDescription(response.data.description);
        setCategory(response.data.category || "General");
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
        category,
        image,
      });

      navigate(-1);
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not update book");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="w-full border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Classic">Classic</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Programming">Programming</option>
          <option value="History">History</option>
        </select>
        <input
          className="w-full border p-2 rounded"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button className="bg-slate-800 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>

      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
}

export default EditBookPage;
