// router.tsx (temiz)
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import HomePage from "./routes/HomePage";
import DashboardPage from "./routes/DashboardPage";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public group */}
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />    
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected group (Layout + koruma) */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
