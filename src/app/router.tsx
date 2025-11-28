import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedLayout from "../components/layout/ProtectedLayout";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";

import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import HomePage from "./routes/HomePage";
import DashboardPage from "./routes/DashboardPage";
import PrivacyPolicyPage from "./routes/PrivacyPage";
import TermsOfServicePage from "./routes/TermsPage";
import GanttPage from "./routes/GanttPage";
import Layout from "../components/layout/Layout";

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

        {/* Protected group */}
        <Route element={<ProtectedRoute><ProtectedLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/gantt" element={<GanttPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />

        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
