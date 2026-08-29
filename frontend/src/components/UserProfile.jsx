import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  BriefcaseIcon,
  IdentificationIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import UserService from "../services/user.service";

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [dbProfile, setDbProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setDbProfile(null);
      setLoadingProfile(false);
      return;
    }

    const loadProfile = async () => {
      try {
        const response = await UserService.getMe({
          auth0Sub: user.sub,
          email: user.email,
        });
        setDbProfile(response.data);
      } catch (error) {
        console.error("Failed to load saved Google profile:", error);
        setDbProfile(null);
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, [isAuthenticated, user]);

  // 1. Loading State (Prevents UI flickering)
  if (isLoading || loadingProfile) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mb-4"></div>
        <p className="text-sm font-semibold text-slate-500">Checking authentication...</p>
      </div>
    );
  }

  // 2. Unauthenticated State
  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-2xl shadow-xl border border-slate-100 text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserCircleIcon className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Not Logged In</h2>
        <p className="text-slate-500 mb-6">
          Please log in with Auth0 to view your OpenID Connect (OIDC) profile.
        </p>
        <LoginButton />
      </div>
    );
  }

  // 3. Extract user information and namespaced custom claims
  const subject = user.sub || user.nickname || "N/A";
  const name = user.name || user.nickname || "Anonymous User";
  const email = user.email || "N/A";
  const contactNumber = dbProfile?.contactNumber || user["https://stallreservation.com/contact_number"] || user.phone_number || user.contact_number || "Not provided";
  const organizationName = dbProfile?.businessName || user["https://stallreservation.com/org_name"] || user.org_name || user.organization_name || user.businessName || user.business_name || "N/A";

  return (
    <div className="max-w-3xl mx-auto my-8 px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 px-8 py-10 text-center relative overflow-hidden text-white">
          <div className="relative z-10 flex flex-col items-center">
            {user.picture ? (
              <img
                src={user.picture}
                alt={name}
                className="w-24 h-24 rounded-full object-cover shadow-xl ring-4 ring-white/30 mb-4"
              />
            ) : (
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-blue-900 text-4xl font-black shadow-xl ring-4 ring-white/30 mb-4">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
            <h1 className="text-3xl font-bold mb-1">{name}</h1>
            <p className="text-blue-200 text-sm mb-3">{email}</p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-sm border border-white/20">
              <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
              Auth0 Authenticated (OIDC)
            </span>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3">
            OIDC Profile Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subject / Auth0 Sub ID */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 md:col-span-2">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <IdentificationIcon className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Subject Identifier (sub)</span>
              </div>
              <p className="text-slate-800 font-mono text-sm font-semibold break-all pl-7">
                {subject}
              </p>
            </div>

            {/* Full Name */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <UserCircleIcon className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</span>
              </div>
              <p className="text-slate-800 font-semibold pl-7">{name}</p>
            </div>

            {/* Email Address */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <EnvelopeIcon className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</span>
              </div>
              <p className="text-slate-800 font-semibold pl-7">{email}</p>
            </div>

            {/* Contact Number */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <PhoneIcon className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Contact Number</span>
              </div>
              <p className="text-slate-800 font-semibold pl-7">{contactNumber}</p>
            </div>

            {/* Business / Organization Name */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <BriefcaseIcon className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Business / Org Name</span>
              </div>
              <p className="text-slate-800 font-semibold pl-7">{organizationName}</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
            <LogoutButton className="px-6 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition flex items-center gap-2" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
