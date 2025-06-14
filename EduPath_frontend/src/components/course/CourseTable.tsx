import { useState } from "react";
import Course from "../../types/Course";
import UserRole from "../../types/UserRole";

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

  const viewCoursePage = (CourseId: string) => {
    // Redirect to the course page
    window.location.href = `/lecturer/course/${CourseId}`;
  }

  return (
    <table className="w-full min-w-[800px] rounded-xl shadow-md overflow-hidden text-primary">
      <thead>
        <tr className="bg-tertiary text-left">
          <th className="p-2">Name</th>
          {/* <th className="p-2">{userRole==='lecturer' ? "Active students" : "Lecturer"}</th> */}
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {Courses.map(Course => (
          <tr key={Course.id} className="border-t bg-secondary">
            <td className="p-2 font-medium">{Course.name}</td>
            {/* <td className="p-2 font-medium">{userRole==='lecturer' ? Course.students.length : fetchLecturerName(Course.lecturerId)}</td> */}
            <td className="p-2 space-x-2 font-light">
              <button
                className="btn-secondary cursor-pointer w-[30%] px-2 py-1 rounded mr-[3%]"
                onClick={() => viewCoursePage(Course.id)}
              >
                View
              </button>
            <button
                  className="btn-primary text-white w-[30%] px-2 py-1 rounded mr-[3%]"
                  onClick={() => onEdit(Course)}
                >
                  Edit
                </button>
                <button
                  className="btn-danger text-white w-[30%] px-2 py-1 rounded"
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
