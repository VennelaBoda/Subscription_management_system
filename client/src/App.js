import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Ensure `Navigate` is imported
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Subscription from "./pages/Subscription";
import Support from "./pages/Support";
import Logout from "./pages/Logout";
import Plans from "./pages/Plans";
import SubscribePage from "./pages/SubscribePage";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/support" element={<Support />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/plans/:appName" element={<Plans />} />
        <Route path="/subscribe/:planName" element={<SubscribePage />} />
      </Routes>
    </Router>
  );
}

export default App;  