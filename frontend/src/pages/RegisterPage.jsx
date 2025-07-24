import { useState } from "react";
import { registerUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "renter",
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // ✅ Success state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(userData);
      setSuccess(true); // Show success popup
      setTimeout(() => {
        setSuccess(false);
        navigate("/login");
      }, 2000); // Navigate after 2 seconds
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 px-4 relative">
      {/* ✅ Success Popup */}
      {success && (
        <div className="absolute top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce z-50">
          ✅ Registered Successfully!
        </div>
      )}

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-purple-300">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-purple-600 tracking-tight">
          Create Your Account 📝
        </h2>

        {error && (
          <p className="mb-4 text-center text-red-600 font-semibold">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              placeholder="John Doe"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 outline-none transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 outline-none transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 outline-none transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
            <select
              value={userData.role}
              onChange={(e) => setUserData({ ...userData, role: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 outline-none transition duration-200 bg-white"
            >
              <option value="renter">Renter</option>
              <option value="owner">Owner</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-md shadow-md transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-purple-600 font-semibold hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
