import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", credentials);
      
      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to home page or dashboard after successful registration
      navigate("/home");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-700 via-purple-600 to-indigo-800 min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-8">Sign Up</h2>
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={credentials.name}
            onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-8">
          <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg">Sign Up</button>

        {/* Login link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Login here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
