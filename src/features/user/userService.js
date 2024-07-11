import axios from "../../axios";

const API_URL = "/api/admin/";

// Create new user
const createUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "user/register",
    userData,
    config
  );

  return response.data;
};

// Get user by ID
const getUserById = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { id: userId },
  };

  const response = await axios.get(API_URL + "user", config);

  return response.data;
};

const updateUser = async (id, userData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    params: { id: id },
  };
  const response = await axios.put(API_URL + "user", userData, config);
  return response.data;
};

const updateFee = async (id, userData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    params: { id: id },
  };
  const response = await axios.put(
    API_URL + "user/subscription",
    userData,
    config
  );
  return response.data;
};

const getUserDetails = async (searchParams, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: searchParams,
  };

  const response = await axios.get(API_URL + "user", config);

  return response.data;
};

const publicUserDetails = async (searchParams) => {
  const config = {
    params: searchParams,
  };

  const response = await axios.get("api/users/public", config);

  return response.data;
};

const postContactForm = async (userData) => {
  const response = await axios.post("api/contact-form", userData);

  return response.data;
};

const userService = {
  createUser,
  getUserById,
  updateUser,
  updateFee,
  getUserDetails,
  publicUserDetails,
  postContactForm,
};

export default userService;
