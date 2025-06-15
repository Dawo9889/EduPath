interface Course {
    id: string;
    name: string;
    description: string;
    // lecturerId: string;
    students: string[]; // Array of student IDs
}
export default Course;