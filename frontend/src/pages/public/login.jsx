import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../../components/LoginButton";
import backgroundImg from "../../assets/background.jpg";

const Login = () => {
  const navigate = useNavigate();
  const { user: auth0User, isAuthenticated: isAuth0Authenticated, isLoading: isAuth0Loading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuth0Loading && isAuth0Authenticated && auth0User) {
      navigate("/dashboard", { replace: true });
      return;
    }

    if (!isAuth0Loading && !isAuth0Authenticated) {
      loginWithRedirect({
        appState: { returnTo: "/dashboard" },
      });
    }
  }, [isAuth0Authenticated, isAuth0Loading, auth0User, navigate, loginWithRedirect]);

  if (isAuth0Loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden"
      style={{ background: "linear-gradient(to right, #eff6ff 0%, #eff6ff 50%, #0f1d45 50%, #0f1d45 100%)" }}
    >
      <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full border-[40px] border-blue-300/40"></div>
      <div className="absolute top-[15%] left-[5%] w-[180px] h-[180px] rounded-full bg-blue-300/30"></div>
      <div className="absolute bottom-[-60px] right-[-60px] w-[250px] h-[250px] rounded-full border-[35px] border-indigo-300/30"></div>
      <div className="absolute bottom-[10%] left-[15%] w-[80px] h-[80px] rounded-full bg-blue-300/20"></div>
      <div className="absolute top-[40%] right-[3%] w-[100px] h-[100px] rounded-full bg-indigo-300/25"></div>

      <div className="relative z-10 flex w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative w-1/2 min-h-[600px] hidden md:block">
          <img src={backgroundImg} alt="Book Fair Background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(29,78,216,0.45) 40%, rgba(30,64,175,0.15) 70%, transparent 100%)" }}></div>
          <div className="relative z-10 flex flex-col justify-center h-full p-10 text-white">
            <h2 className="text-4xl font-extrabold leading-tight mb-12 drop-shadow-lg">Welcome to the<br />Book Fair 2026</h2>
            <p className="text-base font-bold text-blue-100 max-w-xs leading-relaxed">One platform for publishers!<br />Book stalls, manage payments, and secure your presence at CIBF 2026.</p>
          </div>
        </div>

        <div className="flex items-center justify-center w-full md:w-1/2 p-8">
          <div className="w-full max-w-sm space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-blue-800 tracking-tight">Colombo International<br /><span className="text-blue-600">Book Fair 2026</span></h1>
              <div className="mt-4 w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-4">
              <LoginButton className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition shadow-md shadow-slate-300 cursor-pointer text-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.98 7.348L19.065.73A1.947 1.947 0 0 0 17.29 0H6.71c-.767 0-1.465.45-1.776 1.144L2.02 7.348a6.386 6.386 0 0 0 2.27 7.428l7.07 5.093c.38.273.89.273 1.27 0l7.07-5.093a6.385 6.385 0 0 0 2.28-7.428zM12 18.064l-5.69-4.1a4.394 4.394 0 0 1-1.566-5.116L6.5 4.75h11l1.756 4.098a4.394 4.394 0 0 1-1.566 5.116L12 18.064z"/>
                </svg>
                <span>Continue with Auth0 (SSO)</span>
              </LoginButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;