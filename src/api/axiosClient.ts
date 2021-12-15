import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosClient = axios.create({
  baseURL: "https://61b7085ac95dd70017d411a2.mockapi.io/truck/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // config.headers.Authorization = "Bearer " + localStorage.getItem(`token`);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
