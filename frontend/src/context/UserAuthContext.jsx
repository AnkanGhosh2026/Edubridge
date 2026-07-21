import { createContext, useContext, useState, useEffect, useCallback } from "react";

const UserAuthContext = createContext(null);

const API_BASE = import.meta.env.VITE_API_URL || "https://edubridge-63uu.onrender.com";

export function UserAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("eb_user_token"));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("eb_user_data");
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login"); // "login" | "signup"

  const openAuthModal = useCallback((mode = "login") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  // Fetch profile on initial mount if token exists
  useEffect(() => {
    if (token && !user) {
      fetch(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Session expired");
          return res.json();
        })
        .then((data) => {
          setUser(data);
          localStorage.setItem("eb_user_data", JSON.stringify(data));
        })
        .catch(() => {
          localStorage.removeItem("eb_user_token");
          localStorage.removeItem("eb_user_data");
          setToken(null);
          setUser(null);
        });
    }
  }, [token, user]);

  const login = useCallback(async (email, password) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || "Login failed. Check your credentials.");
    }

    localStorage.setItem("eb_user_token", data.access_token);
    localStorage.setItem("eb_user_data", JSON.stringify(data.user));
    setToken(data.access_token);
    setUser(data.user);
    setIsAuthModalOpen(false);
    return data.user;
  }, []);

  const signup = useCallback(async (fullName, email, password) => {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name: fullName, email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || "Registration failed. Try again.");
    }

    localStorage.setItem("eb_user_token", data.access_token);
    localStorage.setItem("eb_user_data", JSON.stringify(data.user));
    setToken(data.access_token);
    setUser(data.user);
    setIsAuthModalOpen(false);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("eb_user_token");
    localStorage.removeItem("eb_user_data");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <UserAuthContext.Provider
      value={{
        token,
        user,
        login,
        signup,
        logout,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        setAuthModalMode,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const ctx = useContext(UserAuthContext);
  if (!ctx) throw new Error("useUserAuth must be used within UserAuthProvider");
  return ctx;
}
