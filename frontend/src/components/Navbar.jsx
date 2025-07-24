import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-slate-700 via-gray-800 to-slate-900 text-white shadow-lg px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wide">
          <Link to="/">🏠 RentiFy</Link>
        </div>

        <div className="flex gap-6 items-center text-sm font-medium">
          {/* Optional static links like Home, About, etc. */}
          {/* <Link to="/" className="hover:text-green-400 transition duration-200">Home</Link> */}

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-green-400 transition duration-200"
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
                className="hover:text-green-400 transition duration-200"
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
      </div>
    </nav>
  );
};

export default Navbar;
