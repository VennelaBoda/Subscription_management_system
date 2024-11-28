import React, { useState, useEffect } from "react"; 
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa"; // Using Font Awesome icon for profile

function Home() {
  const [user, setUser] = useState({});
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token exists, redirect to login page
      navigate("/login");
      return;
    }
    // Fetch user profile data
    fetch("/api/auth/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include JWT token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        } else {
          console.error("Error fetching profile data:", data.message);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        navigate("/login");
      });
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-indigo-600 text-white py-6 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold">Welcome to SubTrackPro</h1>
          <nav className="space-x-6 flex items-center">
            <Link to="/dashboard" className="hover:text-gray-200">
              Dashboard
            </Link>
            <Link to="/subscription" className="hover:text-gray-200">
              Subscriptions
            </Link>
            <Link to="/support" className="hover:text-gray-200">
              Support
            </Link>
            
            {/* Profile Icon */}
            <div className="relative">
              <button onClick={toggleDropdown}>
                <FaUserCircle className="text-white text-3xl" />
              </button>
              {/* Dropdown menu */}
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <div className="p-4">
                    <div>
                      <strong>Name:</strong> {user.name || "Name not available"}
                    </div>
                    <div>
                      <strong>Email:</strong> {user.email || "Email not available"}
                    </div>
                  </div>
                  <div className="p-4">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200 rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-8">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Explore Subscription Apps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{ name: "Netflix", icon: "🎥", description: "Stream your favorite movies and shows." },
              { name: "Spotify", icon: "🎵", description: "Listen to millions of songs and podcasts." },
              { name: "Adobe Creative Cloud", icon: "🎨", description: "Design, edit, and create professionally." },
            ].map((app) => (
              <div key={app.name} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-4">{app.icon}</div>
                <h3 className="text-xl font-semibold">{app.name}</h3>
                <p className="text-gray-600">{app.description}</p>
                <Link
                  to={`/plans/${app.name}`}
                  className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 inline-block"
                >
                  View Plans
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Popular Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{ name: "Basic", price: "$9.99/mo", features: "Streaming, 1 screen, SD quality" },
              { name: "Standard", price: "$14.99/mo", features: "Streaming, 2 screens, HD quality" },
              { name: "Premium", price: "$19.99/mo", features: "Streaming, 4 screens, UHD quality" },
            ].map((plan) => (
              <div key={plan.name} className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold text-indigo-600">{plan.name}</h3>
                <p className="text-gray-600">{plan.price}</p>
                <p className="text-gray-500">{plan.features}</p>
                <Link
                  to={`/subscribe/${plan.name}`}
                  className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 inline-block"
                >
                  Subscribe Now
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Why Choose SubTrackPro?</h2>
          <ul className="list-disc list-inside space-y-4 text-gray-600">
            <li>Track all your subscriptions in one place.</li>
            <li>Get renewal alerts and avoid interruptions.</li>
            <li>Seamless subscription management and secure payments.</li>
          </ul>
        </section>

        <section id="testimonials" className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{ user: "SUMAYA SHAIK", feedback: "SubTrackPro made managing my subscriptions so easy!" },
              { user: "VENNELA", feedback: "I love the renewal alerts—no more missed payments!" },
            ].map((testimonial) => (
              <div key={testimonial.user} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-800 italic">"{testimonial.feedback}"</p>
                <p className="text-right text-gray-600">- {testimonial.user}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-gray-400 py-6">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 SubTrackPro. All rights reserved.</p>
          <div className="mt-4 space-x-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
          <div className="mt-4">
            <a href="#" className="text-gray-400 hover:text-white mx-2">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white mx-2">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white mx-2">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
