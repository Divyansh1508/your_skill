import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        try {
          // Verify token with server
          const response = await authService.getCurrentUser();
          if (response.success) {
            setUser(response.user);
          } else {
            // Invalid token, clear storage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        } catch (error) {
          console.error("Auth initialization error:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);

      if (response.success) {
        setUser(response.user);
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      return response;
    } catch (error) {
      console.error("Login error:", error);
      // Return the error in the expected format
      return {
        success: false,
        message: error.message || "Login failed. Please try again.",
      };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await authService.signup(name, email, password);

      // Don't automatically log in after signup
      // Just return the response for success/error handling
      return response;
    } catch (error) {
      console.error("Signup error:", error);
      // Return the error in the expected format
      return {
        success: false,
        message: error.message || "Signup failed. Please try again.",
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const updateUser = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
