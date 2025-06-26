import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Users,
  Briefcase,
  CheckCircle,
  Star,
  TrendingUp,
} from "lucide-react";

function Home() {
  const features = [
    {
      icon: <Award className="h-8 w-8 text-primary-600" />,
      title: "Professional Training",
      description:
        "Industry-relevant courses designed by experts in Digital Marketing and Web Development.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      title: "Expert Instructors",
      description:
        "Learn from experienced professionals with years of industry experience.",
    },
    {
      icon: <Briefcase className="h-8 w-8 text-success-600" />,
      title: "Job Opportunities",
      description:
        "Complete our training and get shortlisted for hiring in our company.",
    },
  ];

  const benefits = [
    "3-day intensive training programs",
    "Hands-on practical assignments",
    "Industry-recognized certification",
    "Direct hiring opportunities",
    "Affordable pricing at ₹75 per course",
    "Flexible online learning",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Career with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-warning-400 to-warning-500 mt-2 h-20">
                Professional Training
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Master Digital Marketing and Web Development with our
              comprehensive 3-day training programs. Complete the course and get
              shortlisted for hiring opportunities!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-secondary-50 transition-colors flex items-center justify-center shadow-lg"
              >
                View Training
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/signup"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Banner */}
      <section className="bg-gradient-to-r from-success-500 to-primary-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Briefcase className="h-6 w-6 mr-2" />
              <span className="text-lg font-semibold">Special Opportunity</span>
            </div>
            <p className="text-xl font-bold">
              Complete our training and get shortlisted for hiring in our
              company!
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Why Choose yourskilll?
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              We provide quality training with real-world applications and
              direct job opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl border border-secondary-200 hover:shadow-xl hover:border-primary-200 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-secondary-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Our Training Programs
            </h2>
            <p className="text-xl text-secondary-600">
              Choose from our expertly designed Training
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Digital Marketing Course */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-secondary-100">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-48 flex items-center justify-center">
                <TrendingUp className="h-16 w-16 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-secondary-900 mb-3">
                  Digital Marketing
                </h3>
                <p className="text-secondary-600 mb-4">
                  Master SEO, social media marketing, content strategy, and
                  analytics in 3 intensive days.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary-600">
                    ₹75
                  </span>
                  <span className="text-secondary-500">3 Days</span>
                </div>
                <Link
                  to="/courses/digital-marketing"
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors block text-center shadow-md"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Web Development Course */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-secondary-100">
              <div className="bg-gradient-to-r from-secondary-600 to-secondary-700 h-48 flex items-center justify-center">
                <Star className="h-16 w-16 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-secondary-900 mb-3">
                  Web Development
                </h3>
                <p className="text-secondary-600 mb-4">
                  Learn HTML5, CSS3, JavaScript, React, and modern web
                  development in 3 days.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-secondary-600">
                    ₹75
                  </span>
                  <span className="text-secondary-500">3 Days</span>
                </div>
                <Link
                  to="/courses/web-development"
                  className="w-full bg-secondary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-secondary-700 transition-colors block text-center shadow-md"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                What You'll Get
              </h2>
              <p className="text-xl text-secondary-600 mb-8">
                Our comprehensive training program is designed to give you
                everything you need to succeed in your career.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-success-500 flex-shrink-0" />
                    <span className="text-secondary-800 font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-success-50 p-8 rounded-xl border border-primary-100">
              <div className="text-center">
                <div className="bg-gradient-to-r from-primary-600 to-success-600 text-white p-6 rounded-lg mb-6">
                  <h3 className="text-2xl font-bold mb-2">Special Offer</h3>
                  <p className="text-primary-100">
                    Complete any Training and get:
                  </p>
                </div>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success-500" />
                    <span className="text-secondary-700">
                      Industry certification
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success-500" />
                    <span className="text-secondary-700">Portfolio review</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success-500" />
                    <span className="text-secondary-700">
                      Interview preparation
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success-500" />
                    <span className="text-secondary-700">
                      Job placement assistance
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Join thousands of students who have successfully completed our
            training and landed their dream jobs.
          </p>
          <Link
            to="/courses"
            className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-secondary-50 transition-colors inline-flex items-center shadow-lg"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
