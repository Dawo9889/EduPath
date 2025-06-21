import { useAuth } from "../../contexts/AuthContext";
import Course from "../../types/Course";
import Student from "../../types/Student";

interface StudentTableProps {
  students: Student[];
  course: Course;
  onRemove: (studentId: string, courseId: string) => void;
}

function StudentTable({ students, course, onRemove }: StudentTableProps) {
  const { userRole } = useAuth();

  return (
    <table className="w-full min-w-[800px] rounded-xl shadow-md overflow-hidden text-primary">
      <thead>
        <tr className="bg-tertiary text-left">
          <th className="p-2">Name</th>
          {userRole === "lecturer" && <th className="p-2">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id} className="border-t bg-secondary">
            <td className="p-2 font-medium">
              {student.fullName}
            </td>
            {userRole === "lecturer" && (
              <td className="p-2 space-x-2 font-light">
                <button
                  className="btn-danger text-white w-[30%] px-2 py-1 rounded"
                  onClick={() => onRemove(student.id, course.id)}
                >
                  Remove
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;
