
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  return null;
};

const AuthService = {
  logout,
  getCurrentUser,
};

export default AuthService;