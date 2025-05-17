import Solution from "../types/Solution";

interface Props {
  solutions: Solution[];
}

function SolutionTable({solutions}: Props) {
  return (
    <table className="w-full mt-6 rounded-xl shadow-md overflow-hidden">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-2">Student</th>
          <th className="p-2">Submission Date</th>
          <th className="p-2">File</th>
        </tr>
      </thead>
      <tbody>
        {solutions.map(solution => (
          <tr key={solution.id} className="border-t">
            <td className="p-2">{solution.studentName}</td>
            <td className="p-2">{solution.submissionDate}</td>
            <td className="p-2 space-x-2">
              <button
                className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
              >
                Download Solution
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SolutionTable;