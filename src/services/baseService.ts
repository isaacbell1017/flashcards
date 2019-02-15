import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://opentdb.com",
  transformRequest: [
    data => {
      if (data !== undefined && data !== "") {
        return JSON.stringify(data);
      }
      return data;
    }
  ]
});

axiosInstance.interceptors.request.use(
  async options => {
    options.headers["Accept"] = "application/json";
    options.headers["Content-Type"] = "application/json";
    return options;
  },
  error => {
    console.log("Request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error);
    return error;
  }
);

export default axiosInstance;
