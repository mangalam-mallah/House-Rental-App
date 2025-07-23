import React, { useEffect, useState } from 'react';
import { getAllProperties } from '../services/propertyService';

const PropertyListPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllProperties();
        setProperties(data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://placehold.co/300x200?text=No+Image";
  };

  const handleRetry = () => {
    setError(null);
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await getAllProperties();
        setProperties(data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Available Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md animate-pulse">
              <div className="w-full h-48 bg-gray-300 mb-2 rounded"></div>
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Available Properties</h2>
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg">{error}</p>
          </div>
          <button 
            onClick={handleRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Available Properties</h2>
        <p className="text-gray-600">{properties.length} properties found</p>
      </div>
      
      {properties.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p className="text-lg">No properties found</p>
            <p className="text-sm">Check back later for new listings</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <div 
              key={property._id} 
              className="border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-white"
            >
              <div className="relative">
                <img
                  src={property.image?.url || "https://placehold.co/300x200?text=No+Image"}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                  onError={handleImageError}
                  loading="lazy"
                />
                {property.featured && (
                  <span className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    Featured
                  </span>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{property.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{property.description}</p>
                
                <div className="flex justify-between items-center">
                  <p className="text-green-600 font-bold text-lg">
                    {formatPrice(property.price)}
                  </p>
                  
                  {property.type && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {property.type}
                    </span>
                  )}
                </div>
                
                {property.location && (
                  <p className="text-gray-500 text-xs mt-2 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {property.location}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyListPage;
