import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/public/login";
import CompleteGoogleProfile from "./pages/public/CompleteGoogleProfile";
import Dashboard from "./pages/user/Dashboard";
import Map from "./pages/user/Map";
import MainLayout from "./layouts/MainLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";
import AdminLayout from "./layouts/AdminLayout";
import Profile from "./pages/user/Profile";
import Reservations from "./pages/user/Reservations";
import BookingSummary from "./pages/user/BookingSummary";
import PaymentSelection from "./pages/user/PaymentSelection";
import BookingConfirmation from "./pages/user/BookingConfirmation";
import HelpCenter from "./pages/public/HelpCenter";
import GenreSelection from "./pages/user/GenreSelection";
import About from "./pages/public/About";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeFloorPlan from "./pages/employee/EmployeeFloorPlan";
import EmployeeRoute from "./components/routing/EmployeeRoute";
import AdminDutyManagement from "./pages/admin/AdminDutyManagement";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStalls from "./pages/admin/AdminStalls";
import AdminReservations from "./pages/admin/AdminReservations";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProtectedRoute from "./components/routing/AdminProtectedRoute.jsx";
import { useAuth0 } from "@auth0/auth0-react";

function AppContent() {
  const { isLoading: isAuth0Loading, user: auth0User, isAuthenticated: isAuth0Authenticated } = useAuth0();

  if (isAuth0Loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
          <p className="text-sm font-semibold text-slate-500">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Routes>
        <Route path="/" element={<Navigate to={isAuth0Authenticated ? "/dashboard" : "/login"} replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/complete-profile" element={<CompleteGoogleProfile />} />

        <Route element={<MainLayout user={auth0User} />}>
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/map" element={<Map />} />
          <Route path="/map/:hallName" element={<Map />} />
          <Route path="/booking-summary" element={<BookingSummary />} />
          <Route path="/payment-selection" element={<PaymentSelection />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/employee" element={<Navigate to="/employee/floor-plan" replace />} />
          <Route path="/genres" element={<GenreSelection />} />
        </Route>

        <Route element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/stalls" element={<AdminStalls />} />
            <Route path="/admin/reservations" element={<AdminReservations />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/duties" element={<AdminDutyManagement />} />
          </Route>
        </Route>

        <Route element={<EmployeeLayout user={auth0User} />}>
          <Route path="/employee/floor-plan" element={<EmployeeRoute><EmployeeFloorPlan /></EmployeeRoute>} />
          <Route path="/employee/floor-plan/:hallName" element={<EmployeeRoute><EmployeeDashboard /></EmployeeRoute>} />
          <Route path="/employee/dashboard" element={<Navigate to="/employee/floor-plan" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;