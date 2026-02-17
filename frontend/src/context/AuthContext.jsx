import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const getStoredUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) setUser(storedUser);
  }, []);

  //  CORRECT LOGIN
  const login = async (data) => {
    try {
      setLoading(true);

      const res = await axios.post("/auth/login", data);

      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);

      toast.success("Login successful ");
      return true;

    } catch (err) {

      const message = err.response?.data?.message;

      if (message === "User not found") {
        toast.error("First register then login");
      } else if (message === "Invalid password") {
        toast.error("Invalid password");
      } else {
        toast.error("Login failed");
      }

      return false;

    } finally {
      setLoading(false);
    }
  };

  //  REGISTER
  const register = async (data) => {
    try {
      setLoading(true);

      const res = await axios.post("/auth/register", data);

      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);

      toast.success("Registered successfully ");
      return true;

    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully ");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
