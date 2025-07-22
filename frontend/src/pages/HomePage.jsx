import { useEffect, useState } from 'react';
import { getAllProperties } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';

const HomePage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getAllProperties().then(setProperties);
  }, []);

  return (
    <div>
      <h2>All Properties</h2>
      {properties.map(p => (
        <PropertyCard key={p._id} property={p} />
      ))}
    </div>
  );
};

export default HomePage;
