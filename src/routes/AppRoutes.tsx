// src/routes/AppRoutes.tsx
import { lazy } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));

export default function AppRoutes() {
  return useRoutes([
    { path: '/', element: <Login /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '*', element: <Navigate to="/" /> }
  ]);
}
