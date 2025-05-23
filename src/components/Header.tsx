import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token'); // ✅ Clear JWT or auth token
    navigate('/'); // ✅ Redirect to login/home
  };

  return (
    <header className="bg-white shadow-md p-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <h1
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate('/dashboard')}
      >
        📘 DSA Sheet
      </h1>
      <nav className="flex space-x-6 text-sm text-gray-700">
        <button
          className={`hover:text-blue-600 ${isActive('/dashboard/profile') ? 'text-blue-600 font-semibold underline' : ''}`}
          onClick={() => navigate('/dashboard/profile')}
        >
          Profile
        </button>
        <button
          className={`hover:text-blue-600 ${isActive('/dashboard/progress') ? 'text-blue-600 font-semibold underline' : ''}`}
          onClick={() => navigate('/dashboard/progress')}
        >
          Progress
        </button>
        <button
          className="hover:text-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
