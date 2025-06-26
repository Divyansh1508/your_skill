import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock,
  Award,
  CheckCircle,
  Play,
  FileText,
  CreditCard,
  Loader,
  AlertCircle,
  Eye,
  X,
} from "lucide-react";
import { courseService } from "../services/courseService.js";
import { paymentService } from "../services/paymentService.js";
import { useAuth } from "../contexts/AuthContext.jsx";

function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [videoRef, setVideoRef] = useState(null);
  const [previewEnded, setPreviewEnded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [remainingTime, setRemainingTime] = useState(30);

  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;

      try {
        const response = await courseService.getCourse(courseId);
        if (response.success) {
          setCourse(response.course);
        } else {
          setError("Course not found");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        setError("Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handlePurchase = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!course || !courseId) return;

    setPurchasing(true);
    setError("");

    try {
      // Check if course has direct payment link
      if (paymentService.hasDirectPaymentLink(courseId)) {
        // Use direct payment link
        const result = paymentService.redirectToPayment(courseId);

        if (result.success) {
          // Show success message and redirect info
          setError("");
          // You might want to show a success message here
          console.log("Redirected to Razorpay payment page");

          // Optional: Show a message to user about the redirect
          alert(
            "You will be redirected to the payment page. After successful payment, please return to complete your enrollment."
          );
        } else {
          setError(result.message);
        }
      } else {
        // Fallback to original payment flow for courses without direct links
        const orderResponse = await paymentService.createOrder(courseId);

        if (!orderResponse.success) {
          throw new Error(orderResponse.message);
        }

        // In a real implementation, you would integrate with Razorpay SDK here
        // For demo purposes, we'll simulate successful payment
        const paymentData = {
          razorpay_order_id: orderResponse.order.id,
          razorpay_payment_id: "pay_demo_" + Date.now(),
          razorpay_signature: "signature_demo",
          courseId: courseId,
        };

        // Verify payment
        const verifyResponse = await paymentService.verifyPayment(paymentData);

        if (verifyResponse.success) {
          // Update user state
          updateUser(verifyResponse.user);

          // Redirect to dashboard
          navigate("/dashboard");
        } else {
          setError(verifyResponse.message);
        }
      }
    } catch (error) {
      console.error("Purchase error:", error);
      setError(error.message || "Payment failed. Please try again.");
    } finally {
      setPurchasing(false);
    }
  };

  const isEnrolled =
    user &&
    user.enrolledCourses &&
    user.enrolledCourses.includes(courseId || "");

  // Get preview video URL based on course (using demo videos)
  const getPreviewVideoUrl = (courseId) => {
    const previewVideos = {
      "digital-marketing":
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "web-development":
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    };
    return (
      previewVideos[courseId] ||
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    );
  };

  // Handle video time update to stop at 30 seconds and update countdown
  const handleVideoTimeUpdate = (e) => {
    const currentTime = e.target.currentTime;
    const timeLeft = Math.max(0, Math.ceil(30 - currentTime));
    setRemainingTime(timeLeft);

    if (currentTime >= 30) {
      e.target.pause();
      setPreviewEnded(true);
      setRemainingTime(0);
    }
  };

  // Reset preview when modal opens
  const openPreview = () => {
    setShowPreview(true);
    setPreviewEnded(false);
    setVideoError(false);
    setRemainingTime(30);
  };

  // Close preview and reset
  const closePreview = () => {
    setShowPreview(false);
    setPreviewEnded(false);
    setVideoError(false);
    setRemainingTime(30);
    if (videoRef) {
      videoRef.pause();
      videoRef.currentTime = 0;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">
            Training Not Found
          </h2>
          <p className="text-secondary-600">
            The Training you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Course Header */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {course.title}
              </h1>
              <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary-200" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary-200" />
                  <span>Certificate Included</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary-200" />
                  <span>Practical Assignments</span>
                </div>
              </div>

              {/* Course Preview Button */}
              {!isEnrolled && (
                <div className="mb-6">
                  <button
                    onClick={openPreview}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 border border-white border-opacity-30 hover:border-opacity-50 hover:scale-105 transform shadow-lg"
                  >
                    <Eye className="h-5 w-5" />
                    <span>🎬 See Course Preview (30 seconds)</span>
                  </button>
                  <p className="text-primary-200 text-sm mt-2 ml-1">
                    Watch the first lesson before you buy!
                  </p>
                </div>
              )}

              {!isEnrolled && (
                <div className="bg-white bg-opacity-20 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold">₹{course.price}</span>
                    <span className="bg-warning-400 text-warning-900 px-3 py-1 rounded-full text-sm font-semibold">
                      Limited Time Offer
                    </span>
                  </div>

                  {error && (
                    <div className="mb-4 bg-error-100 border border-error-200 text-error-700 px-4 py-3 rounded-lg flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handlePurchase}
                    disabled={purchasing}
                    className="w-full bg-white text-primary-600 py-3 px-6 rounded-lg font-semibold hover:bg-secondary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
                  >
                    {purchasing ? (
                      <>
                        <Loader className="animate-spin h-5 w-5 mr-2" />
                        {paymentService.hasDirectPaymentLink(courseId)
                          ? "Redirecting to Payment..."
                          : "Processing Payment..."}
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5 mr-2" />
                        {paymentService.hasDirectPaymentLink(courseId)
                          ? "Enroll Now - Pay Securely"
                          : "Enroll Now - Pay with Razorpay"}
                      </>
                    )}
                  </button>
                </div>
              )}

              {isEnrolled && (
                <div className="bg-success-500 bg-opacity-20 border border-success-300 rounded-lg p-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-success-300" />
                    <span className="text-lg font-semibold">
                      You're enrolled in this Training!
                    </span>
                  </div>
                  <p className="text-success-100 mt-2">
                    Access your course materials and track your progress in your
                    dashboard.
                  </p>
                </div>
              )}
            </div>

            <div className=" bg-slate-100 bg-opacity-10 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6">What You'll Learn</h3>
              <div className="space-y-4">
                {course.trainingDays.map((day) => (
                  <div key={day.day} className="flex space-x-4">
                    <div className="bg-white bg-opacity-20 rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold">
                      {day.day}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{day.title}</h4>
                      <p className="text-primary-100 text-sm mt-1">
                        {day.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Training Days */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-secondary-900 mb-8">
                Course Curriculum
              </h2>

              <div className="space-y-6">
                {course.trainingDays.map((day) => (
                  <div
                    key={day.day}
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-600 text-white p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-white bg-opacity-20 rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">
                          {day.day}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Day {day.day}</h3>
                          <h4 className="text-primary-100">{day.title}</h4>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-secondary-700 leading-relaxed mb-4">
                        {day.content}
                      </p>

                      <div className="flex items-center space-x-4 text-secondary-600">
                        <div className="flex items-center space-x-2">
                          <Play className="h-4 w-4" />
                          <span className="text-sm">Video Content</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4" />
                          <span className="text-sm">
                            Downloadable Resources
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Course Preview Card */}
              {!isEnrolled && (
                <div className="bg-gradient-to-br from-primary-500 to-secondary-600 text-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-3">
                    🎬 Free Preview Available!
                  </h3>
                  <p className="text-primary-100 mb-4 text-sm">
                    Watch the first 30 seconds of this course to see what you'll
                    learn.
                  </p>
                  <button
                    onClick={openPreview}
                    className="w-full bg-white text-primary-600 py-3 px-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center justify-center space-x-2 shadow-md"
                  >
                    <Play className="h-5 w-5" />
                    <span>Watch Preview</span>
                  </button>
                </div>
              )}

              {/* Course Info */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-secondary-900 mb-4">
                  Training Information
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-600">Duration</span>
                    <span className="font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-600">Price</span>
                    <span className="font-semibold text-primary-600">
                      ₹{course.price}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-600">Certificate</span>
                    <CheckCircle className="h-5 w-5 text-success-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-600">Assignments</span>
                    <CheckCircle className="h-5 w-5 text-success-500" />
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-br from-primary-50 to-success-50 rounded-xl p-6 border border-primary-100">
                <h3 className="text-xl font-bold text-secondary-900 mb-4">
                  Why Choose This Training?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success-500" />
                    <span className="text-secondary-700">
                      Industry-relevant curriculum
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success-500" />
                    <span className="text-secondary-700">
                      Hands-on practical training
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success-500" />
                    <span className="text-secondary-700">
                      Expert mentor support
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success-500" />
                    <span className="text-secondary-700">
                      Job placement assistance
                    </span>
                  </div>
                </div>
              </div>

              {/* Special Offer */}
              <div className="bg-gradient-to-r from-warning-400 to-warning-500 text-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-2">
                  🎯 Special Opportunity
                </h3>
                <p className="text-warning-100">
                  Complete this Training and get shortlisted for hiring
                  opportunities in our company!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePreview();
            }
          }}
        >
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-secondary-100 bg-gradient-to-r from-primary-50 to-secondary-50">
              <div>
                <h3 className="text-2xl font-bold text-secondary-900">
                  🎬 Course Preview
                </h3>
                <p className="text-secondary-600 mt-1 font-medium">
                  First 30 seconds of {course.title}
                </p>
              </div>
              <button
                onClick={closePreview}
                className="p-2 hover:bg-white hover:bg-opacity-80 rounded-xl transition-all duration-200 hover:scale-105"
              >
                <X className="h-6 w-6 text-secondary-600" />
              </button>
            </div>

            {/* Video Content */}
            <div className="p-8">
              <div className="aspect-video bg-black rounded-xl overflow-hidden relative shadow-lg">
                {videoError ? (
                  <div className="w-full h-full flex items-center justify-center bg-secondary-800">
                    <div className="text-center text-white">
                      <div className="mb-4">
                        <AlertCircle className="h-16 w-16 text-error-400 mx-auto" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        Preview Unavailable
                      </h3>
                      <p className="text-secondary-300 mb-4">
                        Sorry, the video preview is currently unavailable. You
                        can still enroll to access the full course content.
                      </p>
                    </div>
                  </div>
                ) : !previewEnded ? (
                  <video
                    ref={setVideoRef}
                    src={getPreviewVideoUrl(courseId)}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    onTimeUpdate={handleVideoTimeUpdate}
                    onError={() => setVideoError(true)}
                    onLoadedData={() => {
                      if (videoRef) {
                        videoRef.currentTime = 0;
                      }
                      setRemainingTime(30);
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary-900">
                    <div className="text-center text-white">
                      <div className="mb-4">
                        <CheckCircle className="h-16 w-16 text-success-400 mx-auto" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        Preview Complete!
                      </h3>
                      <p className="text-secondary-300 mb-4">
                        You've watched the 30-second preview. Ready to enroll?
                      </p>
                      <button
                        onClick={() => {
                          setPreviewEnded(false);
                          setRemainingTime(30);
                          if (videoRef) {
                            videoRef.currentTime = 0;
                            videoRef.play();
                          }
                        }}
                        className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Watch Again
                      </button>
                    </div>
                  </div>
                )}

                {/* Countdown timer overlay */}
                {!previewEnded && !videoError && (
                  <div
                    className={`absolute top-4 right-4 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-all duration-300 ${
                      remainingTime <= 10
                        ? "bg-gradient-to-r from-error-500 to-error-600 animate-bounce"
                        : remainingTime <= 20
                        ? "bg-gradient-to-r from-warning-500 to-warning-600 animate-pulse"
                        : "bg-gradient-to-r from-primary-600 to-primary-700"
                    }`}
                  >
                    ⏱️ {remainingTime}s left
                  </div>
                )}
              </div>

              {/* CTA in Modal */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handlePurchase}
                  disabled={purchasing}
                  className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  {purchasing ? (
                    <>
                      <Loader className="animate-spin h-6 w-6 mr-3" />
                      {paymentService.hasDirectPaymentLink(courseId)
                        ? "Redirecting to Payment..."
                        : "Processing Payment..."}
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-6 w-6 mr-3" />
                      Enroll Now - ₹{course.price}
                    </>
                  )}
                </button>
                <button
                  onClick={closePreview}
                  className="px-8 py-4 border-2 border-secondary-300 text-secondary-700 rounded-xl font-semibold text-lg hover:bg-secondary-50 hover:border-secondary-400 transition-all duration-300 hover:scale-105"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseDetail;
