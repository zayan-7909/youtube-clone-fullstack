import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://youtube-clone-fullstack-lzma.onrender.com/api/v1",
  withCredentials: true,
});

export { api };
export default api;

api.interceptors.response.use(
  (response) => response.data?.data ?? response.data,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return Promise.reject(new Error(message));
  },
);
