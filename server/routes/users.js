import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { User } from '../models/User.js';
import { Course } from '../models/Course.js';
import { authenticateToken, requireAdmin, requireStudent } from '../middleware/auth.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/assignments'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `assignment-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|zip|rar/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, DOCX, ZIP, and RAR files are allowed'));
    }
  }
});

// @route   PUT /api/users/progress
// @desc    Update training progress
// @access  Private (Student)
router.put('/progress', authenticateToken, requireStudent, async (req, res) => {
  try {
    const { courseId, day, completed } = req.body;
    const userId = req.user._id;

    // Validate input
    if (!courseId || !day || typeof completed !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Course ID, day, and completion status are required'
      });
    }

    // Check if user is enrolled in the course
    if (!req.user.enrolledCourses.includes(courseId)) {
      return res.status(403).json({
        success: false,
        message: 'Not enrolled in this course'
      });
    }

    // Update progress
    const updateField = `trainingProgress.${courseId}.${day}`;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { [updateField]: completed } },
      { new: true }
    ).select('-password');

    // Format user response
    const userResponse = {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      enrolledCourses: updatedUser.enrolledCourses,
      trainingProgress: updatedUser.trainingProgress,
      assignments: updatedUser.assignments,
      paymentStatus: updatedUser.paymentStatus,
      shortlisted: updatedUser.shortlisted
    };

    res.json({
      success: true,
      message: 'Progress updated successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating progress'
    });
  }
});

// @route   POST /api/users/assignment
// @desc    Submit assignment
// @access  Private (Student)
router.post('/assignment', authenticateToken, requireStudent, upload.single('assignment'), async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id;

    // Validate input
    if (!courseId || !req.file) {
      return res.status(400).json({
        success: false,
        message: 'Course ID and assignment file are required'
      });
    }

    // Check if user is enrolled in the course
    if (!req.user.enrolledCourses.includes(courseId)) {
      return res.status(403).json({
        success: false,
        message: 'Not enrolled in this course'
      });
    }

    // Update assignment submission
    const updateField = `assignments.${courseId}`;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { [updateField]: req.file.filename } },
      { new: true }
    ).select('-password');

    // Format user response
    const userResponse = {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      enrolledCourses: updatedUser.enrolledCourses,
      trainingProgress: updatedUser.trainingProgress,
      assignments: updatedUser.assignments,
      paymentStatus: updatedUser.paymentStatus,
      shortlisted: updatedUser.shortlisted
    };

    res.json({
      success: true,
      message: 'Assignment submitted successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Submit assignment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting assignment'
    });
  }
});

// @route   GET /api/users/students
// @desc    Get all students (Admin only)
// @access  Private (Admin)
router.get('/students', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('-password')
      .sort({ createdAt: -1 });

    // Format students response
    const studentsResponse = students.map(student => ({
      id: student._id,
      name: student.name,
      email: student.email,
      role: student.role,
      enrolledCourses: student.enrolledCourses,
      trainingProgress: student.trainingProgress,
      assignments: student.assignments,
      paymentStatus: student.paymentStatus,
      shortlisted: student.shortlisted,
      createdAt: student.createdAt
    }));

    res.json({
      success: true,
      students: studentsResponse
    });

  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching students'
    });
  }
});

// @route   PUT /api/users/:userId/shortlist
// @desc    Update student shortlist status (Admin only)
// @access  Private (Admin)
router.put('/:userId/shortlist', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { shortlisted } = req.body;

    if (typeof shortlisted !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Shortlisted status must be a boolean'
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { shortlisted },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: `User ${shortlisted ? 'shortlisted' : 'removed from shortlist'} successfully`
    });

  } catch (error) {
    console.error('Update shortlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating shortlist status'
    });
  }
});

export default router;