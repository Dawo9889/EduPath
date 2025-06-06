import { Link } from 'react-router-dom';
import { IoLockClosedOutline } from 'react-icons/io5';

function Unauthorized() {
  return (
    <div className="mt-[100px] flex flex-col items-center justify-center bg-primary text-secondary px-4">
      <IoLockClosedOutline className="text-6xl text-red-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">401 - Unauthorized</h1>
      <p className="text-lg mb-6 text-center max-w-md">
        You don't have permission to access this page. Please log in to continue.
      </p>
      <Link
        to="/login"
        className="px-6 py-2 rounded btn-primary transition font-medium"
      >
        Log in
      </Link>
    </div>
  );
}

export default Unauthorized;
