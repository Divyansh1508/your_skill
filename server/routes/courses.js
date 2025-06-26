import express from 'express';
import { Course } from '../models/Course.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/courses
// @desc    Get all courses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true }).sort({ createdAt: 1 });
    
    res.json({
      success: true,
      courses
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching Trining'
    });
  }
});

// @route   GET /api/courses/:courseId
// @desc    Get single course by courseId
// @access  Public
router.get('/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const course = await Course.findOne({ courseId, isActive: true });
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      course
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching Trining'
    });
  }
});

// @route   GET /api/courses/enrolled/user
// @desc    Get user's enrolled courses
// @access  Private
router.get('/enrolled/user', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    
    // Get courses that user is enrolled in
    const enrolledCourses = await Course.find({
      courseId: { $in: user.enrolledCourses },
      isActive: true
    });

    res.json({
      success: true,
      courses: enrolledCourses
    });
  } catch (error) {
    console.error('Get enrolled courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching enrolled Trining'
    });
  }
});

export default router;