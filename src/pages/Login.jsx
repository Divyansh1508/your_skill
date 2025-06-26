import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, AlertCircle, Loader, CheckCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext.jsx";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle signup success message and pre-fill email
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      if (location.state.email) {
        setFormData((prev) => ({ ...prev, email: location.state.email }));
      }
      // Clear the success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        // Redirect based on user role
        if (result.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
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
              Welcome Back
            </h2>
            <p className="text-secondary-600">
              Sign in to access your training dashboard
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 bg-primary-50 border border-primary-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-primary-800 mb-2">
              Demo Credentials:
            </h3>
            <div className="text-sm text-primary-700 space-y-1">
              <div>
                <strong>Admin:</strong> admin@thinkacademies.com / admin123
              </div>
              <div>
                <strong>Student:</strong> Create a new account or use any
                registered email
              </div>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mt-4 bg-success-50 border border-success-200 rounded-lg p-4 flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-success-500" />
              <span className="text-success-700">{successMessage}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-error-50 border border-error-200 rounded-lg p-4 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-error-500" />
              <span className="text-error-700">{error}</span>
            </div>
          )}

          {/* Form */}
          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
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
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-secondary-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
