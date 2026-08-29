import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import AuthService from "../../services/auth.service";
import StallMap from "../../components/StallMap";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const Map = () => {
    const navigate = useNavigate();
    const { user: auth0User, isAuthenticated: isAuth0Authenticated, isLoading: isAuth0Loading } = useAuth0();
    const [localUser, setLocalUser] = useState(AuthService.getCurrentUser());

    const isLoggedIn = isAuth0Authenticated || !!localUser;

    useEffect(() => {
        if (!isAuth0Loading && !isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, isAuth0Loading, navigate]);

    if (isAuth0Loading || !isLoggedIn) return (
        <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
    );


    return (
        <div className="min-h-screen bg-slate-50">
            <main className="py-6 sm:py-10 px-4 sm:px-8">
                <div className="max-w-[1600px] mx-auto">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="px-8 py-3 bg-blue-600 text-white rounded-3xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                    >
                        Back to Dashboard
                    </button>

                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                        <StallMap />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Map;
