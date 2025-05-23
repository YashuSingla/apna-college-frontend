// src/routes/AppRoutes.tsx
import { lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import DashboardLayout from "../layout/Dashboard.layout";

const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Profile = lazy(() => import("../pages/Profile"));
const Progress = lazy(() => import("../pages/Progress"));

export default function AppRoutes() {
  return useRoutes([
    { path: "/", element: <Login /> },

    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "profile", element: <Profile /> },
        { path: "progress", element: <Progress /> },
      ],
    },

    { path: "*", element: <Navigate to="/" /> },
  ]);
}
