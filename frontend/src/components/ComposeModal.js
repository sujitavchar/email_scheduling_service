import React, { useState } from "react";
import "./ComposeModal.css";
import { useAuth } from "../context/AuthContext";

export default function ComposeModal({ onClose, onSuccess }) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const { user, loading } = useAuth();

  const handleSend = async () => {
    try {
      const payload = {
        to,
        subject,
        body,
        sendAt: new Date(timestamp).toISOString(),
        sender_id: user.sender_id,
      };

      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/schedule-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      alert(data.message || "Email scheduled");
      onClose();
      onSuccess();
    } catch (err) {
      console.log("Failed to schedule ", err);
      alert("Failed to schedule email");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="compose-modal">
        <div className="modal-header">
          <h3>Compose Email</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <input
            required
            placeholder="Recipient email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />

          <input
            required
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <textarea
            required
            placeholder="Write your email here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <label className="time-label">Schedule time</label>
          <input
            required
            type="datetime-local"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
          />
        </div>

        <div className="actions">
          <button className="send-btn" onClick={handleSend}>
            Schedule Email
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
