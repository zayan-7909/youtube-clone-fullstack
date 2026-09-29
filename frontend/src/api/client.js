import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://youtube-clone-fullstack-lzma.onrender.com/api/v1",
  withCredentials: true,
});

export default axiosInstance;

api.interceptors.response.use(
  (response) => response.data?.data ?? response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";
    return Promise.reject(new Error(message));
  }
);