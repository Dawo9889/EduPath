import Course from "../../types/Course";
import { useAuth } from "../../contexts/AuthContext";
import { IoLockClosed, IoLockOpen } from "react-icons/io5";

interface Props {
  courses: Course[];
  onEdit: (Course: Course) => void;
  onDelete: (id: string) => void;
  onEnroll: (course: Course) => void;
}

function CourseTable({ courses: courses, onEdit, onDelete, onEnroll }: Props) {
  const { userId, userRole } = useAuth();

  const viewCoursePage = (courseId: string) => {
    // Redirect to the course page
    window.location.href = `/${userRole}/course/${courseId}`;
  };

  return (
    <table className="w-full min-w-[800px] rounded-xl shadow-md overflow-hidden text-primary">
      <thead>
        <tr className="bg-tertiary text-left">
          <th className="p-2">Name</th>
          <th className="p-2">
            {userRole === "lecturer" ? "Active students" : "Lecturer"}
          </th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <tr key={course.id} className="border-t bg-secondary">
            <td className="p-2 font-medium">
              {course.isPublic ? (
                <IoLockOpen className="text-3xl text-gray-600 inline pr-2 pr-2" />
              ) : (
                <IoLockClosed className="text-3xl text-gray-600 inline pr-2 pr-2" />
              )}{course.name}
            </td>
            <td className="p-2 font-medium">
              {userRole === "lecturer"
                ? course.students.length
                : course.ownerName}
            </td>
            {userRole === "lecturer" ? (
              <td className="p-2 space-x-2 font-light">
                <button
                  className="btn-secondary cursor-pointer w-[30%] px-2 py-1 rounded mr-[3%]"
                  onClick={() => viewCoursePage(course.id)}
                >
                  View
                </button>
                <button
                  className="btn-primary text-white w-[30%] px-2 py-1 rounded mr-[3%]"
                  onClick={() => onEdit(course)}
                >
                  Edit
                </button>
                <button
                  className="btn-danger text-white w-[30%] px-2 py-1 rounded"
                  onClick={() => onDelete(course.id)}
                >
                  Delete
                </button>
              </td>
            ) : (
              <td className="p-2 space-x-2 font-light">
                {course.students.includes(userId!) ? (
                  <button
                    className="btn-secondary cursor-pointer w-[60%] px-2 py-1 rounded mr-[3%]"
                    onClick={() => viewCoursePage(course.id)}
                  >
                    View
                  </button>
                ) : (
                  <button
                    className="btn-primary text-white w-[60%] px-2 py-1 rounded mr-[3%]"
                    onClick={() => onEnroll(course)}
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
