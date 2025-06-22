import Solution from "../../types/Solution";

interface SolutionTableProps {
  solutions: Solution[];
  onDownload: (solutionId: string) => void;
}

function SolutionTable({
  solutions,
  onDownload,
}: SolutionTableProps) {
  return (
    <table className="w-full min-w-[800px] rounded-xl shadow-md overflow-hidden text-primary">
      <thead>
        <tr className="bg-tertiary text-left">
          <th className="p-2">Student</th>
          <th className="p-2">Submission Date</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {solutions.map((solution) => (
          <tr key={solution.id} className="border-t bg-secondary">
            <td className="p-2 font-medium">{solution.studentName}</td>
            <td className="p-2 font-medium">{new Date(solution.submissionDate).toLocaleDateString()}</td>
            <td className="p-2 space-x-2 font-light">
              <button
                className="btn-primary text-white w-[50%] px-2 py-1 rounded"
                onClick={() => onDownload(solution.id)}
              >
                Download
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SolutionTable;
