import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

//https://api.underdogsfitness.in

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

export default axiosInstance;
