import { createContext, useState, useEffect } from "react";
import { USERS } from "../data/users";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (username) => {
    const res = USERS.find((c) => c.username === username);
    if (res) {
      setUser(res);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };
  const hasRole = (role) => user?.role === role;

  useEffect(() => {
    const loadFromLocalStorage = () => {
      try {
        const read = JSON.parse(localStorage.getItem("user"));
        setUser(read);
      } catch (err) {
        alert(err.message);
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    loadFromLocalStorage();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const saveToLocalStorage = () => {
      try {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          localStorage.removeItem("user");
        }
      } catch (err) {
        alert(err.message);
      }
    };
    saveToLocalStorage();
  }, [user, isLoading]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <AuthContext.Provider value={{ user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}
