import { useEffect, useState } from 'react';
import { getAllProperties } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllProperties().then(setProperties);
  }, []);

  const filteredProperties = properties.filter((p) => {
    const name = p?.name?.toLowerCase() || '';
    const location = p?.location?.toLowerCase() || '';
    const keyword = search.toLowerCase();
    return name.includes(keyword) || location.includes(keyword);
  });

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🏠 Available Properties for Rent
      </h2>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((p) => (
            <PropertyCard key={p._id} property={p} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No properties found.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
