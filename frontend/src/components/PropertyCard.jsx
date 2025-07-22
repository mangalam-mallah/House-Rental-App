import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition transform hover:scale-105">
      <img
        src={property.image}
        alt={property.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{property.name}</h3>
        <p className="text-gray-600">{property.location}</p>
        <Link
          to={`/property/${property._id}`}
          className="inline-block mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
