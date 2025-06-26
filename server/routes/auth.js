import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { User } from "../models/User.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post(
  "/signup",
  [
    body("name")
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Name must be between 2 and 50 characters"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: errors.array()[0].msg,
        });
      }

      const { name, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists with this email",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create new user
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();

      // Generate token
      const token = generateToken(user._id);

      // Remove password from response
      const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        enrolledCourses: user.enrolledCourses,
        trainingProgress: user.trainingProgress,
        assignments: user.assignments,
        paymentStatus: user.paymentStatus,
        shortlisted: user.shortlisted,
      };

      res.status(201).json({
        success: true,
        message: "Account created successfully",
        user: userResponse,
        token,
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during signup",
      });
    }
  }
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please enter a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: errors.array()[0].msg,
        });
      }

      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // Generate token
      const token = generateToken(user._id);

      // Remove password from response
      const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        enrolledCourses: user.enrolledCourses,
        trainingProgress: user.trainingProgress,
        assignments: user.assignments,
        paymentStatus: user.paymentStatus,
        shortlisted: user.shortlisted,
      };

      res.json({
        success: true,
        message: "Login successful",
        user: userResponse,
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during login",
      });
    }
  }
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const userResponse = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      enrolledCourses: req.user.enrolledCourses,
      trainingProgress: req.user.trainingProgress,
      assignments: req.user.assignments,
      paymentStatus: req.user.paymentStatus,
      shortlisted: req.user.shortlisted,
    };

    res.json({
      success: true,
      user: userResponse,
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
