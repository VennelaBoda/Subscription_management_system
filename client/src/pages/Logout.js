
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    
    localStorage.clear(); 
  }, []);

  const handleLoginRedirect = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">You have been logged out.</h1>
      <p className="text-gray-600 mb-8">
        Thank you for using our service. We hope to see you again soon!
      </p>
      <button
        onClick={handleLoginRedirect}
        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        Back to Login
      </button>
    </div>
  );
}

export default Logout;
