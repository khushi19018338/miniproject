import { createContext, useContext, useState, useEffect } from "react";
import { getItem, setItem, removeItem } from "@/utils/storage";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getItem("user");
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    // TODO: integrate login API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const userData = { name: "User", email };
    setItem("user", userData);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const signup = async (name, email, password) => {
    // TODO: integrate signup API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const userData = { name, email };
    setItem("user", userData);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
