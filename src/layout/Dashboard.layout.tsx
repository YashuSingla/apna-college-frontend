// src/components/Layout.tsx
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getUser } from "../services/authService";
import Header from "../components/Header";
import { getToken } from "../utils/localStorage";

export default function DashboardLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
        
      if (!token) {
        console.log('navigate');
        
        setIsAuthenticated(false);
        navigate('/');
        return;
      }

      try {
        
        const userData = await getUser();

        if (userData && userData.user) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token"); // Clean up invalid token
          setIsAuthenticated(false);
          navigate('/');
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Checking authentication...
      </div>
    );
  }  

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-6">
        {
            isAuthenticated && (         
                <Outlet />
            )
        }
      </main>
    </div>
  );
}
