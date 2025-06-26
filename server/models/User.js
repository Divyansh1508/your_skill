import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    enrolledCourses: [
      {
        type: String, // courseId
        ref: "Course",
      },
    ],
    trainingProgress: {
      type: Map,
      of: {
        day1: { type: Boolean, default: false },
        day2: { type: Boolean, default: false },
        day3: { type: Boolean, default: false },
      },
      default: {},
    },
    assignments: {
      type: Map,
      of: String, // filename or URL
      default: {},
    },
    paymentStatus: {
      type: Map,
      of: {
        paid: { type: Boolean, default: false },
        paymentId: String,
        orderId: String,
        amount: Number,
        paidAt: Date,
      },
      default: {},
    },
    shortlisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
// Note: email index is automatically created due to unique: true
userSchema.index({ role: 1 });
userSchema.index({ shortlisted: 1 });

export const User = mongoose.model("User", userSchema);
