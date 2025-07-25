import { useState } from "react";
import { registerUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "renter",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(userData);
      toast.success("Registered Successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      toast.error("Registration failed. Try again.");
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-4">
      <ToastContainer />
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-300 animate-fade-in">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-purple-600 tracking-tight">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <input
              id="name"
              type="text"
              required
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              className="peer w-full px-4 pt-5 pb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-200"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-600"
            >
              Full Name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              id="email"
              type="email"
              required
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="peer w-full px-4 pt-5 pb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-200"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-600"
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              className="peer w-full px-4 pt-5 pb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-200"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-600"
            >
              Password
            </label>
            <div
              className="absolute top-3 right-3 text-gray-600 hover:text-purple-600 cursor-pointer"
              onClick={togglePassword}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          {/* Role Selection */}
          <div className="relative">
            <select
              value={userData.role}
              onChange={(e) =>
                setUserData({ ...userData, role: e.target.value })
              }
              required
              className="w-full px-4 pt-5 pb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white transition duration-200"
            >
              <option value="renter">🏡 Renter</option>
              <option value="owner">🧑‍💼 Owner</option>
            </select>
            <label className="absolute left-4 top-2 text-sm text-gray-500">
              Select Role
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-md shadow-lg transition duration-300 transform hover:scale-105"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-purple-600 font-semibold hover:underline"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
