import React from "react";
import { useParams, Link } from "react-router-dom";

function SubscribePage() {
  const { planName } = useParams();

  
  const normalizedPlanName =
    planName.charAt(0).toUpperCase() + planName.slice(1).toLowerCase();

  
  const plans = {
    Basic: {
      price: "$9.99/mo",
      features: "Streaming, 1 screen, SD quality",
      terms: "Monthly billing, cancel anytime.",
    },
    Standard: {
      price: "$14.99/mo",
      features: "Streaming, 2 screens, HD quality",
      terms: "Monthly billing, cancel anytime.",
    },
    Premium: {
      price: "$19.99/mo",
      features: "Streaming, 4 screens, UHD quality",
      terms: "Monthly billing, cancel anytime.",
    },
  };

  const planDetails = plans[normalizedPlanName] || {
    price: "N/A",
    features: "Details not available.",
    terms: "Please choose a valid plan.",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">You're Subscribing to {normalizedPlanName}</h1>
        <p className="text-gray-600 mb-2">
          <strong>Price:</strong> {planDetails.price}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Features:</strong> {planDetails.features}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Terms:</strong> {planDetails.terms}
        </p>
        <div className="flex space-x-4 justify-center">
          <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700">
            Proceed to Payment
          </button>
          <Link
            to="/"
            className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SubscribePage;
