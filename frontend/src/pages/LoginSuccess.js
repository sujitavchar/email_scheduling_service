import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

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
        navigate("/dashboard", {replace: true}); 
      }, 2000);
    }
  }, [navigate, setUser]);

  return <h2>Login Successful ✅ Redirecting...</h2>;
};

export default LoginSuccess;
