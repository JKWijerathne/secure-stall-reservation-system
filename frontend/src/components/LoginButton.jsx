import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = ({ className, children }) => {
  const { loginWithRedirect } = useAuth0();

  const handleClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    loginWithRedirect({
      appState: {
        returnTo: "/login",
      },
    });
  };


  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        className ||
        "px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-md shadow-blue-200 cursor-pointer flex items-center justify-center gap-2"
      }
    >
      {children || "Log In with Auth0"}
    </button>
  );
};

export default LoginButton;

