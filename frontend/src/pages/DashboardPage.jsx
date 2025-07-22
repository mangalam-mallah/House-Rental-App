import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <p>This is your dashboard.</p>
    </div>
  );
};

export default DashboardPage;
