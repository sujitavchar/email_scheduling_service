import { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = async ({ children }) => {
    const [user, setUser] = useState(null);
    //const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/senderidbyemail?sender_email=${senderId}`);

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if (token) {
        const decoded = jwtDecode(token);
        setUser({ name: decoded.name, email: decoded.email });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
