import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";
import userRoutes from "./routes/users.js";
import paymentRoutes from "./routes/payments.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "your-production-domain.com"
        : "https://your-skill-server.onrender.com",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ message: "Yourkilll Training API is running!" });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // Initialize default data
    initializeDefaultData();
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

// Initialize default courses and admin user
async function initializeDefaultData() {
  try {
    const { Course } = await import("./models/Course.js");
    const { User } = await import("./models/User.js");
    const bcrypt = await import("bcryptjs");

    // Check if courses exist
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      const defaultCourses = [
        {
          courseId: "digital-marketing",
          title: "Digital Marketing",
          description:
            "Master the fundamentals of digital marketing including SEO, social media marketing, content strategy, and analytics.",
          price: 75,
          duration: "3 Days",
          trainingDays: [
            {
              day: 1,
              title: "Introduction to Digital Marketing & SEO",
              content:
                "Learn the basics of digital marketing landscape, SEO fundamentals, keyword research, and on-page optimization techniques.",
              videoUrl: "https://example.com/video1",
            },
            {
              day: 2,
              title: "Social Media Marketing & Content Strategy",
              content:
                "Understand social media platforms, content creation strategies, engagement tactics, and building brand presence online.",
              videoUrl: "https://example.com/video2",
            },
            {
              day: 3,
              title: "Analytics & Campaign Optimization",
              content:
                "Master Google Analytics, conversion tracking, A/B testing, and campaign performance optimization techniques.",
              videoUrl: "https://example.com/video3",
            },
          ],
          assignmentRequired: true,
        },
        {
          courseId: "web-development",
          title: "Web Developer Training",
          description:
            "Work with real-world Git workflows, Build and deploy a full-stack E-Commerce (MERN) application,Collaborate effectively in a development team",
          price: 75,
          duration: "3 Days",
          trainingDays: [
            {
              day: 1,
              title: "Setup, Git & Frontend Foundation",
              content:
                "Master semantic HTML5, modern CSS3 features, Flexbox, Grid, and responsive design principles for mobile-first development.",
              videoUrl: "https://example.com/video4",
            },
            {
              day: 2,
              title: "Backend, Database & API Integration",
              content:
                "Learn JavaScript fundamentals, ES6+ features, DOM manipulation, event handling, and building interactive web applications.",
              videoUrl: "https://example.com/video5",
            },
            {
              day: 3,
              title: "E-Commerce Project + Deployment",
              content:
                "Introduction to React, components, state management, hooks, and building modern single-page applications.",
              videoUrl: "https://example.com/video6",
            },
          ],
          assignmentRequired: true,
        },
      ];

      await Course.insertMany(defaultCourses);
      console.log("✅ Default courses created");
    }

    // Check if admin user exists
    const adminExists = await User.findOne({
      email: "admin@thinkacademies.com",
    });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 12);
      const adminUser = new User({
        name: "Admin",
        email: "admin@thinkacademies.com",
        password: hashedPassword,
        role: "admin",
      });
      await adminUser.save();
      console.log("✅ Admin user created");
    }
  } catch (error) {
    console.error("❌ Error initializing default data:", error);
  }
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("❌ Server Error:", error);
  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal server error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend URL: https://your-skill-server.onrender.com`);
  console.log(`🔗 API URL: https://your-skill-server.onrender.com/api`);
});
