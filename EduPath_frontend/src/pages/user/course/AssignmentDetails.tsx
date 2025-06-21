import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Assignment from "../../../types/Assignment";
import { getAssignment } from "../../../api/assignmentApi";
import { useAuth } from "../../../contexts/AuthContext";
import {
  fetchSolutionsByAssignment,
  fetchSolutionsByUser,
  SolutionResponseData,
} from "../../../api/solutionsApi";
import Solution from "../../../types/Solution";
import SolutionTable from "../../../components/course/SolutionTable";

function AssignmentDetails() {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const [assignment, setAssignment] = useState<Assignment>();

  const [solutions, setSolutions] = useState<Solution[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const { userRole, userId, authReady, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const fetchedAssignment = await getAssignment(assignmentId!);
      const fetchedSolutions =
        userRole === "student"
          ? await fetchSolutionsByUser(userId!).then(
              (res: SolutionResponseData[] | undefined) =>
                (res ?? []).filter((s) => s.assignmentId === assignmentId)
            )
          : await fetchSolutionsByAssignment(assignmentId!);

      const normalizedAssignment: Assignment = {
        id: fetchedAssignment!.assignmentId,
        name: fetchedAssignment!.name,
        content: fetchedAssignment!.content,
        dateStart: fetchedAssignment!.dateStart,
        dateEnd: fetchedAssignment!.dateEnd,
      };
      const normalizedSolutions: Solution[] = fetchedSolutions!.map((s) => ({
        id: s.id,
        studentName: s.userId,
        filePath: s.filepath,
        submissionDate: s.dateSubmitted,
      }));

      setAssignment(normalizedAssignment);
      setSolutions(normalizedSolutions);
    } catch (error) {
      console.log("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authReady) return;

    if (!isAuthenticated) navigate("/unauthorized");
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authReady, isAuthenticated, navigate]);

  const handleDownload = async (solutionId: string) => {
    console.log(solutionId);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-primary">
        {assignment?.name}
      </h1>
      <p className="text-primary">{assignment?.content}</p>

      <h2 className="text-2xl font-bold mb-4 mt-4 text-primary">Solutions</h2>
      {userRole === "lecturer" && (
        <button className="mb-4 px-4 py-2 rounded font-medium text-[var(--text-100)] bg-[var(--bg-200)] hover:bg-[var(--bg-300)]">
          Download All Solutions
        </button>
      )}
      {userRole === "student" && (
        <button className="mb-4 px-4 py-2 rounded font-medium text-[var(--text-100)] bg-[var(--bg-200)] hover:bg-[var(--bg-300)]">
          Submit Solution
        </button>
      )}

      {isLoading && <p className="text-gray-500">Loading solutions...</p>}

      {!isLoading && (
        <>
          {solutions.length === 0 ? (
            <p className="text-gray-500">
              No solutions were found. No solutions were submitted yet.
            </p>
          ) : (
            <SolutionTable solutions={solutions} onDownload={handleDownload} />
          )}
        </>
      )}
    </div>
  );
}

export default AssignmentDetails;
