import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";

const CompleteGoogleProfile = () => {
  const { user: auth0User, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    contactNumber: "",
    businessName: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.contactNumber.trim() || !form.businessName.trim()) {
      setError("Please provide both your contact number and business name.");
      return;
    }

    try {
      setSaving(true);
      const response = await UserService.completeGoogleProfile({
        auth0Sub: auth0User?.sub,
        email: auth0User?.email,
        name: auth0User?.name,
        contactNumber: form.contactNumber,
        businessName: form.businessName,
      });

      if (response?.data) {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.error("Google profile completion failed:", err);
      setError(err?.response?.data?.message || "Unable to save your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-blue-900 px-6 py-8 text-center text-white">
          <h1 className="text-2xl font-bold">Complete Your Vendor Profile</h1>
          <p className="mt-2 text-sm text-blue-100">
            Google only gives us your basic details. Please add the information your stall profile needs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
            <input
              type="text"
              value={auth0User?.email || ""}
              disabled
              className="w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2.5 text-slate-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              placeholder="e.g. +94771234567"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Organization / Business Name</label>
            <input
              type="text"
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              placeholder="e.g. Dinesh Book House"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteGoogleProfile;
