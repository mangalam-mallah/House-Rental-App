import { useState } from "react";
import { registerUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role : "Renter"
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(userData);
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />

      <select
        onChange={(e) => setUserData({ ...userData, role: e.target.value })}
        defaultValue=""
        required
      >
        <option value="" disabled>
          Select Role
        </option>
        <option value="renter">Renter</option>
        <option value="owner">Owner</option>
      </select>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
