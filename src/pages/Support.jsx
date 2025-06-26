import React, { useState } from 'react';
import { 
  HelpCircle, 
  Mail, 
  Phone, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  Book, 
  Users, 
  CreditCard,
  Settings,
  Send
} from 'lucide-react';

function Support() {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      category: 'general',
      subject: '',
      message: ''
    });
  };

  const faqs = [
    {
      category: 'general',
      question: 'How do I enroll in a course?',
      answer: 'To enroll in a course, browse our courses page, select the training you want, and click "Enroll Now". You will need to create an account and complete the payment process.'
    },
    {
      category: 'general',
      question: 'What happens after I complete a course?',
      answer: 'After completing all training days and submitting your assignment, you become eligible for hiring consideration in our company. We will review your performance and contact you if there are suitable opportunities.'
    },
    {
      category: 'courses',
      question: 'How long do I have to complete a course?',
      answer: 'Our courses are designed as 3-day intensive training programs. You have 30 days from enrollment to complete all requirements including assignments.'
    },
    {
      category: 'courses',
      question: 'Can I access course materials after completion?',
      answer: 'Yes, you will have lifetime access to course materials after successful completion. You can revisit content anytime through your student dashboard.'
    },
    {
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your email to reset your password.'
    },
    {
      category: 'account',
      question: 'Can I change my email address?',
      answer: 'Yes, you can update your email address in your profile settings. You will need to verify the new email address before the change takes effect.'
    },
    {
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our payment partners.'
    },
    {
      category: 'payment',
      question: 'Can I get a refund?',
      answer: 'Refunds are available within 7 days of enrollment, provided you have not accessed the course materials. Please contact support for refund requests.'
    }
  ];

  const categories = [
    { id: 'general', name: 'General', icon: HelpCircle },
    { id: 'courses', name: 'Courses', icon: Book },
    { id: 'account', name: 'Account', icon: Users },
    { id: 'payment', name: 'Payment', icon: CreditCard }
  ];

  const filteredFaqs = faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle className="h-16 w-16 text-primary-200 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Center</h1>
            <p className="text-xl text-primary-100">
              Get help with your courses, account, and platform usage. We're here to support your learning journey.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-secondary-900 mb-2">Email Support</h3>
            <p className="text-secondary-600 mb-4">Get detailed help via email</p>
            <a href="mailto:support@yourskilll.com" className="text-primary-600 font-semibold hover:text-primary-700">
              support@yourskilll.com
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-success-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-success-600" />
            </div>
            <h3 className="text-xl font-bold text-secondary-900 mb-2">Phone Support</h3>
            <p className="text-secondary-600 mb-4">Speak with our support team</p>
            <a href="tel:+919876543210" className="text-success-600 font-semibold hover:text-success-700">
              +91 9876543210
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-warning-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-warning-600" />
            </div>
            <h3 className="text-xl font-bold text-secondary-900 mb-2">Response Time</h3>
            <p className="text-secondary-600 mb-4">We typically respond within</p>
            <span className="text-warning-600 font-semibold">24 hours</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl font-bold text-secondary-900 mb-8">Frequently Asked Questions</h2>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-secondary-700 hover:bg-primary-50'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-3 flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-secondary-700 leading-relaxed pl-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-secondary-900 mb-8">Contact Us</h2>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-secondary-700 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="courses">Course Related</option>
                    <option value="account">Account Issues</option>
                    <option value="payment">Payment & Billing</option>
                    <option value="technical">Technical Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Please provide detailed information about your question or issue..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Additional Help */}
            <div className="mt-8 bg-primary-50 rounded-lg p-6 border border-primary-200">
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">Need Immediate Help?</h3>
              <p className="text-secondary-700 mb-4">
                For urgent issues or technical problems, you can also reach us through:
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4 text-primary-600" />
                  <span className="text-secondary-700">WhatsApp: +91 9876543210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-primary-600" />
                  <span className="text-secondary-700">Support Hours: Mon-Fri, 9 AM - 6 PM IST</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
