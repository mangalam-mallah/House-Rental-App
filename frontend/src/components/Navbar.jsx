import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-green-700">
        <Link to="/">🏠 RENTIFY</Link>
      </div>

      <div className="flex gap-4 items-center">
        {/* <Link to="/properties" className="text-sm text-blue-600 hover:underline">
          Browse Properties
        </Link> */}

        {user ? (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-green-700 transition font-medium"
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-green-700 transition font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
