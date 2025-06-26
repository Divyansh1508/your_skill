import React from 'react';
import { Shield, Eye, Lock, Users, FileText, Mail } from 'lucide-react';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="h-16 w-16 text-primary-200 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-primary-100">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <div className="mt-6 text-primary-200">
              <p>Last updated: January 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          
          {/* Introduction */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">Introduction</h2>
            <p className="text-secondary-700 leading-relaxed text-lg">
              At Yourskilll Training, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our training platform 
              and services.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Eye className="h-8 w-8 text-primary-600 mr-3" />
              <h2 className="text-3xl font-bold text-secondary-900">Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">Personal Information</h3>
                <ul className="text-secondary-700 space-y-2">
                  <li>• Name and contact information (email, phone number)</li>
                  <li>• Account credentials and profile information</li>
                  <li>• Educational background and professional experience</li>
                  <li>• Course enrollment and progress data</li>
                  <li>• Assignment submissions and project files</li>
                </ul>
              </div>

              <div className="bg-secondary-50 rounded-lg p-6 border border-secondary-200">
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">Technical Information</h3>
                <ul className="text-secondary-700 space-y-2">
                  <li>• IP address and device information</li>
                  <li>• Browser type and operating system</li>
                  <li>• Usage patterns and platform interactions</li>
                  <li>• Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Users className="h-8 w-8 text-success-600 mr-3" />
              <h2 className="text-3xl font-bold text-secondary-900">How We Use Your Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-success-50 rounded-lg p-6 border border-success-200">
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">Service Delivery</h3>
                <ul className="text-secondary-700 space-y-1 text-sm">
                  <li>• Provide training courses and materials</li>
                  <li>• Track learning progress</li>
                  <li>• Issue certificates and credentials</li>
                  <li>• Facilitate hiring opportunities</li>
                </ul>
              </div>

              <div className="bg-warning-50 rounded-lg p-6 border border-warning-200">
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">Communication</h3>
                <ul className="text-secondary-700 space-y-1 text-sm">
                  <li>• Send course updates and notifications</li>
                  <li>• Provide customer support</li>
                  <li>• Share hiring opportunities</li>
                  <li>• Send promotional materials (with consent)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Protection */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Lock className="h-8 w-8 text-error-600 mr-3" />
              <h2 className="text-3xl font-bold text-secondary-900">Data Protection & Security</h2>
            </div>
            
            <div className="bg-error-50 rounded-lg p-6 border border-error-200">
              <p className="text-secondary-700 leading-relaxed mb-4">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="text-secondary-700 space-y-2">
                <li>• SSL encryption for data transmission</li>
                <li>• Secure servers and databases</li>
                <li>• Regular security audits and updates</li>
                <li>• Limited access to authorized personnel only</li>
                <li>• Data backup and recovery procedures</li>
              </ul>
            </div>
          </div>

          {/* Information Sharing */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <FileText className="h-8 w-8 text-secondary-600 mr-3" />
              <h2 className="text-3xl font-bold text-secondary-900">Information Sharing</h2>
            </div>
            
            <p className="text-secondary-700 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-primary-600 pl-4">
                <h3 className="font-semibold text-secondary-900">Hiring Partners</h3>
                <p className="text-secondary-700 text-sm">With your explicit consent, we may share your profile and course completion status with potential employers.</p>
              </div>
              <div className="border-l-4 border-warning-600 pl-4">
                <h3 className="font-semibold text-secondary-900">Legal Requirements</h3>
                <p className="text-secondary-700 text-sm">When required by law, court order, or government regulations.</p>
              </div>
              <div className="border-l-4 border-success-600 pl-4">
                <h3 className="font-semibold text-secondary-900">Service Providers</h3>
                <p className="text-secondary-700 text-sm">With trusted third-party service providers who assist in platform operations (under strict confidentiality agreements).</p>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">Your Rights</h2>
            <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
              <p className="text-secondary-700 leading-relaxed mb-4">You have the right to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="text-secondary-700 space-y-2">
                  <li>• Access your personal information</li>
                  <li>• Correct inaccurate data</li>
                  <li>• Delete your account and data</li>
                </ul>
                <ul className="text-secondary-700 space-y-2">
                  <li>• Opt-out of marketing communications</li>
                  <li>• Data portability</li>
                  <li>• File complaints with authorities</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-8 border border-primary-200">
            <div className="flex items-center mb-4">
              <Mail className="h-8 w-8 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-secondary-900">Contact Us</h2>
            </div>
            <p className="text-secondary-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-secondary-700">
              <p><strong>Email:</strong> privacy@yourskilll.com</p>
              <p><strong>Phone:</strong> +91 9876543210</p>
              <p><strong>Address:</strong> 6th Floor, Altf Spaces, Sector-142, Noida, Uttar Pradesh - 201304</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
