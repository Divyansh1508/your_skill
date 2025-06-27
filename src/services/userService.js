import api from "../config/api.js";

export const userService = {
  // Update training progress
  async updateProgress(courseId, day, completed) {
    try {
      const response = await api.put("/users/progress", {
        courseId,
        day,
        completed,
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to update progress",
        }
      );
    }
  },

  // Submit assignment
  async submitAssignment(courseId, file) {
    try {
      const formData = new FormData();
      formData.append("courseId", courseId);
      formData.append("assignment", file);

      const response = await api.post("/users/assignment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to submit assignment",
        }
      );
    }
  },

  // Get all students (Admin only)
  async getAllStudents() {
    try {
      const response = await api.get("/users/students");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to fetch students",
        }
      );
    }
  },

  // Update shortlist status (Admin only)
  async updateShortlistStatus(userId, shortlisted) {
    try {
      const response = await api.put(`/users/${userId}/shortlist`, {
        shortlisted,
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to update shortlist status",
        }
      );
    }
  },
};
