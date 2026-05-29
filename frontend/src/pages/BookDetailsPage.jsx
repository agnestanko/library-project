import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import CommentSection from "../components/CommentSection";

function BookDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        setBook(response.data);
      } catch (error) {
        setMessage("Could not load book details");
      }
    };

    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/books/${id}`);
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not delete book");
    }
  };

  if (message) {
    return <p className="p-6 text-red-500">{message}</p>;
  }

  if (!book) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded shadow">
        {book.image && (
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-96 object-cover rounded mb-6"
          />
        )}

        <h1 className="text-3xl font-bold">{book.title}</h1>
        <p className="text-gray-600 text-lg">{book.author}</p>
        <p className="mt-4">{book.description}</p>

        <div className="mt-4 space-x-3">
          <Link
            to={`/books/${id}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>

      <CommentSection bookId={id} />
    </div>
  );
}

export default BookDetailsPage;