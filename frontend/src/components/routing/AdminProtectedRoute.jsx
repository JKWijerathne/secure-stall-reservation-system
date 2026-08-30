import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function AdminProtectedRoute() {
    const { isAuthenticated, isLoading, user } = useAuth0();

    if (isLoading) {
        return null;
    }

    const roles = user?.['https://stallreservation.com/roles'] || user?.roles || [];
    const hasAdminRole = Array.isArray(roles)
        ? roles.some((role) => String(role).toUpperCase() === "ROLE_ADMIN" || String(role).toUpperCase() === "ADMIN")
        : String(roles).toUpperCase() === "ROLE_ADMIN" || String(roles).toUpperCase() === "ADMIN";

    if (!isAuthenticated || !hasAdminRole) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}
