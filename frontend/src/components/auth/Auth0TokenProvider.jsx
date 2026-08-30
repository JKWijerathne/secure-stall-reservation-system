import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { setTokenProvider } from "../../services/api";

function Auth0TokenProvider({ children }) {
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        // Inject the Auth0 token getter into the Axios interceptor
        setTokenProvider(getAccessTokenSilently);
    }, [getAccessTokenSilently]);

    return children;
}

export default Auth0TokenProvider;
