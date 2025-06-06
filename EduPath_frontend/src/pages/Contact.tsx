function Contact() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 text-primary">
      <h1 className="text-4xl font-bold text-center">Contact Us</h1>
      <p className="text-center text-secondary">
        We'd love to hear from you. Whether you have a question, feedback, or need support — feel free to reach out.
      </p>

      <div className="bg-secondary shadow-md rounded-xl p-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Email</h2>
          <p>contact@edupath.quest</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Phone</h2>
          <p>+1 (555) 123-4567</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Office Hours</h2>
          <p>Monday – Friday: 9:00 AM – 5:00 PM (CET)</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Address</h2>
          <p>EduPath HQ<br />123 Learning Street<br />Warsaw, Poland</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Send us a message</h2>
        <form className="space-y-4" method="mail" action="mailto:contact@edupath.quest">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-md p-3"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded-md p-3"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="w-full border border-gray-300 rounded-md p-3"
          />
          <button
            type="submit"
            className="btn-primary text-white px-6 py-2 rounded-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact