import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">Yourskilll</span>
            </div>
            <p className="text-secondary-300 mb-4 max-w-md">
              Empowering careers through professional training in Digital
              Marketing and Web Development. Complete our courses and get
              shortlisted for hiring opportunities in our company.
            </p>
            <div className="bg-gradient-to-r from-primary-600 to-success-600 p-4 rounded-lg">
              <p className="font-semibold text-white">
                🎯 Complete our Training and get shortlisted for hiring!
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-secondary-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="text-secondary-300 hover:text-white transition-colors"
                >
                  Our Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-secondary-300 hover:text-white transition-colors"
                >
                  Student Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-secondary-300 hover:text-white transition-colors"
                >
                  Join Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <span className="text-secondary-300">
                  contact@yourskilll.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400" />
                <span className="text-secondary-300">+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-400" />
                <span className="text-secondary-300">
                  6th Floor, Altf Spaces, Sector-142, Noida, Uttar Pradesh -
                  201304{" "}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-400 text-sm">
              © 2025 Yourskilll Training. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy-policy"
                className="text-secondary-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-secondary-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/support"
                className="text-secondary-400 hover:text-white text-sm transition-colors"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
