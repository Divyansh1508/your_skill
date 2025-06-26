import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle,
  Loader,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext.jsx";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Call signup but don't automatically log in
      const result = await signup(
        formData.name,
        formData.email,
        formData.password
      );

      if (result.success) {
        // Show success message and redirect to login
        setSuccess(true);
        setError("");

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate("/login", {
            state: {
              message:
                "Account created successfully! Please log in with your credentials.",
              email: formData.email,
            },
          });
        }, 2000);
      } else {
        setError(result.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-xl shadow-xl border border-secondary-100 p-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-secondary-900 mb-2">
              Join Yourskilll
            </h2>
            <p className="text-secondary-600">
              Create your account and start your learning journey
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-6 bg-gradient-to-r from-primary-50 to-success-50 rounded-lg p-4 border border-primary-100">
            <h3 className="font-semibold text-secondary-800 mb-2">
              What you'll get:
            </h3>
            <div className="space-y-1 text-sm text-secondary-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success-500" />
                <span>Access to professional courses</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success-500" />
                <span>Progress tracking dashboard</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success-500" />
                <span>Hiring opportunities</span>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mt-4 bg-success-50 border border-success-200 rounded-lg p-4 flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-success-500" />
              <div className="text-success-700">
                <p className="font-semibold">Account created successfully!</p>
                <p className="text-sm">Redirecting to login page...</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && !success && (
            <div className="mt-4 bg-error-50 border border-error-200 rounded-lg p-4 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-error-500" />
              <span className="text-error-700">{error}</span>
            </div>
          )}

          {/* Form */}
          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-secondary-700 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 w-full px-3 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-secondary-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full px-3 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-secondary-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 w-full px-3 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Create a password (min. 6 characters)"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-secondary-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 w-full px-3 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {/* Terms and Privacy Notice */}
            <div className="text-sm text-secondary-600 text-center">
              By creating an account, you agree to our{" "}
              <Link
                to="/terms-of-service"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy-policy"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-secondary-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
