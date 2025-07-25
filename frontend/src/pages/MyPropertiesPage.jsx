// src/pages/MyPropertiesPage.jsx
import { useEffect, useState } from "react";
import { fetchOwnerProperties, deleteProperty } from "../services/propertyService";
import PropertyCard from "../components/PropertyCard";

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
        setProperties(properties.filter(p => p._id !== id));
      } catch (err) {
        alert("Failed to delete property.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">My Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((p) => (
          <div key={p._id} className="relative">
            <PropertyCard property={p} />
            <button
              onClick={() => handleDelete(p._id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPropertiesPage;
