/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export function AuthContextProvider({ children }) {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState(null);

  const signin = async (data) => {
    const res = await axios.post("http://localhost:3000/api/signin", data, {
      withCredentials: true,
    });
    console.log(res.data);
    setUser(res.data);
  };

  const signup = async (data) => {
    const res = await axios.post("http://localhost:3000/api/signup", data, {
      withCredentials: true,
    });

    console.log(res.data);
    setUser(res.data);
  };
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, errors, signup, signin }}
    >
      {children}
    </AuthContext.Provider>
  );
}
