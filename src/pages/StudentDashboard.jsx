import React, { useState, useEffect } from "react";
import {
  Play,
  CheckCircle,
  Upload,
  FileText,
  Award,
  TrendingUp,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { courseService } from "../services/courseService.js";
import { userService } from "../services/userService.js";

function StudentDashboard() {
  const { user, updateUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingAssignment, setUploadingAssignment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await courseService.getEnrolledCourses();
        if (response.success) {
          setCourses(response.courses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleProgressUpdate = async (courseId, day, completed) => {
    if (!user) return;

    try {
      const response = await userService.updateProgress(
        courseId,
        day,
        completed
      );
      if (response.success) {
        updateUser(response.user);
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const handleAssignmentUpload = async (courseId, file) => {
    if (!user) return;

    setUploadingAssignment(courseId);

    try {
      const response = await userService.submitAssignment(courseId, file);
      if (response.success) {
        updateUser(response.user);
      }
    } catch (error) {
      console.error("Error uploading assignment:", error);
    } finally {
      setUploadingAssignment(null);
    }
  };

  const getCompletionPercentage = (courseId) => {
    if (!user?.trainingProgress || !user.trainingProgress[courseId]) return 0;

    const progress = user.trainingProgress[courseId];
    const completedDays = Object.values(progress).filter(Boolean).length;
    return Math.round((completedDays / 3) * 100);
  };

  const isCourseCompleted = (courseId) => {
    if (!user?.trainingProgress || !user.trainingProgress[courseId])
      return false;

    const progress = user.trainingProgress[courseId];
    return progress.day1 && progress.day2 && progress.day3;
  };

  const hasSubmittedAssignment = (courseId) => {
    return user?.assignments && user.assignments[courseId] ? true : false;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-primary-100 text-lg">
                Continue your learning journey and track your progress
              </p>
            </div>

            {user.shortlisted && (
              <div className="mt-4 md:mt-0 bg-success-500 bg-opacity-20 border border-success-300 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-6 w-6 text-success-300" />
                  <span className="font-semibold text-success-100">
                    Shortlisted for Hiring!
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hiring Banner */}
      <section className="bg-gradient-to-r from-success-500 to-primary-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg font-semibold">
              🎯 Complete all training days and submit assignments to get
              shortlisted for hiring in our company!
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {courses.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <TrendingUp className="h-16 w-16 text-secondary-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                No Enrolled Training
              </h3>
              <p className="text-secondary-600 mb-6">
                You haven't enrolled in any courses yet. Browse our available
                Training and start your learning journey!
              </p>
              <a
                href="/courses"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Browse Training
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {courses.map((course) => {
              const progress =
                user.trainingProgress && user.trainingProgress[course.courseId]
                  ? user.trainingProgress[course.courseId]
                  : { day1: false, day2: false, day3: false };
              const completionPercentage = getCompletionPercentage(
                course.courseId
              );
              const courseCompleted = isCourseCompleted(course.courseId);
              const assignmentSubmitted = hasSubmittedAssignment(
                course.courseId
              );

              return (
                <div
                  key={course._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  {/* Course Header */}
                  <div className="bg-gradient-to-r from-primary-600 to-secondary-700 text-white p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">
                          {course.title}
                        </h2>
                        <p className="text-primary-100">{course.description}</p>
                      </div>
                      <div className="mt-4 md:mt-0 text-right">
                        <div className="text-3xl font-bold">
                          {completionPercentage}%
                        </div>
                        <div className="text-primary-100">Complete</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="bg-white bg-opacity-20 rounded-full h-3">
                        <div
                          className="bg-white rounded-full h-3 transition-all duration-300"
                          style={{ width: `${completionPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    {/* Training Days */}
                    <h3 className="text-xl font-bold text-secondary-900 mb-6">
                      Training Progress
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {course.trainingDays.map((day) => {
                        const dayKey = `day${day.day}`;
                        const isCompleted = progress[dayKey];

                        return (
                          <div
                            key={day.day}
                            className="border border-secondary-200 rounded-lg p-4"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-secondary-900">
                                Day {day.day}
                              </h4>
                              <button
                                onClick={() =>
                                  handleProgressUpdate(
                                    course.courseId,
                                    dayKey,
                                    !isCompleted
                                  )
                                }
                                className={`p-2 rounded-full transition-colors ${
                                  isCompleted
                                    ? "bg-green-100 text-green-600"
                                    : "bg-gray-100 text-gray-400 hover:bg-blue-100 hover:text-blue-600"
                                }`}
                              >
                                <CheckCircle className="h-5 w-5" />
                              </button>
                            </div>
                            <h5 className="font-medium text-gray-800 mb-2">
                              {day.title}
                            </h5>
                            <p className="text-gray-600 text-sm mb-3">
                              {day.content}
                            </p>

                            <div className="flex items-center space-x-2 text-sm">
                              <Play className="h-4 w-4 text-blue-600" />
                              <span className="text-gray-600">
                                Video Content
                              </span>
                            </div>

                            {isCompleted && (
                              <div className="mt-3 flex items-center space-x-2 text-green-600 text-sm">
                                <CheckCircle className="h-4 w-4" />
                                <span>Completed</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Assignment Section */}
                    {course.assignmentRequired && (
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          Assignment Submission
                        </h3>

                        {assignmentSubmitted ? (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                              <CheckCircle className="h-6 w-6 text-green-600" />
                              <div>
                                <h4 className="font-semibold text-green-800">
                                  Assignment Submitted
                                </h4>
                                <p className="text-green-700">
                                  File: {user.assignments[course.courseId]}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                              <AlertCircle className="h-6 w-6 text-yellow-600 mt-0.5" />
                              <div className="flex-1">
                                <h4 className="font-semibold text-yellow-800 mb-2">
                                  Assignment Pending
                                </h4>
                                <p className="text-yellow-700 mb-4">
                                  Complete all training days and submit your
                                  assignment to get shortlisted for hiring.
                                </p>

                                <div className="flex items-center space-x-4">
                                  <input
                                    type="file"
                                    id={`assignment-${course.courseId}`}
                                    className="hidden"
                                    accept=".pdf,.doc,.docx,.zip"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        handleAssignmentUpload(
                                          course.courseId,
                                          file
                                        );
                                      }
                                    }}
                                  />
                                  <label
                                    htmlFor={`assignment-${course.courseId}`}
                                    className={`bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 cursor-pointer ${
                                      uploadingAssignment === course.courseId
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }`}
                                  >
                                    {uploadingAssignment === course.courseId ? (
                                      <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        <span>Uploading...</span>
                                      </>
                                    ) : (
                                      <>
                                        <Upload className="h-4 w-4" />
                                        <span>Upload Assignment</span>
                                      </>
                                    )}
                                  </label>
                                  <span className="text-gray-600 text-sm">
                                    Supported: PDF, DOC, DOCX, ZIP
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Course Status */}
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-full ${
                              courseCompleted && assignmentSubmitted
                                ? "bg-green-100"
                                : "bg-yellow-100"
                            }`}
                          >
                            <Award
                              className={`h-6 w-6 ${
                                courseCompleted && assignmentSubmitted
                                  ? "text-green-600"
                                  : "text-yellow-600"
                              }`}
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              Course Status
                            </h4>
                            <p
                              className={`text-sm ${
                                courseCompleted && assignmentSubmitted
                                  ? "text-green-600"
                                  : "text-yellow-600"
                              }`}
                            >
                              {courseCompleted && assignmentSubmitted
                                ? "Completed - Eligible for hiring consideration"
                                : "In Progress - Complete all requirements"}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {completionPercentage}%
                          </div>
                          <div className="text-gray-500 text-sm">Progress</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
