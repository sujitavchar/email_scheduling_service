import React from "react";
//import { useNavigate } from "react-router-dom";
import "./Login.css";


export default function Login() {
   // const navigate = useNavigate();


    const handleGoogleLogin = async () => {
        try {
            //TODO: implement oauth - DOne

            // redirect to backend Google OAuth - Done
            window.location.href = process.env.REACT_APP_API_BASE_URL+ "/auth/google";
        } catch (err) {
            alert("Login failed");
        }
    };


    return (
    <div className="page">
      <div className="card">
        <h1 className="title">Post Master</h1>
        <p className="subtitle">Bulk email scheduling service</p>

        <ul className="features">
          <li>📧 Schedule emails with a single-click sign in / sign up</li>
          <li>📂 Bulk email scheduling using CSV upload</li>
          <li>🔐 Secured with OAuth 2.0</li>
          <li>⚡ Don’t worry about schedules even if the server crashes</li>
        </ul>

        <button className="google-btn" onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
      </div>
    </div>
    );
} 