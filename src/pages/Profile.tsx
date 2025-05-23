import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../services/authService';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
        
      const userData = await getUser();

      if (!userData) {
        navigate('/dashboard');
      } else {
        setUser(userData.user);
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Loading user info...</p>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-[60vh] px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-left">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">👤 Profile</h2>

        <div className="space-y-4 text-gray-700 text-base">
          <div>
            <span className="font-semibold">Name:</span> {user.name}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-semibold">Role:</span> {user.role}
          </div>
        </div>
      </div>
    </div>
  );
}
