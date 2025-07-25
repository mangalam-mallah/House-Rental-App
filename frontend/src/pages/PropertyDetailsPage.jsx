import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPropertyById } from "../services/propertyService";

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    getPropertyById(id).then(setProperty).catch((err) => {
      console.error('Failed to fetch property:', err);
    });
  }, [id]);

  if (!property) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="aspect-[4/3] w-full bg-gray-100 rounded overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full object-contain"
        />
      </div>

      <div className="p-4 border rounded mt-4">
        <h2 className="text-2xl font-bold text-purple-800">{property.title || "Unnamed Property"}</h2>
        <p className="text-green-600 font-semibold text-xl mt-2">₹{property.rent} / month</p>
        <p className="text-gray-600 mt-2 italic font-bold">"{property.description}"</p>

        <div className="mt-4 text-sm space-y-1">
          <p>📍 <b>Location:</b> {property.location}</p>
          <p>💰 <b>Price:</b> ₹{property.rent || "Not specified"}</p>
          <p>🛏️ <b>Bedrooms:</b> {property.bedroom || "N/A"}</p>
          <p>🛁 <b>Bathrooms:</b> {property.bathroom || "N/A"}</p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">Send Inquiry</h3>
          <textarea
            placeholder="Message to owner..."
            className="w-full border mt-2 p-2 rounded"
          />
          <button className="bg-purple-600 text-white mt-3 px-4 py-2 rounded hover:bg-purple-700">
            Send Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
