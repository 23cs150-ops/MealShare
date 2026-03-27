import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import RestaurantDashboard from './pages/RestaurantDashboard.jsx';
import NGODashboard from './pages/NGODashboard.jsx';
import MyRequests from './pages/MyRequests.jsx';

const App = () => (
  <div className="app-shell">
    <Navbar />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Navigate to="/login/restaurant" replace />} />
      <Route path="/login/:role" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/restaurant"
        element={
          <ProtectedRoute role="restaurant">
            <RestaurantDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ngo"
        element={
          <ProtectedRoute role="ngo">
            <NGODashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ngo/requests"
        element={
          <ProtectedRoute role="ngo">
            <MyRequests />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<div className="container">Page not found</div>} />
    </Routes>
  </div>
);

export default App;
