import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubscriptions } from "../services/apiService"; // Ensure the API service file is correctly set up

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch subscriptions on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSubscriptions(); // Fetch subscriptions from API
        setSubscriptions(data);
      } catch (err) {
        setError("Failed to fetch subscriptions");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading subscriptions...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900">Your Subscriptions</h1>
          <p className="text-lg text-gray-600">Manage and view your subscriptions below.</p>
        </header>

        {/* Subscription List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.length > 0 ? (
            subscriptions.map((subscription) => (
              <div
                key={subscription.id}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {subscription.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Status: <span className="font-semibold">{subscription.status}</span>
                </p>
                <p className="text-lg font-semibold text-green-600">{`$${subscription.price}`}</p>
                <p className="text-sm text-gray-500">{`Next renewal: ${subscription.renewalDate}`}</p>
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => console.log(`Edit subscription: ${subscription.id}`)}
                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => console.log(`Cancel subscription: ${subscription.id}`)}
                    className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No subscriptions found.</div>
          )}
        </div>

        {/* Add Subscription */}
        <div className="text-center mt-8">
          <Link
            to="/subscription/new"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add New Subscription
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
