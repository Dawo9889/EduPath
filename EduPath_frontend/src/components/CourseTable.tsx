import { useState } from "react";
import Course from "../types/Course";
import UserRole from "../types/UserRole";

interface Props {
  Courses: Course[];
  onEdit: (Course: Course) => void;
  onDelete: (id: string) => void;
}

function CourseTable({ Courses, onEdit, onDelete }: Props) {

  const [userRole, setUserRole] = useState<UserRole | null>('lecturer');

  const fetchLecturerName = (lecturerId: string) => {
    // Fetch lecturer name from the server or state management
    // This is a placeholder, replace with actual fetching logic
    return "John Doe"; // Replace with actual lecturer name
  }

  const viewCourseTasks = (CourseId: string) => {
    // Redirect to the course tasks page
    window.location.href = `/lecturer/course/${CourseId}`;
  }

  return (
    <table className="w-full mt-6 rounded-xl shadow-md overflow-hidden">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-2">Name</th>
          <th className="p-2">{userRole==='lecturer' ? "Active students" : "Lecturer"}</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {Courses.map(Course => (
          <tr key={Course.id} className="border-t">
            <td className="p-2">{Course.name}</td>
            <td className="p-2">{userRole==='lecturer' ? Course.students.length : fetchLecturerName(Course.lecturerId)}</td>
            <td className="p-2 space-x-2">
              <button
                className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                onClick={() => onEdit(Course)}
              >
                Edit
              </button>
            <button
                className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                onClick={() => viewCourseTasks(Course.id)}
              >
                View Tasks
              </button>
              <button
                className="text-red-600 hover:text-red-800 hover:underline cursor-pointer"
                onClick={() => onDelete(Course.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CourseTable;
