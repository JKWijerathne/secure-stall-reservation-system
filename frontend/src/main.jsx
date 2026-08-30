import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import Auth0TokenProvider from './components/auth/Auth0TokenProvider'
import './index.css'
import App from './App.jsx'

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

console.log("Auth0 Env Variables Loaded:", { domain, clientId, audience });

if (!domain || !clientId || !audience) {
  console.error("Auth0 configuration error: Missing domain, clientId, or audience in environment variables.");
}

const onRedirectCallback = (appState) => {
  const returnTo = appState?.returnTo || "/login";

  window.history.replaceState(
    {},
    document.title,
    returnTo
  );

  if (window.location.pathname === "/" || window.location.pathname === "/login") {
    window.location.replace(returnTo);
  }
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {domain && clientId && audience ? (
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: audience,
        }}
        onRedirectCallback={onRedirectCallback}
      >
        <Auth0TokenProvider>
          <App />
        </Auth0TokenProvider>
      </Auth0Provider>
    ) : (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-200 max-w-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Auth0 Configuration Missing</h2>
          <p className="text-slate-600 text-sm mb-4">
            Please check that <code className="bg-slate-100 text-red-600 px-1 py-0.5 rounded">VITE_AUTH0_DOMAIN</code>, <code className="bg-slate-100 text-red-600 px-1 py-0.5 rounded">VITE_AUTH0_CLIENT_ID</code>, and <code className="bg-slate-100 text-red-600 px-1 py-0.5 rounded">VITE_AUTH0_AUDIENCE</code> are configured in <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded">frontend/.env</code> and restart your Vite server.
          </p>
        </div>
      </div>
    )}
  </StrictMode>,
)