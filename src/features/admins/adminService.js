import axios from "../../axios";

const API_URL = "/api/admin/";

const getAllAdmins = async (searchParams, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "get-all", config);
  return response.data;
};

const adminService = {
  getAllAdmins,
};

export default adminService;
