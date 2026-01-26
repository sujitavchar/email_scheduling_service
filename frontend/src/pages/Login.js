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
        <div className="login-container">
            <button className="google-btn" onClick={handleGoogleLogin}>
                Sign in with Google
            </button>
        </div>
    );
} 