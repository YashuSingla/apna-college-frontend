import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, loginUser } from '../services/authService';
import { getToken, setToken } from '../utils/localStorage';
import Toast from '../components/Toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const token = getToken();
      
      if (token) {
        try {
          const user = await getUser();
          if (user) {
            navigate('/dashboard');
          }
        } catch {
          // token may be invalid/expired — stay on login
        }
      }
    };
    checkLogin();
  }, [navigate]);

  const showToast = (message: string, type?: 'success' | 'error') => {
    setToast({ message, type });
  };

  const handleLogin = async () => {
    if (!email || !password) return showToast('Please fill all fields', 'error');

    try {
      const data = await loginUser({ email, password });
      setToken(data.token);
      showToast('Login successful!', 'success');
      setTimeout(() => navigate('/dashboard'), 200);
    } catch (err) {
      showToast('Login failed', 'error');
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 font-sans">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
}
