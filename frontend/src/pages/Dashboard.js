import React, { useEffect, useState } from "react";
import ComposeModal from "../components/ComposeModal";
import "./Dashboard.css";

export default function Dashboard() {
    const [emails, setEmails] = useState([]);
    const [showModal, setShowModal] = useState(false);

    //TODO: take sender id from oauth
    // replace after auth

    const senderId = "A1b2C3d4";

    const fetchEmails = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/all-emails?sender_id=${senderId}`);
            console.log("called:" ,`${process.env.REACT_APP_API_BASE_URL}/all-emails?sender_id=${senderId}` );
            console.log("response = ", res);
    
            const data = await res.json();
            console.log(data.data);
            setEmails(data.data);
        } catch (err) {
            alert("Failed to fetch emails");
        }
    };

    useEffect(() => {
        fetchEmails();
    }, []);

    return (
        <div className="dashboard-container">
            <div className="header">
                <h2>Dashboard</h2>
                <button onClick={() => setShowModal(true)}>Compose</button>
            </div>

            <div className="email-list">
                {emails.map((email) => (
                    <div key={email.id} className="email-item">
                        <div className="time">{email.send_at}...</div>
                        <div className="row">
                            <span className="to">To: {email.to_email}</span>
                            <span className={`status ${email.status}`}>{email.status}</span>
                        </div>
                        <div className="subject">Subject : {email.subject.slice(0, 30)}...</div>
                        <div className="body">{email.body.slice(0, 50)}...</div>

                    </div>
                ))}
            </div>

            {showModal && (
                <ComposeModal
                    onClose={() => setShowModal(false)}
                    onSuccess={fetchEmails}
                />
            )}
        </div>
    );
}