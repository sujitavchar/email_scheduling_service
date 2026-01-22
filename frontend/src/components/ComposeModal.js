import React, { useState } from "react";
import "./ComposeModal.css";

export default function ComposeModal({ onClose, onSuccess }) {
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [timestamp, setTimestamp] = useState("");

    const handleSend = async () => {
        try {
            const sendAtISO = timestamp
                ? new Date(
                    new Date(timestamp).getTime() -
                    new Date(timestamp).getTimezoneOffset() * 60000
                ).toISOString()
                : new Date().toISOString();

            const payload = {
                to,
                subject,
                body,
                sendAt: sendAtISO,
                sender_id: "A1b2C3d4"
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
            alert("Failed to send email");
        }
    };


    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h3>Compose Email</h3>
                <input required placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />
                <input required placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                <textarea required placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
                <input required type="datetime-local" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} />
                <div className="actions">
                    <button onClick={handleSend}>Send</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}