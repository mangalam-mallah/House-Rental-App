import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchOwnerProperties } from "../services/propertyService";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [propertyCount, setPropertyCount] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      if (user?.role === "owner") {
        try {
          const properties = await fetchOwnerProperties();
          setPropertyCount(properties.length);
        } catch (err) {
          console.error("Failed to fetch properties", err);
          setPropertyCount(0);
        }
      }
    };
    loadProperties();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-24"></div>
        
        <div className="relative px-8 pb-8">
          <div className="flex justify-center -mt-16 mb-6">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=128`}
              alt="Profile Avatar"
              className="w-32 h-32 rounded-full shadow-xl border-4 border-white bg-white"
            />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h2>
            <span className="inline-block bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-semibold capitalize">
              {user.role}
            </span>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-900">{user.email || "Not Provided"}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-semibold text-gray-900 capitalize">
                    {user.role === "owner" ? "Property Owner" : "Renter"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {user.role === "owner" ? (
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-6 mb-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-indigo-900 mb-2">
                  Property Management
                </h3>
                <p className="text-indigo-700 text-lg">
                  {propertyCount === null
                    ? "Loading properties..."
                    : `You have ${propertyCount} ${propertyCount === 1 ? 'property' : 'properties'} listed`}
                </p>
              </div>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                <Link
                  to="/add-property"
                  className="group bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl shadow-lg text-center transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="text-2xl mb-2">➕</div>
                  <div className="font-semibold">Add Property</div>
                </Link>

                <Link
                  to="/my-properties"
                  className="group bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl shadow-lg text-center transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="text-2xl mb-2">🏘️</div>
                  <div className="font-semibold">My Properties</div>
                </Link>

                <Link
                  to="/owner/inbox"
                  className="group bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-xl shadow-lg text-center transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="text-2xl mb-2">📩</div>
                  <div className="font-semibold">Inbox</div>
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-green-900 mb-2">
                  My Rentals
                </h3>
                <p className="text-green-700 text-lg">
                  You have <span className="font-bold">1</span> active rental in Pune
                </p>
              </div>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={logout}
              className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;