import api from "./api";

const getProfile = () => {
  return api.get("/user/profile");
};

const getMe = (params = {}) => {
  return api.get("/user/me", { params });
};

const completeGoogleProfile = (data) => {
  return api.post("/user/me/google", data);
};

const updateProfile = (data) => {
  return api.put("/user/profile", data);
};

const changePassword = (data) => {
  return api.post("/user/change-password", data);
};

const UserService = {
  getProfile,
  getMe,
  completeGoogleProfile,
  updateProfile,
  changePassword,
};

export default UserService;
