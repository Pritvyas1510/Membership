import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// ✅ Add token only (NOT content-type)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // 🔥 VERY IMPORTANT
  // Let browser set Content-Type automatically for FormData
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

export default api;
