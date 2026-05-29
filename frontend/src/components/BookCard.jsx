import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <div className="bg-white rounded shadow p-4">
      {book.image && (
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-48 object-cover rounded mb-3"
        />
      )}

      <h2 className="text-xl font-bold">{book.title}</h2>
      <p className="text-gray-600">{book.author}</p>
      <p className="mt-2">{book.description}</p>

      <Link
        to={`/books/${book._id}`}
        className="inline-block mt-4 bg-slate-800 text-white px-4 py-2 rounded"
      >
        Details
      </Link>
    </div>
  );
}

export default BookCard;