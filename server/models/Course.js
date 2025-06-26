import mongoose from "mongoose";

const trainingDaySchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
    min: 1,
    max: 3,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    default: "",
  },
});

const courseSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
    },
    price: {
      type: Number,
      required: [true, "Course price is required"],
      min: [0, "Price cannot be negative"],
    },
    duration: {
      type: String,
      required: true,
      default: "3 Days",
    },
    trainingDays: [trainingDaySchema],
    assignmentRequired: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
// Note: courseId index is automatically created due to unique: true
courseSchema.index({ isActive: 1 });

export const Course = mongoose.model("Course", courseSchema);
