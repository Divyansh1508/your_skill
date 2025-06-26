import express from "express";
import Razorpay from "razorpay";
import { User } from "../models/User.js";
import { Course } from "../models/Course.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Initialize Razorpay
let razorpay = null;
try {
  if (
    process.env.RAZORPAY_KEY_ID &&
    process.env.RAZORPAY_KEY_SECRET &&
    process.env.RAZORPAY_KEY_ID !== "your_razorpay_key_id_here"
  ) {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    console.log("✅ Razorpay initialized successfully");
  } else {
    console.log(
      "⚠️  Razorpay credentials not configured - payment routes will be disabled"
    );
  }
} catch (error) {
  console.error("❌ Failed to initialize Razorpay:", error.message);
}

// @route   POST /api/payments/create-order
// @desc    Create Razorpay order
// @access  Private
router.post("/create-order", authenticateToken, async (req, res) => {
  try {
    // Check if Razorpay is configured
    if (!razorpay) {
      return res.status(503).json({
        success: false,
        message:
          "Payment service not configured. Please contact administrator.",
      });
    }

    const { courseId } = req.body;
    const userId = req.user._id;

    // Check if course exists
    const course = await Course.findOne({ courseId });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if user already enrolled
    if (req.user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Already enrolled in this course",
      });
    }

    // Create Razorpay order
    const options = {
      amount: course.price * 100, // amount in paise
      currency: "INR",
      receipt: `course_${courseId}_user_${userId}_${Date.now()}`,
      notes: {
        courseId,
        userId: userId.toString(),
        courseName: course.title,
      },
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        courseId,
        courseName: course.title,
      },
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create payment order",
    });
  }
});

// @route   POST /api/payments/verify
// @desc    Verify payment and enroll user
// @access  Private
router.post("/verify", authenticateToken, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = req.body;

    // In production, verify the signature using Razorpay's webhook
    // For now, we'll simulate successful payment verification

    const userId = req.user._id;

    // Get course details
    const course = await Course.findOne({ courseId });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Update user with enrollment and payment info
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { enrolledCourses: courseId },
        $set: {
          [`paymentStatus.${courseId}`]: {
            paid: true,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            amount: course.price,
            paidAt: new Date(),
          },
          [`trainingProgress.${courseId}`]: {
            day1: false,
            day2: false,
            day3: false,
          },
        },
      },
      { new: true }
    ).select("-password");

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
      shortlisted: updatedUser.shortlisted,
    };

    res.json({
      success: true,
      message: "Payment verified and course enrolled successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
});

export default router;
