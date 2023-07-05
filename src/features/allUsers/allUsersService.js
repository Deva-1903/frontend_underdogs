import axios from "../../axios";

const API_URL = "/api/admin/";

const getAllUsers = async (searchParams, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: searchParams,
  };

  const response = await axios.get(API_URL + "users", config);

  return response.data;
};

const getAttendancesByDate = async (searchParams, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: searchParams,
  };

  const response = await axios.get(API_URL + "attendance", config);

  return response.data;
};

const getFeesDetailsByDate = async (searchParams, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: searchParams,
  };

  const response = await axios.get(API_URL + "fees-details", config);

  return response.data;
};

const contactFormService = async (searchParams, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: searchParams,
  };

  const response = await axios.get(API_URL + "contact-forms", config);
  return response.data;
};

const getAllPendingFees = async (searchParams, token) => {
  const config = {
    params: searchParams,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "pending-fees", config);
  return response.data;
};

const allUsersService = {
  getAllUsers,
  getFeesDetailsByDate,
  getAttendancesByDate,
  contactFormService,
  getAllPendingFees,
};

export default allUsersService;
