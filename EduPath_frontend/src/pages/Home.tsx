
function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 text-primary">
      <h1 className="text-4xl font-bold text-center">Welcome to EduPath</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-2">A Collaborative Platform for Teachers and Students</h2>
        <p>
          EduPath is a modern system designed to streamline the management of educational tasks, projects, and resources for both teachers and students. It provides a secure and organized environment where educators can create personalized repositories for their courses and invite students to participate.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">What is EduPath?</h2>
        <p>
          EduPath serves as a dedicated platform for sharing files, submitting assignments, and managing course activities. Each course is represented as a separate repository managed by the teacher, who can customize access, tasks, and deadlines. Students join these repositories upon invitation and approval, gaining the ability to upload their work and collaborate efficiently.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Account System:</strong> Users can register and log in to the platform.</li>
          <li><strong>Role Management:</strong> Two user types - Teacher and Student.</li>
          <li><strong>Course Repositories:</strong> Teachers can create, edit, and delete repositories.</li>
          <li><strong>Controlled Enrollment:</strong> Students join repositories only after approval by the teacher.</li>
          <li><strong>Task Assignment:</strong> Teachers post assignments with clear descriptions and deadlines.</li>
          <li><strong>Secure Submissions:</strong> Students upload their work to the repository securely.</li>
          <li><strong>Private Access:</strong> Only the teacher can view submissions and track progress.</li>
          <li><strong>Deadline Alerts:</strong> The system notifies teachers when students miss submission deadlines.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Why Choose EduPath?</h2>
        <p>
          EduPath enhances educational collaboration by simplifying task distribution and submission. With a focus on transparency, accountability, and ease of use, it's the perfect solution for modern classrooms—whether online or on campus.
        </p>
      </section>
    </div>
  );
};


export default Home