// src/pages/MyPropertiesPage.jsx
import { useEffect, useState } from "react";
import { fetchOwnerProperties, deleteProperty } from "../services/propertyService";
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

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">My Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((p) => (
          <div key={p._id} className="relative border rounded shadow p-2">
            <img
              src={`http://localhost:5000/${p.image}`}
              alt={p.name}
              className="h-48 w-full object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{p.name}</h3>
            <p className="text-gray-600">{p.location}</p>
            <p className="text-green-600 font-bold">₹{p.price}</p>

            <div className="mt-3 flex justify-between">
              <Link to={`/property/${p._id}`}>
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  View Detail
                </button>
              </Link>

              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPropertiesPage;
