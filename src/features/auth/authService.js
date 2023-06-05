import axios from "../../axios";

const API_URL = "/api/admin/";

// Register Admin
const register = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, userData, config);

  return response.data;
};

const deleteAdmin = async (adminId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + adminId, config);
  return response.data;
};

// Login admin
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("admin", JSON.stringify(response.data));
  }

  return response.data;
};

//Logout admin
const logout = () => {
  localStorage.removeItem("admin");
};

const authService = {
  login,
  register,
  logout,
  deleteAdmin,
};

export default authService;
