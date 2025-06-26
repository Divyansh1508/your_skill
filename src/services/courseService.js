import api from '../config/api.js';

export const courseService = {
  // Get all courses
  async getAllCourses() {
    try {
      const response = await api.get('/courses');
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to fetch courses' };
    }
  },

  // Get single course
  async getCourse(courseId) {
    try {
      const response = await api.get(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to fetch course' };
    }
  },

  // Get enrolled courses
  async getEnrolledCourses() {
    try {
      const response = await api.get('/courses/enrolled/user');
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to fetch enrolled courses' };
    }
  }
};