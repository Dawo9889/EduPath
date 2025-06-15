import Course from "../../types/Course";
import { useAuth } from "../../contexts/AuthContext";

interface Props {
  courses: Course[];
  onEdit?: (Course: Course) => void;
  onDelete?: (id: string) => void;
  onEnroll?: (id: string) => void;
}

function CourseTable({ courses: courses, onEdit, onDelete, onEnroll }: Props) {
  const fetchLecturerName = () => {
    // Fetch lecturer name from the server or state management
    // This is a placeholder, replace with actual fetching logic
    return "John Doe"; // Replace with actual lecturer name
  };

  const authInfo = useAuth();

  const viewCoursePage = (courseId: string) => {
    // Redirect to the course page
    window.location.href = `/student/course/${courseId}`;
  };

  return (
    <table className="w-full min-w-[800px] rounded-xl shadow-md overflow-hidden text-primary">
      <thead>
        <tr className="bg-tertiary text-left">
          <th className="p-2">Name</th>
          <th className="p-2">
            {authInfo.userRole === "lecturer" ? "Active students" : "Lecturer"}
          </th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <tr key={course.id} className="border-t bg-secondary">
            <td className="p-2 font-medium">{course.name}</td>
            <td className="p-2 font-medium">
              {authInfo.userRole === "lecturer"
                ? course.students.length
                : fetchLecturerName()}
            </td>
            {authInfo.userRole === "lecturer" ? (
              <td className="p-2 space-x-2 font-light">
                <button
                  className="btn-secondary cursor-pointer w-[30%] px-2 py-1 rounded mr-[3%]"
                  onClick={() => viewCoursePage(course.id)}
                >
                  View
                </button>
                <button
                  className="btn-primary text-white w-[30%] px-2 py-1 rounded mr-[3%]"
                  onClick={() => onEdit!(course)}
                >
                  Edit
                </button>
                <button
                  className="btn-danger text-white w-[30%] px-2 py-1 rounded"
                  onClick={() => onDelete!(course.id)}
                >
                  Delete
                </button>
              </td>
            ) : (
              <td className="p-2 space-x-2 font-light">
                {course.students.includes(authInfo.userId!) ? (
                  <button
                    className="btn-secondary cursor-pointer w-[60%] px-2 py-1 rounded mr-[3%]"
                    onClick={() => viewCoursePage(course.id)}
                  >
                    View
                  </button>
                ) : (
                  <button
                    className="btn-primary text-white w-[60%] px-2 py-1 rounded mr-[3%]"
                    onClick={() => onEnroll!(course.id)}
                  >
                    Enroll
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CourseTable;
