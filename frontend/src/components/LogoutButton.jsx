import { useAuth0 } from "@auth0/auth0-react";
import AuthService from "../services/auth.service";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

const LogoutButton = ({ className, children }) => {
  const { logout, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    AuthService.logout();
    if (isAuthenticated) {
      logout({ logoutParams: { returnTo: window.location.origin } });
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={
        className ||
        "flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
      }
    >
      {children || (
        <>
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          <span>Log Out</span>
        </>
      )}
    </button>
  );
};

export default LogoutButton;
