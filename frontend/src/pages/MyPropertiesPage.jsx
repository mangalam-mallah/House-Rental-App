// src/pages/MyPropertiesPage.jsx
import { useEffect, useState } from "react";
import {
  fetchOwnerProperties,
  deleteProperty,
} from "../services/propertyService";
import { Link } from "react-router-dom";

const MyPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProperties = async () => {
    try {
      const data = await fetchOwnerProperties();
      setProperties(data);
    } catch (err) {
      console.error("Error fetching properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await deleteProperty(id);
        setProperties(properties.filter((p) => p._id !== id));
      } catch (err) {
        alert("Failed to delete property.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            My Properties
          </h2>
          <p className="text-gray-600">Manage your property listings</p>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No properties yet
            </h3>
            <p className="text-gray-600 mb-4">
              Start by adding your first property
            </p>
            <Link to="/add-property">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Add Property
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Active
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                    {p.name}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-2">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm truncate">{p.location}</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-green-50 px-3 py-1 rounded-lg">
                      <span className="text-green-700 font-bold text-lg">
                        ₹{p.rent}
                      </span>
                      <span className="text-green-600 text-sm ml-1">
                        / month
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/property/${p._id}`} className="flex-1">
                      <button className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        View
                      </button>
                    </Link>
                    <Link
                      to={`/property/${p._id}?edit=true`}
                      className="flex-1"
                    >
                      <button className="w-full bg-yellow-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors flex items-center justify-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2L9 17H7v-2l6-6z"
                          />
                        </svg>
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-50 text-red-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPropertiesPage;
