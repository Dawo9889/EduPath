import { useEffect, useState } from "react";
import Course from "../../../types/Course";
import CourseTable from "../../../components/course/CourseTable";
import { CourseResponseData, enrollCourse, fetchCourses, getCourseUsers } from "../../../api/coursesApi";

function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const fetchedCourses = await fetchCourses();
      // console.log("Fetched courses:", fetchedCourses);
      const coursesWithStudents = await Promise.all(
        fetchedCourses!.map(async (c: CourseResponseData) => {
          const users = await getCourseUsers(c.courseId);
          return {
            id: c.courseId,
            name: c.name,
            description: c.description,
            // lecturerId: authInfo.userId!, // Uncomment if needed
            students: users.map((user: { userId: string }) => user.userId),
          };
        })
      );
      setCourses(coursesWithStudents);
      // console.log(coursesWithStudents);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCourseEnroll = async (courseId: string) => {
    try {
      enrollCourse(courseId);
      fetchData();
    } catch (error) {
      console.error("Failed to join course:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-primary">Available courses</h1>

      {isLoading && <p className="text-gray-500">Loading courses...</p>}

      {!isLoading && (
        <>
          {courses.length === 0 ? (
            <p className="text-gray-500">
              No courses found. Please add a course.
            </p>
          ) : (
            <CourseTable courses={courses} onEnroll={handleCourseEnroll} />
          )}
        </>
      )}
    </div>
  );
}

export default MyCourses;
