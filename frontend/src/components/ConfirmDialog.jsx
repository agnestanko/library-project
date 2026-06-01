import { useEffect } from "react";

function ConfirmDialog({ isOpen, bookTitle, onConfirm, onCancel }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === "Escape") onCancel(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onCancel}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
        animation: "fadeIn 0.15s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>

      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          padding: "36px 40px",
          maxWidth: 420,
          width: "100%",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(224,85,85,0.15)",
          animation: "slideUp 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
          position: "relative",
        }}
      >
        {/* Icon */}
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "rgba(224,85,85,0.12)",
          border: "1px solid rgba(224,85,85,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, margin: "0 auto 24px",
        }}>
          🗑
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 22, fontWeight: 600,
          margin: "0 0 10px",
          textAlign: "center",
          color: "var(--text)",
        }}>
          Delete Book
        </h2>

        {/* Body */}
        <p style={{
          margin: "0 0 8px",
          textAlign: "center",
          color: "var(--muted)",
          fontSize: 14,
          lineHeight: 1.6,
        }}>
          Are you sure you want to delete
        </p>
        <p style={{
          margin: "0 0 28px",
          textAlign: "center",
          fontFamily: "'Playfair Display', serif",
          fontSize: 17,
          color: "var(--text)",
          fontStyle: "italic",
        }}>
          "{bookTitle}"?
        </p>

        {/* Warning */}
        <div style={{
          padding: "10px 16px",
          borderRadius: 10,
          background: "rgba(224,85,85,0.08)",
          border: "1px solid rgba(224,85,85,0.2)",
          marginBottom: 28,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ fontSize: 16 }}>⚠️</span>
          <span style={{ fontSize: 13, color: "rgba(224,85,85,0.9)" }}>
            This action cannot be undone.
          </span>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={onCancel}
            className="btn-ghost"
            style={{ flex: 1, fontSize: 14, padding: "11px" }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1, fontSize: 14, padding: "11px",
              background: "linear-gradient(135deg, #e05555, #c03030)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              transition: "opacity 0.2s, transform 0.15s, box-shadow 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = "0.9";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(224,85,85,0.4)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Yes, delete it
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
