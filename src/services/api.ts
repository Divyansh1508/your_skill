// Mock API service to simulate backend calls
// In production, replace with actual API endpoints

import { User } from '../contexts/AuthContext';

// Course interface
export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  trainingDays: {
    day: number;
    title: string;
    content: string;
    videoUrl?: string;
  }[];
  assignmentRequired: boolean;
}

// Mock courses data
export const courses: Course[] = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Master the fundamentals of digital marketing including SEO, social media marketing, content strategy, and analytics.',
    price: 75,
    duration: '3 Days',
    trainingDays: [
      {
        day: 1,
        title: 'Introduction to Digital Marketing & SEO',
        content: 'Learn the basics of digital marketing landscape, SEO fundamentals, keyword research, and on-page optimization techniques.',
        videoUrl: 'https://example.com/video1'
      },
      {
        day: 2,
        title: 'Social Media Marketing & Content Strategy',
        content: 'Understand social media platforms, content creation strategies, engagement tactics, and building brand presence online.',
        videoUrl: 'https://example.com/video2'
      },
      {
        day: 3,
        title: 'Analytics & Campaign Optimization',
        content: 'Master Google Analytics, conversion tracking, A/B testing, and campaign performance optimization techniques.',
        videoUrl: 'https://example.com/video3'
      }
    ],
    assignmentRequired: true
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Learn modern web development with HTML5, CSS3, JavaScript, React, and backend development fundamentals.',
    price: 75,
    duration: '3 Days',
    trainingDays: [
      {
        day: 1,
        title: 'HTML5, CSS3 & Responsive Design',
        content: 'Master semantic HTML5, modern CSS3 features, Flexbox, Grid, and responsive design principles for mobile-first development.',
        videoUrl: 'https://example.com/video4'
      },
      {
        day: 2,
        title: 'JavaScript & DOM Manipulation',
        content: 'Learn JavaScript fundamentals, ES6+ features, DOM manipulation, event handling, and building interactive web applications.',
        videoUrl: 'https://example.com/video5'
      },
      {
        day: 3,
        title: 'React & Modern Frontend Development',
        content: 'Introduction to React, components, state management, hooks, and building modern single-page applications.',
        videoUrl: 'https://example.com/video6'
      }
    ],
    assignmentRequired: true
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API
export const authAPI = {
  async login(email: string, password: string) {
    await delay(1000);
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
      token: 'mock-jwt-token-' + user.id
    };
  },

  async signup(name: string, email: string, password: string) {
    await delay(1000);
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      return { success: false, message: 'User already exists with this email' };
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: 'student',
      enrolledCourses: [],
      trainingProgress: {},
      assignments: {},
      paymentStatus: {},
      shortlisted: false
    };
    
    // Save to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;
    
    return {
      success: true,
      message: 'Account created successfully',
      user: userWithoutPassword,
      token: 'mock-jwt-token-' + newUser.id
    };
  }
};

// Course API
export const courseAPI = {
  async getAllCourses() {
    await delay(500);
    return courses;
  },

  async getCourse(courseId: string) {
    await delay(500);
    return courses.find(course => course.id === courseId);
  },

  async purchaseCourse(courseId: string, userId: string) {
    await delay(1500);
    
    // Simulate Razorpay payment success
    // In production, this would integrate with actual Razorpay API
    
    // Update user's enrolled courses and payment status
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].enrolledCourses.push(courseId);
      users[userIndex].paymentStatus[courseId] = true;
      users[userIndex].trainingProgress[courseId] = {
        day1: false,
        day2: false,
        day3: false
      };
      
      localStorage.setItem('users', JSON.stringify(users));
      
      return {
        success: true,
        message: 'Course purchased successfully!',
        user: users[userIndex]
      };
    }
    
    return { success: false, message: 'Payment failed. Please try again.' };
  }
};

// User API
export const userAPI = {
  async updateProgress(userId: string, courseId: string, day: string, completed: boolean) {
    await delay(500);
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === userId);
    
    if (userIndex !== -1) {
      if (!users[userIndex].trainingProgress[courseId]) {
        users[userIndex].trainingProgress[courseId] = { day1: false, day2: false, day3: false };
      }
      
      users[userIndex].trainingProgress[courseId][day] = completed;
      localStorage.setItem('users', JSON.stringify(users));
      
      return { success: true, user: users[userIndex] };
    }
    
    return { success: false, message: 'Failed to update progress' };
  },

  async submitAssignment(userId: string, courseId: string, fileName: string) {
    await delay(1000);
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].assignments[courseId] = fileName;
      localStorage.setItem('users', JSON.stringify(users));
      
      return { success: true, user: users[userIndex] };
    }
    
    return { success: false, message: 'Failed to submit assignment' };
  },

  async getAllUsers() {
    await delay(500);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.filter((u: any) => u.role === 'student');
  },

  async updateUserStatus(userId: string, shortlisted: boolean) {
    await delay(500);
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].shortlisted = shortlisted;
      localStorage.setItem('users', JSON.stringify(users));
      
      return { success: true };
    }
    
    return { success: false, message: 'Failed to update user status' };
  }
};

// Initialize admin user if not exists
export const initializeApp = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  if (!users.find((u: any) => u.role === 'admin')) {
    const adminUser = {
      id: 'admin-1',
      name: 'Admin',
      email: 'admin@thinkacademies.com',
      password: 'admin123',
      role: 'admin',
      enrolledCourses: [],
      trainingProgress: {},
      assignments: {},
      paymentStatus: {},
      shortlisted: false
    };
    
    users.push(adminUser);
    localStorage.setItem('users', JSON.stringify(users));
  }
};