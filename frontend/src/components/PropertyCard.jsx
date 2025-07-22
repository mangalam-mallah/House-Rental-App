import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  return (
    <div>
      <img src={property.image} alt={property.name} />
      <h3>{property.name}</h3>
      <p>{property.location}</p>
      <Link to={`/property/${property._id}`}>View Details</Link>
    </div>
  );
};

export default PropertyCard;
