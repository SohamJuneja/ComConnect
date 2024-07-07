import axios from "axios";

const createApi = (token) => {
  const api = axios.create({
    baseURL: "http://localhost:5001/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add a request interceptor to include the token
  api.interceptors.request.use(
    (config) => {
      if (token && config.headers.Authorization !== `Bearer ${token}`) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Token set in headers:", config.headers.Authorization); // Debugging line
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return api;
};

export default createApi;
