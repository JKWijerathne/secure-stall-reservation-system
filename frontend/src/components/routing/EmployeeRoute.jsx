import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const EmployeeRoute = ({ children }) => {
    const { isAuthenticated, isLoading, user } = useAuth0();

    if (isLoading) {
        return null;
    }

    const roles = user?.['https://stallreservation.com/roles'] || user?.roles || [];
    const hasEmployeeRole = Array.isArray(roles)
        ? roles.some((role) => String(role).toUpperCase() === "ROLE_EMPLOYEE" || String(role).toUpperCase() === "EMPLOYEE")
        : String(roles).toUpperCase() === "ROLE_EMPLOYEE" || String(roles).toUpperCase() === "EMPLOYEE";

    if (!isAuthenticated || !hasEmployeeRole) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default EmployeeRoute;
