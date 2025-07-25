import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById } from "../services/propertyService";

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        setProperty(data.property); // Adjust depending on your backend structure
      } catch (err) {
        console.error("Error loading property:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading property details...</div>;
  }

  if (!property) {
    return <div className="text-center py-8 text-red-500">Property not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={property.image || "https://via.placeholder.com/600x400?text=No+Image"}
            alt={property.name}
            className="rounded-xl w-full h-80 sm:h-96 object-cover shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">{property.name}</h1>
          <p className="text-gray-600 text-lg mb-1">📍 {property.location}</p>
          <p className="text-green-600 font-semibold text-xl mb-4">₹{property.price} / month</p>

          <p className="text-gray-700 mb-4">{property.description}</p>

          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
            <span className="bg-gray-100 px-3 py-1 rounded-md">🛏️ {property.bedrooms} Bedrooms</span>
            <span className="bg-gray-100 px-3 py-1 rounded-md">🛁 {property.bathrooms} Bathrooms</span>
          </div>

          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
            placeholder="Send a message to the owner..."
          ></textarea>
          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
            Send Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
