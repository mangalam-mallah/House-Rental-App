import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPropertyById } from '../services/propertyService';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    getPropertyById(id).then(setProperty);
  }, [id]);

  if (!property) return <p className="text-center mt-10 text-xl">Loading property details...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-96 object-cover"
        />

        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold text-indigo-700">{property.name}</h2>
          <p className="text-gray-600 text-lg">{property.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
            <p><span className="font-semibold">📍 Location:</span> {property.location}</p>
            <p><span className="font-semibold">💰 Price:</span> ₹{property.price || 'Not specified'}</p>
            <p><span className="font-semibold">🛏️ Bedrooms:</span> {property.bedrooms || 'N/A'}</p>
            <p><span className="font-semibold">🛁 Bathrooms:</span> {property.bathrooms || 'N/A'}</p>
          </div>

          <button className="mt-6 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-300">
            Contact Owner
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
