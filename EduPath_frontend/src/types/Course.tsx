interface Course {
    id: string;
    name: string;
    description: string;
    ownerName: string;
    students: string[]; // Array of student IDs
}
export default Course;