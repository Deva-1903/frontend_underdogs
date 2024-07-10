import axios from "axios";
import { store } from "./app/store";
const BACKEND_URL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const admin = state.auth.admin;

    if (config.headers.Authorization && admin && admin.branch) {
      config.headers['X-Branch'] = admin.branch;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;