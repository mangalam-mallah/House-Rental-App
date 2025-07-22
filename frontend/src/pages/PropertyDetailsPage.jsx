import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPropertyById } from '../services/propertyService';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    getPropertyById(id).then(setProperty);
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div>
      <h2>{property.name}</h2>
      <img src={property.image} alt={property.name} />
      <p>{property.description}</p>
      <p>Location: {property.location}</p>
    </div>
  );
};

export default PropertyDetailsPage;
