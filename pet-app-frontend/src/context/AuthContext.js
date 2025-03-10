import React, { createContext, useState, useEffect } from "react";
import withNavigation from "../components/withNavigation";

const AuthContext = createContext();

const AuthProviderComponent = ({ children, navigate }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Check for user and token in localStorage on initial load
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
            try {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
                // Handle the error appropriately, maybe clear localStorage
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }
    }, []);

    const login = (userData, token) => {
        console.log("Login called with userData:", userData);  // <-- Add this log
        setUser(userData);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        // Redirect based on userType
        switch (userData.userType) {
            case "Admin":
                navigate("/admin");
                break;
            case "Vendor":
                navigate("/vendor");
                break;
            case "Driver":
                navigate("/driver");
                break;
            case "Client":
            default:
                navigate("/client"); // Or a general client dashboard
                break;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const contextValue = {
        user,
        token,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

const AuthProvider = withNavigation(AuthProviderComponent); // Wrap the component

export { AuthContext, AuthProvider };