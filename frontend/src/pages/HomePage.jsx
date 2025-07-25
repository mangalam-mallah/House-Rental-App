import { useState, useEffect } from 'react';
import { getAllProperties } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProperties();
        setProperties(data);
      } catch (error) {
        console.error('Failed to fetch properties', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProperties = properties.filter((p) => {
    const name = p?.title?.toLowerCase() || '';
    const location = p?.location?.toLowerCase() || '';
    const keyword = search.toLowerCase();
    return name.includes(keyword) || location.includes(keyword);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-rose-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          🏠 Available Properties for Rent
        </h2>

        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300"
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading properties...</p>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default HomePage;
