import React from 'react';
import { FileText, Scale, AlertTriangle, CheckCircle, XCircle, Users } from 'lucide-react';

function TermsOfService() {
  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Scale className="h-16 w-16 text-primary-200 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-primary-100">
              Please read these terms carefully before using our training platform and services.
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
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">Agreement to Terms</h2>
            <div className="bg-warning-50 rounded-lg p-6 border border-warning-200">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-warning-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-secondary-700 leading-relaxed">
                    By accessing and using Yourskilll Training platform, you accept and agree to be bound by the terms and provision of this agreement. 
                    If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Usage */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Users className="h-8 w-8 text-primary-600 mr-3" />
              <h2 className="text-3xl font-bold text-secondary-900">Platform Usage</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-success-50 rounded-lg p-6 border border-success-200">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-6 w-6 text-success-600 mr-2" />
                  <h3 className="text-xl font-semibold text-secondary-900">Permitted Uses</h3>
                </div>
                <ul className="text-secondary-700 space-y-2">
                  <li>• Access and complete training courses</li>
                  <li>• Submit assignments and projects</li>
                  <li>• Participate in hiring opportunities</li>
                  <li>• Download course materials for personal use</li>
                  <li>• Communicate with instructors and support staff</li>
                </ul>
              </div>

              <div className="bg-error-50 rounded-lg p-6 border border-error-200">
                <div className="flex items-center mb-3">
                  <XCircle className="h-6 w-6 text-error-600 mr-2" />
                  <h3 className="text-xl font-semibold text-secondary-900">Prohibited Activities</h3>
                </div>
                <ul className="text-secondary-700 space-y-2">
                  <li>• Sharing account credentials with others</li>
                  <li>• Distributing course materials without permission</li>
                  <li>• Attempting to hack or disrupt the platform</li>
                  <li>• Submitting false or misleading information</li>
                  <li>• Using the platform for illegal activities</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Account Responsibilities */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">Account Responsibilities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">User Obligations</h3>
                <ul className="text-secondary-700 space-y-2 text-sm">
                  <li>• Provide accurate registration information</li>
                  <li>• Maintain account security</li>
                  <li>• Complete courses in good faith</li>
                  <li>• Respect intellectual property rights</li>
                </ul>
              </div>

              <div className="bg-secondary-50 rounded-lg p-6 border border-secondary-200">
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">Platform Rights</h3>
                <ul className="text-secondary-700 space-y-2 text-sm">
                  <li>• Modify or discontinue services</li>
                  <li>• Suspend accounts for violations</li>
                  <li>• Update terms and conditions</li>
                  <li>• Monitor platform usage</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Course Enrollment & Completion */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <FileText className="h-8 w-8 text-success-600 mr-3" />
              <h2 className="text-3xl font-bold text-secondary-900">Course Enrollment & Completion</h2>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary-600 pl-6">
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Enrollment</h3>
                <p className="text-secondary-700">
                  Course enrollment requires payment of applicable fees. Once enrolled, you gain access to course materials 
                  and must complete all requirements within the specified timeframe.
                </p>
              </div>

              <div className="border-l-4 border-success-600 pl-6">
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Completion Requirements</h3>
                <ul className="text-secondary-700 space-y-1">
                  <li>• Complete all training days (Day 1, Day 2, Day 3)</li>
                  <li>• Submit required assignments</li>
                  <li>• Meet minimum performance standards</li>
                  <li>• Participate in assessments</li>
                </ul>
              </div>

              <div className="border-l-4 border-warning-600 pl-6">
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Hiring Opportunities</h3>
                <p className="text-secondary-700">
                  Course completion may make you eligible for hiring consideration, but does not guarantee employment. 
                  Hiring decisions are based on various factors including performance, availability, and business needs.
                </p>
              </div>
            </div>
          </div>

          {/* Payment & Refunds */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">Payment & Refunds</h2>
            
            <div className="bg-warning-50 rounded-lg p-6 border border-warning-200">
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">Payment Policy</h3>
              <ul className="text-secondary-700 space-y-2">
                <li>• All course fees must be paid in full before access is granted</li>
                <li>• Payments are processed securely through our payment partners</li>
                <li>• Course prices are subject to change without notice</li>
                <li>• Additional fees may apply for premium services</li>
              </ul>
            </div>

            <div className="bg-error-50 rounded-lg p-6 border border-error-200 mt-4">
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">Refund Policy</h3>
              <ul className="text-secondary-700 space-y-2">
                <li>• Refunds may be requested within 7 days of enrollment</li>
                <li>• No refunds after course materials have been accessed</li>
                <li>• Processing fees may be deducted from refunds</li>
                <li>• Refunds are processed within 7-10 business days</li>
              </ul>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">Intellectual Property</h2>
            
            <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
              <p className="text-secondary-700 leading-relaxed mb-4">
                All course materials, including but not limited to videos, documents, assignments, and assessments, 
                are the intellectual property of Yourskilll Training and are protected by copyright laws.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">You May:</h4>
                  <ul className="text-secondary-700 space-y-1 text-sm">
                    <li>• Use materials for personal learning</li>
                    <li>• Download for offline study</li>
                    <li>• Reference in personal projects</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">You May Not:</h4>
                  <ul className="text-secondary-700 space-y-1 text-sm">
                    <li>• Redistribute or sell materials</li>
                    <li>• Share with non-enrolled users</li>
                    <li>• Use for commercial purposes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">Limitation of Liability</h2>
            
            <div className="bg-secondary-50 rounded-lg p-6 border border-secondary-200">
              <p className="text-secondary-700 leading-relaxed">
                Yourskilll Training provides the platform and courses "as is" without warranties of any kind. 
                We are not liable for any indirect, incidental, or consequential damages arising from your use of our services. 
                Our total liability is limited to the amount you paid for the specific course.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-8 border border-primary-200">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Questions About Terms</h2>
            <p className="text-secondary-700 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-secondary-700">
              <p><strong>Email:</strong> legal@yourskilll.com</p>
              <p><strong>Phone:</strong> +91 9876543210</p>
              <p><strong>Address:</strong> 6th Floor, Altf Spaces, Sector-142, Noida, Uttar Pradesh - 201304</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TermsOfService;
