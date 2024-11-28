import React from "react";
import { useParams } from "react-router-dom";

function Plans() {
  const { appName } = useParams();

  
  const appPlans = {
    Netflix: [
      { name: "Basic", price: "$9.99/mo", features: "1 screen, SD quality" },
      { name: "Standard", price: "$14.99/mo", features: "2 screens, HD quality" },
      { name: "Premium", price: "$19.99/mo", features: "4 screens, UHD quality" },
    ],
    Spotify: [
      { name: "Free", price: "$0/mo", features: "Ads, basic features" },
      { name: "Premium", price: "$9.99/mo", features: "No ads, offline mode" },
    ],
    Adobe: [
      { name: "Photography Plan", price: "$9.99/mo", features: "Photoshop and Lightroom" },
      { name: "All Apps", price: "$52.99/mo", features: "Access to all Adobe apps" },
    ],
  };

  const plans = appPlans[appName] || [];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-indigo-600 text-white py-6 px-8">
        <h1 className="text-3xl font-bold">{appName} Plans</h1>
      </header>
      <main className="max-w-7xl mx-auto py-12 px-8">
        {plans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold text-indigo-600">{plan.name}</h3>
                <p className="text-gray-600">{plan.price}</p>
                <p className="text-gray-500">{plan.features}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No plans available for {appName}.</p>
        )}
      </main>
    </div>
  );
}

export default Plans;
