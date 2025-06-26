import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, GraduationCap, User, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext.jsx";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50 top-0 border-b border-secondary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-secondary-900">
              Yourskilll
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-secondary-700 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-secondary-700 hover:text-primary-600 font-medium transition-colors"
            >
              About
            </Link>
            <Link
              to="/courses"
              className="text-secondary-700 hover:text-primary-600 font-medium transition-colors"
            >
              Training
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={user.role === "admin" ? "/admin" : "/dashboard"}
                  className="text-secondary-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-secondary-600" />
                  <span className="text-secondary-700 font-medium">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-secondary-700 hover:text-error-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-secondary-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary-700 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-secondary-200">
              <Link
                to="/"
                className="block px-3 py-2 text-secondary-700 hover:text-primary-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-secondary-700 hover:text-primary-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/courses"
                className="block px-3 py-2 text-secondary-700 hover:text-primary-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Training
              </Link>

              {user ? (
                <>
                  <Link
                    to={user.role === "admin" ? "/admin" : "/dashboard"}
                    className="block px-3 py-2 text-secondary-700 hover:text-primary-600 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="px-3 py-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-5 w-5 text-secondary-600" />
                      <span className="text-secondary-700 font-medium">
                        {user.name}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-1 text-error-600 hover:text-error-700"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-secondary-700 hover:text-primary-600 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 bg-primary-600 text-white rounded-lg font-medium mx-3 text-center shadow-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
