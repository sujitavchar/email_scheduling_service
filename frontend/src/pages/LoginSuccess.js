import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./LoginSuccess.css";

const LoginSuccess = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      const decoded = jwtDecode(token);
      localStorage.setItem("token", token);
      setUser({ name: decoded.name, email: decoded.email });

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2000);
    }
  }, [navigate, setUser]);

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="checkmark">✅</div>
        <h2>Login Successful</h2>
        <p>Redirecting you to your dashboard...</p>
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default LoginSuccess;
