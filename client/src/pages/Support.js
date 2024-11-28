
import React from "react";

function Support() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-indigo-600 text-white py-6 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Support</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-12 px-8">
        <h2 className="text-2xl font-semibold mb-6">How can we help you?</h2>
        <p className="text-gray-600 mb-8">
          If you have any issues or questions, please feel free to reach out to us. Our team is here to assist you!
        </p>
        <form className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-600 font-semibold mb-2">
              Message
            </label>
            <textarea
              id="message"
              className="w-full px-4 py-2 border rounded-md"
              rows="4"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}

export default Support;
