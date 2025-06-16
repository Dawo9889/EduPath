interface Course {
    id: string;
    name: string;
    description: string;
    isPublic: boolean;
    ownerName: string;
    students: string[]; // Array of student IDs
}
export default Course;