import { useEffect, useState } from "react";
import CourseTable from "../../../components/course/CourseTable";
import CourseForm, {
  CourseFormData,
} from "../../../components/course/CourseForm";
import Course from "../../../types/Course";
import { AnimatePresence, motion } from "framer-motion";
import {
  deleteCourse,
  fetchCourses,
  CourseRequestData,
  updateCourse,
  createCourse,
  CourseResponseData,
  getCourseUsers,
  enrollCourse,
} from "../../../api/coursesApi";
import { useAuth } from "../../../contexts/AuthContext";
import EnrollForm, {
  EnrollFormData,
} from "../../../components/course/EnrollForm";
import { useNavigate } from "react-router-dom";

function ManageCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [enrollingCourse, setEnrollingCourse] = useState<Course | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const { userRole, userId, authReady, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const fetchedCourses = await fetchCourses();
      console.log("Fetched courses:", fetchedCourses);
      const coursesWithStudents: Course[] = await Promise.all(
        fetchedCourses!.map(async (c: CourseResponseData) => {
          const users = await getCourseUsers(c.courseId);
          return {
            id: c.courseId,
            name: c.name,
            description: c.description,
            isPublic: c.isPublic,
            ownerName: c.ownerName,
            students: users!.map((user: { userId: string }) => user.userId),
          };
        })
      );
      setCourses(coursesWithStudents);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch courses on load
  useEffect(() => {
    if (!authReady) return;

    if (!isAuthenticated) navigate("/unauthorized");
    fetchData();
  }, [authReady, isAuthenticated, navigate]);

  const handleCourseSave = async (
    formData: CourseFormData,
    newCourse: Course
  ) => {
    const courseData: CourseRequestData = {
      name: formData.name,
      description: formData.description,
      isPublic: formData.password === "",
      passwordPlainText: formData.password,
      ownerId: userId!,
    };

    try {
      if (newCourse.id) {
        // Update
        updateCourse(newCourse.id, courseData);
        setCourses((prev) =>
          prev.map((c) => (c.id === newCourse.id ? newCourse : c))
        );
      } else {
        // Create
        await createCourse(courseData);
        await fetchData();
      }
    } catch (error) {
      console.error("Failed to save course:", error);
    } finally {
      setEditingCourse(null); // Close the form after saving
    }
  };

  const handleCourseDelete = (id: string) => {
    try {
      deleteCourse(id);
      setCourses((prev) => prev.filter((Course) => Course.id !== id));
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  const handleCourseEnroll = async (formData: EnrollFormData) => {
    try {
      await enrollCourse(formData.id, formData.password);
      await fetchData();
    } catch (error) {
      console.error("Failed to enroll course:", error);
    } finally {
      setEnrollingCourse(null);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-primary">Manage Courses</h1>
      {userRole === "lecturer" && (
        <button
          onClick={() =>
            setEditingCourse({
              id: "",
              name: "",
              description: "",
              isPublic: true,
              ownerName: "",
              students: [],
            })
          }
          className="mb-4 px-4 py-2 rounded font-medium cursor-pointer text-[var(--text-100)] bg-[var(--bg-200)] hover:bg-[var(--bg-300)]"
        >
          Add Course
        </button>
      )}

      {isLoading && <p className="text-gray-500">Loading courses...</p>}

      {!isLoading && (
        <>
          {courses.length === 0 ? (
            <p className="text-gray-500">
              No courses found. Please add a course.
            </p>
          ) : (
            <CourseTable
              courses={courses}
              onEnroll={setEnrollingCourse}
              onEdit={setEditingCourse}
              onDelete={handleCourseDelete}
            />
          )}
        </>
      )}

      {/* Animated Popup */}
      <AnimatePresence>
        {editingCourse && userRole === "lecturer" && (
          <>
            <motion.div
              className="fixed inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="fixed top-0 left-0 w-full h-full flex justify-center items-start z-50"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="bg-primary rounded-xl shadow-lg mt-20 w-full max-w-xl relative"
                onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
              >
                <CourseForm
                  Course={editingCourse}
                  onSave={handleCourseSave}
                  onClose={() => setEditingCourse(null)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {enrollingCourse && userRole === "student" && (
          <>
            <motion.div
              className="fixed inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="fixed top-0 left-0 w-full h-full flex justify-center items-start z-50"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="bg-primary rounded-xl shadow-lg mt-20 w-full max-w-xl relative"
                onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
              >
                <EnrollForm
                  course={enrollingCourse}
                  onSave={handleCourseEnroll}
                  onClose={() => setEnrollingCourse(null)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ManageCourses;
