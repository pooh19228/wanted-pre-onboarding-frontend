import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://www.pre-onboarding-selection-task.shop",
});

apiInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default apiInstance;