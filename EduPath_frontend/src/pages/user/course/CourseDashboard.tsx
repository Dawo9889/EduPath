import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Course from "../../../types/Course";
import Assignment from "../../../types/Assignment";
import AssignmentTable from "../../../components/assignment/AssignmentTable";
import { AnimatePresence, motion } from "framer-motion";
import AssignmentForm from "../../../components/assignment/AssignmentForm";
import { getCourse, getCourseUsers } from "../../../api/coursesApi";
import {
  AssignmentRequestData,
  createAssignment,
  deleteAssignment,
  getAssignmentByCourse,
  updateAssignment,
} from "../../../api/assignmentApi";
import { useAuth } from "../../../contexts/AuthContext";
import AssignStudentForm, {
  AssignStudentFormData,
} from "../../../components/course/AssignStudentForm";
import {
  addUserToCourse,
  removeUserFromCourse,
  UserResponseData,
} from "../../../api/userApi";
import Student from "../../../types/Student";
import StudentTable from "../../../components/course/StudentTable";
import ConfirmOperation from "../../../components/ConfirmOperation";

function CourseDashboard() {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course>();

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(
    null
  );

  const [students, setStudents] = useState<Student[]>([]);
  const [addingStudent, setAddingStudent] = useState<{
    userId: string;
    courseId: string;
  } | null>(null);
  const [removingStudent, setRemovingStudent] = useState<{
    studentId: string;
    courseId: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const { userRole, authReady, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const fetchedCourse = await getCourse(courseId!);
      const fetchedCourseUsers = await getCourseUsers(courseId!);
      const fetchedAssignments = await getAssignmentByCourse(courseId!);

      const normalizedCourse: Course = {
        id: fetchedCourse!.courseId,
        name: fetchedCourse!.name,
        description: fetchedCourse!.description,
        isPublic: fetchedCourse!.isPublic,
        ownerName: fetchedCourse!.ownerName,
        students: fetchedCourseUsers!.map((cu: UserResponseData) => cu.userId),
      };
      const normalizedStudents: Student[] = fetchedCourseUsers!.map(
        (cu: UserResponseData) => ({
          fullName: `${cu.firstName} ${cu.lastName}`,
          id: cu.userId,
        })
      );
      const normalizedAssignments: Assignment[] = fetchedAssignments!.map(
        (a) => ({
          id: a.assignmentId,
          name: a.name,
          content: a.content,
          dateStart: a.dateStart,
          dateEnd: a.dateEnd,
        })
      );

      setCourse(normalizedCourse);
      setStudents(normalizedStudents);
      setAssignments(normalizedAssignments);
    } catch (error) {
      console.log("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authReady) return;

    if (!isAuthenticated) navigate("/unauthorized");
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authReady, isAuthenticated, navigate]);

  const handleAssignmentDelete = (id: string) => {
    try {
      deleteAssignment(id);
      setAssignments((prev) =>
        prev.filter((assignment) => assignment.id !== id)
      );
    } catch (error) {
      console.log("Failed to delete assignment:", error);
    }
  };

  const handleAssignmentSave = async (newAssignment: Assignment) => {
    const assignmentData: AssignmentRequestData = {
      courseId: courseId!,
      name: newAssignment.name,
      content: newAssignment.content,
      dateStart: newAssignment.dateStart,
      dateEnd: newAssignment.dateEnd,
      visible: true,
    };

    try {
      if (newAssignment.id) {
        updateAssignment(newAssignment.id, assignmentData);
        setAssignments((prev) =>
          prev.map((a) => (a.id === newAssignment.id ? newAssignment : a))
        );
      } else {
        await createAssignment(assignmentData);
        await fetchData();
      }
    } catch (error) {
      console.error("Failed to save assignment:", error);
    } finally {
      setEditingAssignment(null);
    }
  };

  const handleAddUser = async (formData: AssignStudentFormData) => {
    try {
      await addUserToCourse(formData.courseId, formData.userId);
      await fetchData();
    } catch (error) {
      console.error("Failed to add user to course:", error);
    } finally {
      setAddingStudent(null);
    }
  };

  const handleRemoveUser = async (studentId: string, courseId: string) => {
    try {
      await removeUserFromCourse(courseId, studentId);
    } catch (error) {
      console.error("Failed to remove student from course:", error);
    }
  };

  // Handler for confirming student removal
  const handleConfirmRemoveStudent = async () => {
    if (removingStudent) {
      await handleRemoveUser(
        removingStudent.studentId,
        removingStudent.courseId
      );
      setRemovingStudent(null);
      await fetchData();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-primary">{course?.name}</h1>
      <p className="text-primary">{course?.ownerName}</p>
      <p className="text-primary">{course?.description}</p>

      <h2 className="text-2xl font-bold mb-4 mt-4 text-primary">Assignments</h2>
      {userRole === "lecturer" && (
        <button
          onClick={() =>
            setEditingAssignment({
              id: "",
              name: "",
              content: "",
              dateStart: "",
              dateEnd: "",
            })
          }
          className="mb-4 px-4 py-2 rounded font-medium text-[var(--text-100)] bg-[var(--bg-200)] hover:bg-[var(--bg-300)]"
        >
          Add Assignment
        </button>
      )}

      {isLoading && <p className="text-gray-500">Loading assignemnts...</p>}

      {!isLoading && (
        <>
          {assignments.length === 0 ? (
            <p className="text-gray-500">
              No assignments found. Please add an assignment.
            </p>
          ) : (
            <AssignmentTable
              assignments={assignments}
              courseId={course!.id}
              onEdit={setEditingAssignment}
              onDelete={handleAssignmentDelete}
            />
          )}
        </>
      )}

      <AnimatePresence>
        {editingAssignment && userRole === "lecturer" && (
          <>
            <motion.div
              className="fixed inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setEditingAssignment(null)}
            />
            <motion.div
              className="fixed top-0 left-0 w-full h-full flex justify-center items-start z-50"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setEditingAssignment(null)} // Close on overlay click
            >
              <div
                className="bg-primary rounded-xl shadow-lg mt-20 w-full max-w-xl relative"
                onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
              >
                <AssignmentForm
                  assignment={editingAssignment}
                  onSave={handleAssignmentSave}
                  onClose={() => setEditingAssignment(null)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <h2 className="text-2xl font-bold mb-4 mt-4 text-primary">Students</h2>
      {userRole === "lecturer" && (
        <button
          onClick={() =>
            setAddingStudent({
              userId: "",
              courseId: "",
            })
          }
          className="mb-4 px-4 py-2 rounded font-medium text-[var(--text-100)] bg-[var(--bg-200)] hover:bg-[var(--bg-300)]"
        >
          Add User to Course
        </button>
      )}

      <AnimatePresence>
        {addingStudent && userRole === "lecturer" && (
          <>
            <motion.div
              className="fixed inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setAddingStudent(null)}
            />
            <motion.div
              className="fixed top-0 left-0 w-full h-full flex justify-center items-start z-50"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setAddingStudent(null)} // Close on overlay click
            >
              <div
                className="bg-primary rounded-xl shadow-lg mt-20 w-full max-w-xl relative"
                onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
              >
                <AssignStudentForm
                  course={course!}
                  onSave={handleAddUser}
                  onClose={() => setAddingStudent(null)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {removingStudent && userRole === "lecturer" && (
          <>
            <motion.div
              className="fixed inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setRemovingStudent(null)}
            />
            <motion.div
              className="fixed top-0 left-0 w-full h-full flex justify-center items-start z-50"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setRemovingStudent(null)}
            >
              <div
                className="bg-primary rounded-xl shadow-lg mt-20 w-full max-w-xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <ConfirmOperation
                  message={
                    "Are you sure you want to remove this student from the course?"
                  }
                  onConfirm={handleConfirmRemoveStudent}
                  onClose={() => setRemovingStudent(null)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {isLoading && <p className="text-gray-500">Loading students...</p>}

      {!isLoading && (
        <>
          {students.length === 0 ? (
            <p className="text-gray-500">
              No students found. There are no students assigned to this course
              yet.
            </p>
          ) : (
            <StudentTable
              students={students}
              course={course!}
              onRemove={(studentId, courseId) =>
                setRemovingStudent({ studentId, courseId })
              }
            />
          )}
        </>
      )}
    </div>
  );
}

export default CourseDashboard;
