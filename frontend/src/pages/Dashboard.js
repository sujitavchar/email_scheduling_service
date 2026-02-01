import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ComposeModal from "../components/ComposeModal";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

export default function Dashboard() {
  const [emails, setEmails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);
  const [showFailed, setShowFailed] = useState(true);
  const [showScheduled, setShowScheduled] = useState(true);


  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading || !user) return;

    const fetchEmails = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/all-emails?sender_id=${user.sender_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setEmails(data.data || []);
      } catch (err) {
        alert("Failed to fetch emails");
      }
    };

    fetchEmails();
  }, [loading, user]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  const filteredEmails = emails.filter((email) => {
    if (email.status === "completed" && showCompleted) return true;
    if (email.status === "failed" && showFailed) return true;
    if (email.status === "scheduled" && showScheduled) return true;
  });

  return (
    <div className="dashboard">
      {/* LEFT PANEL */}
      <aside className="sidebar">
        <h2 className="logo">Post Master</h2>

        <div className="profile">
          <div className="avatar">{user.name[0]}</div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <span className="sender-id">ID: {user.sender_id}</span>
        </div>

        <button className="compose-btn" onClick={() => setShowModal(true)}>
          ✉ Compose
        </button>
      </aside>

      {/* RIGHT PANEL */}
      <main className="content">

        <div className="filters">

          <label>
            <input
              type="checkbox"
              checked={showScheduled}
              onChange={() => setShowScheduled(!showScheduled)}
            />
            Scheduled
          </label>
          <label>
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={() => setShowCompleted(!showCompleted)}
            />
            Completed
          </label>

          <label>
            <input
              type="checkbox"
              checked={showFailed}
              onChange={() => setShowFailed(!showFailed)}
            />
            Failed
          </label>
        </div>



        <h2 className="section-title">Scheduled Emails</h2>

        <div className="email-list">
          {filteredEmails.map((email) => (
            <div key={email.id} className="email-card">
              <div className="email-header">
                <span className="to">To: {email.to_email}</span>
                <span className={`status-tag ${email.status}`}>
                  {email.status}
                </span>
              </div>

              <div className="subject">
                {email.subject.slice(0, 40)}...
              </div>

              <div className="body">
                {email.body.slice(0, 80)}...
              </div>
                <div className="time">
                  Scheduled at:{" "}
                  {new Date(email.send_at).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>


            </div>
          ))}
        </div>
      </main>

      {showModal && (
        <ComposeModal
          onClose={() => setShowModal(false)}
          onSuccess={() => { }}
        />
      )}
    </div>
  );
}
