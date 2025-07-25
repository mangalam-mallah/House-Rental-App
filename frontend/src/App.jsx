import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Context
import { AuthProvider } from './context/AuthContext.jsx';

// Pages
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import PropertyDetailsPage from './pages/PropertyDetailsPage.jsx';
import PropertyListPage from './pages/PropertyListing.jsx';
import AddProperty from './pages/AddProperty.jsx';
import MyPropertiesPage from './pages/MyPropertiesPage.jsx';
import OwnerInbox from './pages/OwnerInbox.jsx'; // ✅ Owner inbox page

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/property/:id" element={<PropertyDetailsPage />} />
          <Route path="/properties" element={<PropertyListPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-property"
            element={
              <ProtectedRoute>
                <AddProperty />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-properties"
            element={
              <ProtectedRoute>
                <MyPropertiesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/inbox"
            element={
              <ProtectedRoute>
                <OwnerInbox />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Toast Notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}

export default App;
