import { useEffect, useState } from "react";
import api from "../services/api";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileResponse = await api.get("/auth/profile");
        const booksResponse = await api.get("/books");

        setUser(profileResponse.data.user);
        setBooks(booksResponse.data);
      } catch (error) {
        setMessage("You must be logged in to view your profile.");
      }
    };

    fetchProfile();
  }, []);

  if (message) {
    return <p className="p-6 text-red-500">{message}</p>;
  }

  if (!user) {
    return <p className="p-6">Loading profile...</p>;
  }

  const myBooks = books.filter(
    (book) => book.createdBy?._id === user.id || book.createdBy === user.id
  );

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="space-y-3">
        <p>
          <strong>Username:</strong> {user.username}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Books added:</strong> {myBooks.length}
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">My Books</h2>

      {myBooks.length === 0 ? (
        <p className="text-gray-500">You have not added any books yet.</p>
      ) : (
        <ul className="list-disc ml-6">
          {myBooks.map((book) => (
            <li key={book._id}>
              {book.title} — {book.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProfilePage;