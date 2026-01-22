import React from "react";
//import { useNavigate } from "react-router-dom";
import "./Login.css";


export default function Login() {
   // const navigate = useNavigate();


    const handleGoogleLogin = async () => {
        try {
            //TODO: implement oauth

            // redirect to backend Google OAuth
            window.location.href = `${process.env.BASE_URL}/dashboard`;
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