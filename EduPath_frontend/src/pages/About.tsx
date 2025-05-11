
function About() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 text-primary font-light">
      <h1 className="text-4xl font-bold text-center">About EduPath</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Empowering Education Through Smart Collaboration</h2>
        <p>
          EduPath was created with a simple yet powerful goal: to enhance how teachers and students work together in the digital age. Whether in a classroom or an online environment, our platform helps streamline course management, task assignments, and project collaboration.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p>
          To provide an intuitive and secure platform that supports effective communication, organization, and accountability between educators and students.
        </p>
        <p>
          We believe that education thrives when learning is structured, resources are easily accessible, and both students and teachers have tools that simplify their responsibilities.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Who Is EduPath For?</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Teachers</strong> who want a clear and organized system for distributing assignments, managing deadlines, and tracking student progress.
          </li>
          <li>
            <strong>Students</strong> who need a reliable way to access course materials, submit tasks, and stay informed about their responsibilities.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">What Makes EduPath Unique?</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Role-Based Access:</strong> Two clear roles—Teacher and Student—with specific capabilities tailored to their needs.</li>
          <li><strong>Course Repositories:</strong> Each teacher can create a dedicated workspace for their course, managing tasks and student participation from one place.</li>
          <li><strong>Secure File Handling:</strong> All submissions are safely stored, ensuring privacy and data protection.</li>
          <li><strong>Deadline Reminders:</strong> Automated alerts keep teachers informed when assignments are overdue.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
        <p>
          To become a trusted digital partner in education by continuously improving the tools that support teaching and learning, making education more accessible, organized, and impactful.
        </p>
      </section>
    </div>
  );
};

export default About