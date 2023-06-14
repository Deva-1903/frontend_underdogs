import axios from "axios";

const BACKEND_URL = "http://localhost:5000";



const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

export default axiosInstance;
