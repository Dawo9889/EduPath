import { useAuth } from "../../contexts/AuthContext";
import Assignment from "../../types/Assignment";

interface Props {
  assignments: Assignment[];
  courseId: string;
  onEdit: (assignment: Assignment) => void;
  onDelete: (id: string) => void;
}

function AssignmentTable({ assignments, courseId, onEdit, onDelete }: Props) {
  const authInfo = useAuth();

  const viewAssignmentPage = (assignmentId: string) => {
    window.location.href = `/${authInfo.userRole}/course/${courseId}/assignment/${assignmentId}`;
  };

  return (
    <table className="w-full min-w-[800px] rounded-xl shadow-md overflow-hidden text-primary">
      <thead>
        <tr className="bg-tertiary text-left">
          <th className="p-2">Name</th>
          <th className="p-2">Due Date</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {assignments.map((assignment) => (
          <tr key={assignment.id} className="border-t bg-secondary">
            <td className="p-2 font-medium">{assignment.name}</td>
            <td className="p-2 font-medium">
              {new Date(assignment.dateEnd).toLocaleDateString()}
            </td>
            {authInfo.userRole === "lecturer" ? (
              <td className="p-2 space-x-2 font-light">
                <button
                  className="btn-secondary cursor-pointer w-[30%] px-2 py-1 rounded mr-[3%]"
                  onClick={() => viewAssignmentPage(assignment.id)}
                >
                  View
                </button>
                <button
                  className="btn-primary text-white w-[30%] px-2 py-1 rounded mr-[3%]"
                  onClick={() => onEdit(assignment)}
                >
                  Edit
                </button>
                <button
                  className="btn-danger text-white w-[30%] px-2 py-1 rounded"
                  onClick={() => onDelete(assignment.id)}
                >
                  Delete
                </button>
              </td>
            ) : (
              <td className="p-2 space-x-2 font-light">
                <button
                  className="btn-secondary cursor-pointer w-[30%] px-2 py-1 rounded mr-[3%]"
                  onClick={() => viewAssignmentPage(assignment.id)}
                >
                  View
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AssignmentTable;
