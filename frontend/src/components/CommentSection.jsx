import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import api from "../services/api";

const socket = io("http://localhost:5000");

function CommentSection({ bookId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchComments = async () => {
    try {
      const response = await api.get(`/comments/book/${bookId}`);
      setComments(response.data);
    } catch {
      setMessage("Could not load comments");
    }
  };

  useEffect(() => {
    fetchComments();
    socket.emit("joinBookRoom", bookId);
    socket.on("newComment", (comment) => {
      setComments((prev) => [comment, ...prev]);
    });
    return () => { socket.off("newComment"); };
  }, [bookId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      setIsSuccess(false);
      setMessage("You must be logged in to comment.");
      return;
    }
    if (!text.trim()) {
      setIsSuccess(false);
      setMessage("Comment cannot be empty.");
      return;
    }
    try {
      await api.post(`/comments/book/${bookId}`, { text });
      setText("");
      setIsSuccess(true);
      setMessage("Comment added!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setIsSuccess(false);
      setMessage(error.response?.data?.message || "Could not add comment.");
    }
  };

  return (
    <div style={{ marginTop: 32 }}>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 22, marginBottom: 20,
        color: "var(--text)",
      }}>
        Comments <span style={{ color: "var(--muted)", fontSize: 16 }}>({comments.length})</span>
      </h2>

      {/* Add comment form */}
      <div className="glass" style={{ padding: 24, marginBottom: 24 }}>
        <form onSubmit={handleAddComment}>
          <textarea
            className="fancy-input"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            style={{ resize: "vertical", marginBottom: 12 }}
          />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <button className="btn-gold" type="submit" style={{ fontSize: 14 }}>
              Add comment
            </button>
            {message && (
              <span style={{
                fontSize: 13,
                color: isSuccess ? "var(--success)" : "var(--danger)",
              }}>
                {isSuccess ? "✓ " : "✗ "}{message}
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Comments list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {comments.length === 0 ? (
          <div style={{
            padding: 40, textAlign: "center",
            color: "var(--muted)", fontSize: 14,
            border: "1px dashed var(--border)", borderRadius: 12,
          }}>
            Be the first to comment 💬
          </div>
        ) : (
          comments.map((comment, i) => (
            <div
              key={comment._id}
              className="glass"
              style={{
                padding: "16px 20px",
                animation: `fadeUp 0.4s ${i * 0.05}s both`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--gold), #b8923f)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 700, color: "#0d0d0f",
                  flexShrink: 0,
                }}>
                  {(comment.user?.username || "?")[0].toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "var(--gold-light)" }}>
                    {comment.user?.username || "Unknown user"}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      day: "numeric", month: "long", year: "numeric"
                    })}
                  </div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: "var(--text)" }}>
                {comment.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;
