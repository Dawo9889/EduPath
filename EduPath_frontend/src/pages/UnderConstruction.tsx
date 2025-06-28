import { Link } from 'react-router-dom';
import { IoConstructOutline } from 'react-icons/io5';

function UnderConstruction() {
  return (
    <div className="mt-[100px] flex flex-col items-center justify-center bg-primary text-secondary px-4">
      <IoConstructOutline className="text-6xl text-yellow-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">Page Under Construction</h1>
      <p className="text-lg mb-6 text-center max-w-md">
        This page is currently being worked on. Please check back later or return to the homepage.
      </p>
      <Link
        to="/"
        className="px-6 py-2 rounded btn-primary transition font-medium"
      >
        Go Home
      </Link>
    </div>
  );
}

export default UnderConstruction;