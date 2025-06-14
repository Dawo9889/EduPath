import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Course from "../../types/Course";
import Assignment from "../../types/Assignment";
import AssignmentTable from "../../components/assignment/AssignmentTable";
import { AnimatePresence, motion } from "framer-motion";
import AssignmentForm from "../../components/assignment/AssignmentForm";
import { getCourse, getCourseUsers } from "../../api/coursesApi";
import { getAssignmentByCourse } from "../../api/assignmentApi";

function CourseDashboard() {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course>();

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);

  const [students, setStudents] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const fetchedCourse = await getCourse(courseId);
        const fetchedCourseUsers = await getCourseUsers(courseId);
        const fetchedAssignments = await getAssignmentByCourse(courseId);

        const normalizedCourse: Course = {
          id: fetchedCourse.id,
          name: fetchedCourse.name,
          description: fetchedCourse.description,
          lecturerId: sessionStorage.getItem("userId"),
          students: fetchedCourseUsers.map((cu) => cu.userId)
        };
        const normalizedStudents: string[] = fetchedCourseUsers.map((cu) => `${cu.firstName} ${cu.lastName}`);
        const normalizedAssignments: Assignment[] = fetchedAssignments.map((a) => ({
          id: a.assignmentId,
          name: a.name,
          content: a.content,
          dateStart: a.dateStart,
          dateEnd: a.dateEnd,
        }));

        setCourse(normalizedCourse);
        setStudents(normalizedStudents);
        setAssignments(normalizedAssignments);
      } catch (error) {
        console.log("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const handleAssignmentDelete = (id: string) => {
    setAssignments(prev => prev.filter(assignment => assignment.id !== id));
  };

  const handleAssignmentSave = (newAssignment: Assignment) => {
    if (newAssignment.id) {
      setAssignments(prev => prev.map(a => a.id === newAssignment.id ? newAssignment : a));
    } else {
      setAssignments(prev => [...prev, {...newAssignment, id: Date.now().toString()}]);
    }
    setEditingAssignment(null);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-primary">{ course?.name }</h1>
      <p>{ course?.description }</p>

      <h2 className="text-2xl font-bold mb-4 mt-4 text-primary">Assignments</h2>
      <button // should be visible only for the lecturer
        onClick={() =>
          setEditingAssignment({ id: '', name: '', content: '', dateStart: '', dateEnd: '' })
        }
        className="mb-4 px-4 py-2 rounded font-medium text-[var(--text-100)] bg-[var(--bg-200)] hover:bg-[var(--bg-300)]"
        >
        Add Assignment
      </button>

      {isLoading && <p className="text-gray-500">Loading assignemnts...</p> }

      {
        !isLoading && (
          <>
            {assignments.length === 0 ? (
              <p className='text-gray-500'>No courses found. Please add a course.</p>
            ) : (
               <AssignmentTable assignments={assignments} courseId={course!.id} onEdit={setEditingAssignment} onDelete={handleAssignmentDelete} />
            )}
          </>
        )
      }

      <AnimatePresence>
        {editingAssignment && (
          <>
          <motion.div
          className="fixed inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setEditingAssignment(null)}
          />
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-start z-50"
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setEditingAssignment(null)} // Close on overlay click
          >
            <div
              className="bg-primary rounded-xl shadow-lg mt-20 w-full max-w-xl relative"
              onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
            >
                          
              <AssignmentForm assignment={editingAssignment} onSave={handleAssignmentSave} onClose={() => setEditingAssignment(null)} />
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence> 

      <h2 className="text-2xl font-bold mb-4 mt-4 text-primary">Students</h2>
      {students.map(student => (
        <div>{student}</div>
      ))}
    </div>
  )
}

export default CourseDashboard