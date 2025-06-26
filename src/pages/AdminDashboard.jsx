import React, { useState, useEffect } from "react";
import {
  Users,
  Award,
  CheckCircle,
  FileText,
  Download,
  Search,
  Filter,
} from "lucide-react";
import { userService } from "../services/userService.js";
import { courseService } from "../services/courseService.js";

function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsResponse, coursesResponse] = await Promise.all([
          userService.getAllStudents(),
          courseService.getAllCourses(),
        ]);

        if (studentsResponse.success) {
          setStudents(studentsResponse.students);
        }
        if (coursesResponse.success) {
          setCourses(coursesResponse.courses);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShortlistToggle = async (studentId, currentStatus) => {
    try {
      const response = await userService.updateShortlistStatus(
        studentId,
        !currentStatus
      );
      if (response.success) {
        setStudents((prev) =>
          prev.map((student) =>
            student.id === studentId
              ? { ...student, shortlisted: !currentStatus }
              : student
          )
        );
      }
    } catch (error) {
      console.error("Error updating student status:", error);
    }
  };

  const exportShortlistedStudents = () => {
    const shortlistedStudents = students.filter(
      (student) => student.shortlisted
    );

    const csvContent = [
      ["Name", "Email", "Enrolled Courses", "Completion Status", "Shortlisted"],
      ...shortlistedStudents.map((student) => [
        student.name,
        student.email,
        student.enrolledCourses.join(", "),
        getOverallCompletionStatus(student),
        "Yes",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "shortlisted-students.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getOverallCompletionStatus = (student) => {
    const enrolledCourses = student.enrolledCourses || [];
    if (enrolledCourses.length === 0) return "No courses enrolled";

    const completedCourses = enrolledCourses.filter((courseId) => {
      const progress =
        student.trainingProgress && student.trainingProgress[courseId];
      const assignments = student.assignments && student.assignments[courseId];
      return (
        progress &&
        progress.day1 &&
        progress.day2 &&
        progress.day3 &&
        assignments
      );
    });

    return `${completedCourses.length}/${enrolledCourses.length} courses completed`;
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    switch (statusFilter) {
      case "completed":
        return (
          student.enrolledCourses &&
          student.enrolledCourses.some((courseId) => {
            const progress =
              student.trainingProgress && student.trainingProgress[courseId];
            const assignments =
              student.assignments && student.assignments[courseId];
            return (
              progress &&
              progress.day1 &&
              progress.day2 &&
              progress.day3 &&
              assignments
            );
          })
        );
      case "pending":
        return (
          student.enrolledCourses &&
          student.enrolledCourses.some((courseId) => {
            const progress =
              student.trainingProgress && student.trainingProgress[courseId];
            const assignments =
              student.assignments && student.assignments[courseId];
            return (
              !progress ||
              !progress.day1 ||
              !progress.day2 ||
              !progress.day3 ||
              !assignments
            );
          })
        );
      case "shortlisted":
        return student.shortlisted;
      default:
        return true;
    }
  });

  const stats = {
    totalStudents: students.length,
    shortlistedStudents: students.filter((s) => s.shortlisted).length,
    completedStudents: students.filter(
      (s) =>
        s.enrolledCourses &&
        s.enrolledCourses.some((courseId) => {
          const progress = s.trainingProgress && s.trainingProgress[courseId];
          const assignments = s.assignments && s.assignments[courseId];
          return (
            progress &&
            progress.day1 &&
            progress.day2 &&
            progress.day3 &&
            assignments
          );
        })
    ).length,
    totalEnrollments: students.reduce(
      (acc, student) => acc + (student.enrolledCourses?.length || 0),
      0
    ),
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Admin Dashboard
          </h1>
          <p className="text-primary-100 text-lg">
            Manage students, track progress, and shortlist candidates for hiring
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-secondary-600">Total Students</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {stats.totalStudents}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-success-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-success-600" />
              </div>
              <div>
                <p className="text-secondary-600">Shortlisted</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {stats.shortlistedStudents}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-secondary-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-secondary-600" />
              </div>
              <div>
                <p className="text-secondary-600">Completed Courses</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {stats.completedStudents}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-warning-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-warning-600" />
              </div>
              <div>
                <p className="text-secondary-600">Total Enrollments</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {stats.totalEnrollments}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
                >
                  <option value="all">All Students</option>
                  <option value="completed">Completed Courses</option>
                  <option value="pending">Pending</option>
                  <option value="shortlisted">Shortlisted</option>
                </select>
              </div>
            </div>

            {/* Export Button */}
            <button
              onClick={exportShortlistedStudents}
              className="bg-success-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-success-700 transition-colors flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export Shortlisted</span>
            </button>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Enrolled Training
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Progress
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {student.name}
                        </div>
                        <div className="text-gray-600 text-sm">
                          {student.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {!student.enrolledCourses ||
                        student.enrolledCourses.length === 0 ? (
                          <span className="text-gray-500 text-sm">
                            No Training enrolled
                          </span>
                        ) : (
                          student.enrolledCourses.map((courseId) => {
                            const course = courses.find(
                              (c) => c.courseId === courseId
                            );
                            return (
                              <div key={courseId} className="text-sm">
                                <span className="text-gray-900">
                                  {course?.title || courseId}
                                </span>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {student.enrolledCourses &&
                          student.enrolledCourses.map((courseId) => {
                            const progress =
                              student.trainingProgress &&
                              student.trainingProgress[courseId];
                            const assignments =
                              student.assignments &&
                              student.assignments[courseId];
                            const course = courses.find(
                              (c) => c.courseId === courseId
                            );

                            return (
                              <div key={courseId} className="text-sm">
                                <div className="flex items-center space-x-2">
                                  <span className="text-gray-700">
                                    {course?.title || courseId}:
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    <CheckCircle
                                      className={`h-4 w-4 ${
                                        progress &&
                                        progress.day1 &&
                                        progress.day2 &&
                                        progress.day3
                                          ? "text-green-500"
                                          : "text-gray-300"
                                      }`}
                                    />
                                    <span className="text-xs text-gray-600">
                                      Training
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <FileText
                                      className={`h-4 w-4 ${
                                        assignments
                                          ? "text-green-500"
                                          : "text-gray-300"
                                      }`}
                                    />
                                    <span className="text-xs text-gray-600">
                                      Assignment
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            student.shortlisted
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {student.shortlisted
                            ? "Shortlisted"
                            : "Not Shortlisted"}
                        </div>
                        <div className="text-xs text-gray-600">
                          {getOverallCompletionStatus(student)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          handleShortlistToggle(student.id, student.shortlisted)
                        }
                        className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                          student.shortlisted
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        {student.shortlisted ? "Remove" : "Shortlist"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No students found
              </h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "No students have registered yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
