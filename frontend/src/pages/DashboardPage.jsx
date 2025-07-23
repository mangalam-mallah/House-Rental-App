import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome, {user?.name}!
        </h2>

        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Role:</span> {user?.role === 'owner' ? 'Property Owner' : 'Renter'}
          </p>
        </div>

        {user?.role === 'owner' ? (
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">My Property Listings</h3>
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-blue-700">You currently have 3 properties listed for rent.</p>
              {/* Add actual property cards here later */}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">My Rentals</h3>
            <div className="bg-green-50 p-4 rounded-md">
              <p className="text-green-700">You have 1 active rental in Pune.</p>
              {/* Add actual rented property info here */}
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className="mt-8 inline-block px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
