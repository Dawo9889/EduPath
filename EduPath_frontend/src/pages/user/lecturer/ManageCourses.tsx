import { useEffect, useState } from 'react';
import CourseTable from '../../../components/lecturer/CourseTable';
import CourseForm from '../../../components/lecturer/CourseForm';
import Course from '../../../types/Course';
import { AnimatePresence, motion } from 'framer-motion';
import { fetchCourses } from '../../../api/coursesApi';

function ManageCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  // Fetch courses on load
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const fetchedCourses = await fetchCourses();
        console.log('Fetched courses:', fetchedCourses);
        const normalizedCourses: Course[] = fetchedCourses.map((c: any) => ({
          id: c.courseId,
          name: c.name,
          description: c.description,
          lecturerId: sessionStorage.getItem("userId"),
          students: [],
        }));
        setCourses(normalizedCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCourseSave = (newCourse: Course) => {
    if (newCourse.id) {
      // Update
      setCourses(prev => prev.map(c => c.id === newCourse.id ? newCourse : c));
    } else {
      // Create
      setCourses(prev => [...prev, { ...newCourse, id: Date.now().toString() }]); // Temp ID, replace with real
    }
    setEditingCourse(null); // Close the form after saving
  };

  const handleCourseDelete = (id: string) => {
    setCourses(prev => prev.filter(Course => Course.id !== id));
  };


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-primary">Manage Courses</h1>
      <button
        onClick={() =>
          setEditingCourse({ id: '', name: '', description: '', lecturerId: '', students: [] })
        }
        className="mb-4 px-4 py-2 rounded font-medium cursor-pointer text-[var(--text-100)] bg-[var(--bg-200)] hover:bg-[var(--bg-300)]"
        >
        Add Course
      </button>

      {isLoading && <p className="text-gray-500">Loading courses...</p> }

      {
        !isLoading && (
          <>
            {courses.length === 0 ? (
              <p className='text-gray-500'>No courses found. Please add a course.</p>
            ) : (
              <CourseTable Courses={courses} onEdit={setEditingCourse} onDelete={handleCourseDelete} />
            )}
          </>
        )
      }
      
      {/* Animated Popup */}  
      <AnimatePresence>
        {editingCourse && (
          <>
          <motion.div
          className="fixed inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          />
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-start z-50"
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="bg-primary rounded-xl shadow-lg mt-20 w-full max-w-xl relative"
              onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
            >
                          
              <CourseForm Course={editingCourse} onSave={handleCourseSave} onClose={() => setEditingCourse(null)} />
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence> 
    </div>
  );
}

export default ManageCourses;
