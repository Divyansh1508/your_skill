import api from "../config/api.js";

// Course-specific payment links
const COURSE_PAYMENT_LINKS = {
  "digital-marketing": "https://checkout.razorpay.com/v1/payment-button.js",
  "web-development": "https://rzp.io/rzp/fepCrkt",
  // Add more course payment links here as needed
};

export const paymentService = {
  // Get payment link for a specific course
  getPaymentLink(courseId) {
    return COURSE_PAYMENT_LINKS[courseId] || null;
  },

  // Check if course has direct payment link
  hasDirectPaymentLink(courseId) {
    return !!COURSE_PAYMENT_LINKS[courseId];
  },

  // Handle direct payment link redirect
  redirectToPayment(courseId) {
    const paymentLink = this.getPaymentLink(courseId);
    if (paymentLink) {
      // Open payment link in new tab
      window.open(paymentLink, "_blank", "noopener,noreferrer");
      return { success: true, message: "Redirected to payment" };
    }
    return {
      success: false,
      message: "No payment link available for this course",
    };
  },

  // Create Razorpay order (fallback for courses without direct links)
  async createOrder(courseId) {
    try {
      const response = await api.post("/payments/create-order", { courseId });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to create order",
        }
      );
    }
  },

  // Verify payment (fallback for courses without direct links)
  async verifyPayment(paymentData) {
    try {
      const response = await api.post("/payments/verify", paymentData);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Payment verification failed",
        }
      );
    }
  },
};
