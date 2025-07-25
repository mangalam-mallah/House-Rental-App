import PropertyCard from '../components/PropertyCard';
import { useState } from 'react';

const HomePage = () => {
  const [search, setSearch] = useState('');

  const properties = [
    {
      _id: "1",
      name: "Elegant Urban Apartments",
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    },
    {
      _id: "2",
      name: "Greenview Villa",
      location: "Bangalore",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    },
    {
      _id: "3",
      name: "Ocean Breeze Apartments",
      location: "Goa",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      _id: "4",
      name: "Palm Heights",
      location: "Chennai",
      image: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&q=80",
    },
    {
      _id: "5",
      name: "Maple Residency",
      location: "Delhi",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    },
    {
      _id: "6",
      name: "Hilltop Mansion",
      location: "Manali",
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const filteredProperties = properties.filter((p) => {
    const name = p?.name?.toLowerCase() || '';
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
    </div>
  );
};

export default HomePage;
