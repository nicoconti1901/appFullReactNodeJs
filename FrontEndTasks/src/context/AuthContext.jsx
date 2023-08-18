/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
     }
    return context;
}
export function AuthContextProvider({ children }) {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState(null);
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  );
}
