import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // For displaying error messages (if any)
  const navigate = useNavigate();

  // Redirect user if already logged in (check if token exists in localStorage)
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      navigate("/home"); // Redirect to home if already logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your backend API to handle login
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, credentials);
      
      // Debugging: Log the response to check the structure
      console.log(response);

      // Check if the response contains the token
      if (response.data.token) {
        // Store the token in localStorage
        localStorage.setItem("userToken", response.data.token); 
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data

        navigate("/home"); // Redirect to the home page after successful login
      } else {
        // Handle invalid login attempt (e.g., if token is not returned)
        setError("Invalid login credentials or an unexpected error occurred.");
      }
    } catch (err) {
      console.error("Login error:", err.response || err);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-700 via-purple-600 to-indigo-800 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-8">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Please sign in to continue.
        </p>

        {/* Email Field */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          />
        </div>

        {/* Password Field */}
        <div className="mb-8">
          <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 font-semibold"
        >
          Sign In
        </button>

        {/* Forgot Password */}
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Forgot Password?
          </a>
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
