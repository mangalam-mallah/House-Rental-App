import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <p className="text-xl text-gray-700">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="flex flex-col items-center py-10 px-6">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=128`}
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full shadow-md border-4 border-white -mt-20 mb-4"
          />

          <h2 className="text-3xl font-bold text-gray-800 mb-1">{user.name}</h2>
          <p className="text-sm text-gray-500 mb-4 capitalize">{user.role}</p>

          <div className="w-full text-left mt-4 mb-6 px-6 space-y-3">
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {user.email || 'Not Provided'}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Role:</span> {user.role === 'owner' ? 'Owner' : 'Renter'}
            </p>
          </div>

          {user.role === 'owner' ? (
            <div className="w-full bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-4 text-center">
              <h3 className="text-xl font-semibold text-indigo-800 mb-1">My Property Listings</h3>
              <p className="text-indigo-700">You currently have <strong>3</strong> properties listed.</p>
            </div>
          ) : (
            <div className="w-full bg-green-50 border border-green-200 rounded-xl p-4 mb-4 text-center">
              <h3 className="text-xl font-semibold text-green-800 mb-1">My Rentals</h3>
              <p className="text-green-700">You have <strong>1</strong> active rental in Pune.</p>
            </div>
          )}

          <button
            onClick={logout}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
