import api from "../config/api.js";

export const authService = {
  // Login user
  async login(email, password) {
    try {
      const response = await api.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: "Login failed" };
    }
  },

  // Register user
  async signup(name, email, password) {
    try {
      const response = await api.post("/auth/signup", {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { success: false, message: "Signup failed" }
      );
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to get user",
        }
      );
    }
  },
};
