import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Assignment from "../../types/Assignment";
import Solution from "../../types/Solution";
import SolutionTable from "../../components/SolutionTable";
import { getAssignment } from "../../api/assignmentApi";

function AssignmentDetails() {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const [assignment, setAssignment] = useState<Assignment>();

  const [solutions, setSolutions] = useState<Solution[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const fetchedAssignment = await getAssignment(assignmentId!);

        const normalizedAssignment: Assignment = {
          id: fetchedAssignment!.assignmentId,
          name: fetchedAssignment!.name,
          content: fetchedAssignment!.content,
          dateStart: fetchedAssignment!.dateStart,
          dateEnd: fetchedAssignment!.dateEnd
        };
        setAssignment(normalizedAssignment);
      } catch (error) {
        console.log("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    const initialSolutions = [
      { id: 'dummy-solution-1', studentName: 'Jan Kowalski', filePath: 'placeholder', submissionDate: Date.now().toString() },
      { id: 'dummy-solution-2', studentName: 'Jan Kowalski', filePath: 'placeholder', submissionDate: Date.now().toString() },
      { id: 'dummy-solution-3', studentName: 'Jan Kowalski', filePath: 'placeholder', submissionDate: Date.now().toString() },
    ];
    setSolutions(initialSolutions);
  }, [assignmentId]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-primary">{ assignment?.name }</h1>
      <p>{ assignment?.content }</p>

      <h2 className="text-2xl font-bold mb-4 mt-4 text-primary">Solutions</h2>

      {solutions.length === 0 ? (
        <p className="text-gray-500">No Solutions submitted yet.</p>
      ) : 
        <SolutionTable solutions={solutions} />
      }
    </div>  
  )
}

export default AssignmentDetails;