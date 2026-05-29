import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import api from "../services/api";

const socket = io("http://localhost:5000");

function CommentSection({ bookId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const fetchComments = async () => {
    try {
      const response = await api.get(`/comments/book/${bookId}`);
      setComments(response.data);
    } catch (error) {
      setMessage("Could not load comments");
    }
  };

  useEffect(() => {
    fetchComments();

    socket.emit("joinBookRoom", bookId);

    socket.on("newComment", (comment) => {
      setComments((prevComments) => [comment, ...prevComments]);
    });

    return () => {
      socket.off("newComment");
    };
  }, [bookId]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/comments/book/${bookId}`, { text });
      setText("");
      setMessage("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not add comment");
    }
  };

  return (
    <div className="mt-8 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Comments</h2>

      <form onSubmit={handleAddComment} className="space-y-3 mb-6">
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="bg-slate-800 text-white px-4 py-2 rounded">
          Add Comment
        </button>
      </form>

      {message && <p className="text-red-500 mb-4">{message}</p>}

      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment._id} className="border p-3 rounded">
            <p>{comment.text}</p>
            <small className="text-gray-500">
              By {comment.user?.username || "Unknown user"}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;