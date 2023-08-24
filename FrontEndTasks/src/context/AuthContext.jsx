/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "../api/axios";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [errors, setErrors] = useState(null);

  const signin = async (data) => {
    try {
      const res = await axios.post("/signin", data);
      setUser(res.data);
      setIsAuthenticated(true);
      return res.data;
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const signup = async (data) => {
    try {
      const res = await axios.post("/signup", data);
      setUser(res.data);
      setIsAuthenticated(true);
      return res.data;
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };
  useEffect(() => {
    if (Cookie.get("token")) {
      axios
        .get("/profile", { withCredentials: true })
        .then((res) => {
          setUser(res.data);
          setIsAuthenticated(true);
        })
        .catch((err) => {
          console.log(err);
          setUser(null);
          setIsAuthenticated(false);
        });
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, errors, signup, signin }}
    >
      {children}
    </AuthContext.Provider>
  );
}
