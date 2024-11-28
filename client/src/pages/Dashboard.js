import { Link } from 'react-router-dom';

function Dashboard() {
  const activities = [
    { action: "Added", description: "Netflix subscription", time: "2 hours ago", type: "New" },
    { action: "Updated", description: "Spotify payment method", time: "1 day ago", type: "Updated" },
    { action: "Canceled", description: "Hulu subscription", time: "3 days ago", type: "Canceled" },
    { action: "Renewed", description: "Disney+ subscription", time: "1 week ago", type: "Updated" },
    { action: "Added", description: "Amazon Prime subscription", time: "2 weeks ago", type: "New" },
  ];
  

  const upcomingPayments = [
    { date: "Nov 15, 2024", subscription: "Netflix", amount: "15.99", status: "Due Soon" },
    { date: "Nov 20, 2024", subscription: "Spotify", amount: "9.99", status: "Due Soon" },
    { date: "Dec 01, 2024", subscription: "Amazon Prime", amount: "12.99", status: "Paid" },
    { date: "Dec 10, 2024", subscription: "Disney+", amount: "7.99", status: "Due Soon" },
    { date: "Dec 15, 2024", subscription: "Hulu", amount: "11.99", status: "Paid" },
  ];
  
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-blue-900">Dashboard</h1>
          <p className="text-lg text-gray-500">Welcome to your dashboard. Manage your subscriptions and settings here.</p>
        </header>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800">Active Subscriptions</h3>
            <p className="text-3xl text-blue-600 font-bold">5</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800">Total Spendings</h3>
            <p className="text-3xl text-green-600 font-bold">$200</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800">Pending Actions</h3>
            <p className="text-3xl text-yellow-600 font-bold">2</p>
          </div>
        </div>

        {}
<div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
<h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h3>
<ul className="space-y-4">
  {activities.map((activity, index) => (
    <li key={index} className="flex items-center space-x-4 p-4 border-b last:border-none">
      {}
      <div className="p-2 bg-blue-100 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-blue-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h6m-6 0h-6m0 0V6m0 0h6M6 6h6m0 0v6"
          />
        </svg>
      </div>

      {}
      <div className="flex-1">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-gray-800">{activity.action}</span>{" "}
          {activity.description}
        </p>
        <p className="text-xs text-gray-500">{activity.time}</p>
      </div>

      {}
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full 
        ${activity.type === "New" ? "bg-green-100 text-green-600" : 
          activity.type === "Updated" ? "bg-blue-100 text-blue-600" : 
          "bg-red-100 text-red-600"}`}
      >
        {activity.type}
      </span>
    </li>
  ))}
</ul>
</div>


       {}
<div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
<h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Payments</h3>
<ul className="space-y-4">
  {upcomingPayments.map((payment, index) => (
    <li key={index} className="flex items-center justify-between p-4 border-b last:border-none">
      {}
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-yellow-100 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-yellow-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4h4m-4 0H8"
            />
          </svg>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-900">{payment.date}</p>
          <p className="text-sm text-gray-500">{payment.subscription}</p>
        </div>
      </div>

      {}
      <p className="text-xl font-bold text-green-600">${payment.amount}</p>

      {}
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full 
        ${payment.status === "Due Soon" ? "bg-red-100 text-red-600" : 
          payment.status === "Paid" ? "bg-green-100 text-green-600" : 
          "bg-yellow-100 text-yellow-600"}`}
      >
        {payment.status}
      </span>
    </li>
  ))}
</ul>
</div>


        {}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h3>
          <Link
            to="/profile"
            className="text-blue-600 hover:text-blue-800"
          >
            Edit Profile
          </Link>
        </div>

        {}
        <div className="text-center mt-8">
          <Link
            to="/subscription"
            className="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-medium"
          >
            Go to Subscription
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
