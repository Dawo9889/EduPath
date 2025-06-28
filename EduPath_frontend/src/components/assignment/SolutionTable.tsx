import { useAuth } from "../../contexts/AuthContext";
import Solution from "../../types/Solution";

interface SolutionTableProps {
  solutions: Solution[];
  onDownload: (solutionId: string) => void;
  onGrade: (solutionId: string) => void;
}

const FILENAME_PATTERN = /[^\\]+(?=$)/g;

function SolutionTable({ solutions, onDownload, onGrade }: SolutionTableProps) {
  const { userRole } = useAuth();

  return (
    <table className="w-full min-w-[800px] rounded-xl shadow-md overflow-hidden text-primary">
      <thead>
        <tr className="bg-tertiary text-left">
          <th className="p-2">Student</th>
          <th className="p-2">Grade</th>
          <th className="p-2">File name</th>
          <th className="p-2">Submission Date</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {solutions.map((solution) => (
          <tr key={solution.id} className="border-t bg-secondary">
            <td className="p-2 font-medium">{solution.studentName}</td>
            <td className="p-2 font-medium">
              {solution.grade == 0 ? "Not graded" : solution.grade}
            </td>
            <td className="p-2 font-medium">
              {(solution.filePath.match(FILENAME_PATTERN) ?? ["undefined"])[0]}
            </td>
            <td className="p-2 font-medium">
              {new Date(solution.submissionDate).toLocaleDateString()}
            </td>
            <td className="p-2 space-x-2 font-light">
              <button
                className={`btn-secondary text-white w-[${userRole === "lecturer" ? "50" : "80"}%] px-2 py-1 rounded`}
                onClick={() => onDownload(solution.id)}
              >
                Download
              </button>
              {userRole === "lecturer" && (
                <button
                  className="btn-primary text-white w-[30%] px-2 py-1 rounded"
                  onClick={() => onGrade(solution.id)}
                >
                  Grade
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SolutionTable;
