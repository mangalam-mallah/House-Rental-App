import { useParams } from 'react-router-dom';

const mockProperties = [
  {
    _id: "1",
    name: "Elegant Urban Apartments",
    location: "Mumbai",
    description: "A luxurious residency in the heart of Mumbai.",
    price: "₹45,000",
    bedrooms: 3,
    bathrooms: 2,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
  },
  {
    _id: "2",
    name: "Greenview Villa",
    location: "Bangalore",
    description: "A beautiful villa with a view of nature.",
    price: "₹60,000",
    bedrooms: 4,
    bathrooms: 3,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
  },
  {
    _id: "3",
    name: "Ocean Breeze Apartments",
    location: "Goa",
    description: "Modern apartments near the ocean with stunning views.",
    price: "₹35,000",
    bedrooms: 2,
    bathrooms: 2,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    _id: "4",
    name: "Palm Heights",
    location: "Chennai",
    description: "Spacious and cozy home perfect for families.",
    price: "₹38,000",
    bedrooms: 3,
    bathrooms: 2,
    image: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&q=80",
  },
  {
    _id: "5",
    name: "Maple Residency",
    location: "Delhi",
    description: "Elegant living spaces in a prime location.",
    price: "₹50,000",
    bedrooms: 4,
    bathrooms: 3,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
  },
  {
    _id: "6",
    name: "Hilltop Mansion",
    location: "Manali",
    description: "A peaceful mansion on a hilltop with breathtaking views.",
    price: "₹75,000",
    bedrooms: 5,
    bathrooms: 4,
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
  },
];

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const property = mockProperties.find((p) => p._id === id);

  if (!property) {
    return <div className="text-center text-gray-600 p-4">Property not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={property.image}
            alt={property.name}
            className="rounded-xl w-full h-80 sm:h-96 object-cover shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">{property.name}</h1>
          <p className="text-gray-600 text-lg mb-1">📍 {property.location}</p>
          <p className="text-green-600 font-semibold text-xl mb-4">{property.price} / month</p>

          <p className="text-gray-700 mb-4">{property.description}</p>

          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
            <span className="bg-gray-100 px-3 py-1 rounded-md">🛏️ {property.bedrooms} Bedrooms</span>
            <span className="bg-gray-100 px-3 py-1 rounded-md">🛁 {property.bathrooms} Bathrooms</span>
          </div>

          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
            placeholder="Send a message to the owner..."
          ></textarea>
          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
            Send Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
