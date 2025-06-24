import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Assignment from "../../../types/Assignment";
import { getAssignment } from "../../../api/assignmentApi";
import { useAuth } from "../../../contexts/AuthContext";
import {
  downloadAllSolutionsByAssignment,
  downloadSolution,
  fetchSolutionsByAssignment,
  fetchSolutionsByUser,
  parseFileResponse,
  SolutionRequestData,
  SolutionResponseData,
  uploadSolution,
} from "../../../api/solutionsApi";
import Solution from "../../../types/Solution";
import SolutionTable from "../../../components/assignment/SolutionTable";
import { getCourseUsers } from "../../../api/coursesApi";
import { UserResponseData } from "../../../api/userApi";
import { AnimatePresence, motion } from "framer-motion";
import UploadFileForm, { UploadFileFormData } from "../../../components/assignment/FileUploadForm";

function AssignmentDetails() {
  const { courseId, assignmentId } = useParams<{
    courseId: string;
    assignmentId: string;
  }>();
  const [assignment, setAssignment] = useState<Assignment>();

  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [uploadingSolution, setUploadingSolution] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const { userRole, userId, authReady, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const getFullName = (user: UserResponseData) =>
    `${user.firstName} ${user.lastName}`;

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
      const fetchedCourseUsers = await getCourseUsers(courseId!);

      const normalizedAssignment: Assignment = {
        id: fetchedAssignment!.assignmentId,
        name: fetchedAssignment!.name,
        content: fetchedAssignment!.content,
        dateStart: fetchedAssignment!.dateStart,
        dateEnd: fetchedAssignment!.dateEnd,
      };
      const normalizedSolutions: Solution[] = fetchedSolutions!.map((s) => ({
        id: s.id,
        studentName: getFullName(
          fetchedCourseUsers!.find((cu) => cu.userId === s.userId)!
        ),
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

  const downloadFile = (blobUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  const handleDownload = async (solutionId: string) => {
    const responseData = await downloadSolution(solutionId);
    const { blobUrl, filename } = await parseFileResponse(responseData!);
    downloadFile(blobUrl, filename);
  };

  const handleBulkDownload = async () => {
    const responseData = await downloadAllSolutionsByAssignment(assignment!.id);
    const { blobUrl, filename } = await parseFileResponse(responseData!);
    downloadFile(blobUrl, filename);
  };

  const handleSolutionUpload = async (formData: UploadFileFormData) => {
    if (!formData.file) throw "File missing";

    const solutionData: SolutionRequestData = {
      assignmentId: assignmentId!,
      courseId: courseId!,
      userId: userId!,
      filename: formData.file.name,
      file: formData.file,
      dateSubmitted: new Date(Date.now())
    };

    try {
      await uploadSolution(solutionData);
      await fetchData();
    } catch (error) {
      console.error("Failed to upload solution:", error);
    } finally {
      setUploadingSolution(false);
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-primary">
        {assignment?.name}
      </h1>
      <p className="text-primary">{assignment?.content}</p>

      <h2 className="text-2xl font-bold mb-4 mt-4 text-primary">Solutions</h2>
      {userRole === "lecturer" && (
        <button
          className="mb-4 px-4 py-2 rounded font-medium text-[var(--text-100)] bg-[var(--bg-200)] hover:bg-[var(--bg-300)]"
          onClick={handleBulkDownload}
        >
          Download All Solutions
        </button>
      )}
      {userRole === "student" && (
        <button
          className="mb-4 px-4 py-2 rounded font-medium text-[var(--text-100)] bg-[var(--bg-200)] hover:bg-[var(--bg-300)]"
          onClick={() => setUploadingSolution(true)}
        >
          Submit Solution
        </button>
      )}

      <AnimatePresence>
        {uploadingSolution && userRole === "student" && (
          <>
            <motion.div
              className="fixed inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setUploadingSolution(false)}
            />
            <motion.div
              className="fixed top-0 left-0 w-full h-full flex justify-center items-start z-50"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setUploadingSolution(false)}
            >
              <div
                className="bg-primary rounded-xl shadow-lg mt-20 w-full max-w-xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <UploadFileForm
                  message={`Submit your solution for ${assignment!.name}`}
                  onSave={handleSolutionUpload}
                  onClose={() => setUploadingSolution(false)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
