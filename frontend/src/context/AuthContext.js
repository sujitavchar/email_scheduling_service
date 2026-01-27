import { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        
        const decoded = jwtDecode(token);

      
        // const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/senderbyemail?sender_email=${decoded.email}`);

        // if (!res.ok) throw new Error("Failed to fetch sender");

        //const data = await res.json();

         console.log(decoded.name,decoded.email,decoded.id , "->Auth context" ) ; 
     
        setUser({
          name: decoded.name,
          email: decoded.email,
          sender_id: decoded.id
        });
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
