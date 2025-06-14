import { Link } from "react-router-dom";
import Assignment from "../types/Assignment";

interface Props {
  assignments: Assignment[];
  courseId: string;
  onEdit: (assignment: Assignment) => void;
  onDelete: (id: string) => void;
}

function AssignmentTable({assignments, courseId, onEdit, onDelete}: Props) {
  return (
    <table className="w-full mt-6 rounded-xl shadow-md overflow-hidden">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-2">Name</th>
          <th className="p-2">Due Date</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {assignments.map(assignment => (
          <tr key={assignment.id} className="border-t">
            <td className="p-2">{assignment.name}</td>
            <td className="p-2">{assignment.dateEnd}</td>
            <td className="p-2 space-x-2">
              <button
                className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                onClick={() => onEdit(assignment)}
              >
                Edit
              </button>

            <button
                className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
              >
                <Link to={`/lecturer/course/${courseId}/assignment/${assignment.id}`}>View Assignment</Link>
              </button>
              <button
                className="text-red-600 hover:text-red-800 hover:underline cursor-pointer"
                onClick={() => onDelete(assignment.id)}
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

export default AssignmentTable;