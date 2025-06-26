import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  Users,
  Award,
  ArrowRight,
  TrendingUp,
  Code,
  CreditCard,
} from "lucide-react";
import { courseService } from "../services/courseService.js";
import { paymentService } from "../services/paymentService.js";
import { useAuth } from "../contexts/AuthContext.jsx";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseService.getAllCourses();
        if (response.success) {
          setCourses(response.courses);
        } else {
          setError("Failed to load Trining");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load Trining");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle quick enrollment for courses with direct payment links
  const handleQuickEnroll = (courseId) => {
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = "/login";
      return;
    }

    if (paymentService.hasDirectPaymentLink(courseId)) {
      const result = paymentService.redirectToPayment(courseId);
      if (result.success) {
        alert(
          "You will be redirected to the payment page. After successful payment, please return to complete your enrollment."
        );
      }
    }
  };

  const getCourseIcon = (courseId) => {
    switch (courseId) {
      case "digital-marketing":
        return <TrendingUp className="h-12 w-12 text-white" />;
      case "web-development":
        return <Code className="h-12 w-12 text-white" />;
      default:
        return <Award className="h-12 w-12 text-white" />;
    }
  };

  const getCourseGradient = (courseId) => {
    switch (courseId) {
      case "digital-marketing":
        return "from-primary-500 to-primary-600";
      case "web-development":
        return "from-secondary-600 to-secondary-700";
      default:
        return "from-secondary-500 to-secondary-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">
            Error Loading Training
          </h2>
          <p className="text-secondary-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Training Courses
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Choose from our expertly designed Training and start your journey
              towards a successful career. Complete any course and get
              shortlisted for hiring opportunities!
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Course Header */}
                <div
                  className={`bg-gradient-to-r ${getCourseGradient(
                    course.courseId
                  )} h-48 flex items-center justify-center relative`}
                >
                  {getCourseIcon(course.courseId)}
                  <div className="absolute top-4 right-4 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    <span className="text-white font-medium">
                      {course.duration}
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-secondary-900 mb-3">
                    {course.title}
                  </h3>
                  <p className="text-secondary-600 mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Course Features */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3 text-secondary-700">
                      <Clock className="h-5 w-5 text-primary-600" />
                      <span>3-day intensive training</span>
                    </div>
                    <div className="flex items-center space-x-3 text-secondary-700">
                      <Users className="h-5 w-5 text-primary-600" />
                      <span>Expert instructors</span>
                    </div>
                    <div className="flex items-center space-x-3 text-secondary-700">
                      <Award className="h-5 w-5 text-primary-600" />
                      <span>Practical assignments</span>
                    </div>
                  </div>

                  {/* Training Days Preview */}
                  <div className="bg-secondary-50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-secondary-800 mb-3">
                      Training Schedule:
                    </h4>
                    <div className="space-y-2">
                      {course.trainingDays.map((day) => (
                        <div
                          key={day.day}
                          className="flex items-start space-x-3"
                        >
                          <div className="bg-primary-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                            {day.day}
                          </div>
                          <div>
                            <div className="font-medium text-secondary-800">
                              {day.title}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-primary-600">
                        ₹{course.price}
                      </span>
                      <span className="text-secondary-500 ml-2">only</span>
                    </div>
                    <div className="flex gap-2">
                      {/* Quick Enroll button for courses with direct payment links */}
                      {paymentService.hasDirectPaymentLink(course.courseId) && (
                        <button
                          onClick={() => handleQuickEnroll(course.courseId)}
                          className="bg-success-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-success-700 transition-colors flex items-center shadow-md"
                          title="Quick enrollment with direct payment"
                        >
                          <CreditCard className="h-4 w-4 mr-1" />
                          Pay Now
                        </button>
                      )}
                      {/* Regular course detail link */}
                      <Link
                        to={`/courses/${course.courseId}`}
                        className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center shadow-md"
                      >
                        {paymentService.hasDirectPaymentLink(course.courseId)
                          ? "View Details"
                          : "Enroll Now"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Why Choose Our Training?
            </h2>
            <p className="text-xl text-secondary-600">
              We provide comprehensive training with real-world applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                Industry-Relevant
              </h3>
              <p className="text-secondary-600">
                Our curriculum is designed based on current industry standards
                and requirements.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                Expert Mentors
              </h3>
              <p className="text-secondary-600">
                Learn from experienced professionals with years of industry
                experience.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-success-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                Career Growth
              </h3>
              <p className="text-secondary-600">
                Complete our training and get shortlisted for hiring
                opportunities in our company.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join hundreds of students who have successfully completed our
            training and advanced their careers.
          </p>
          <div className="bg-white bg-opacity-20 rounded-lg p-6 max-w-md mx-auto">
            <div className="text-2xl font-bold mb-2">Special Offer</div>
            <div className="text-primary-100">
              Complete any Training and get shortlisted for hiring in our
              company!
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Courses;
