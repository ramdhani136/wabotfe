import axios from "axios";
import { API_URI } from ".";
import jwt_decode from "jwt-decode";

const FetchApi = axios.create({});

FetchApi.interceptors.request.use(
  async (config) => {
    const response = await axios.get(`${API_URI}users/token`);
    config.headers.Authorization = `Bearer ${response.data.accessToken}`;
    localStorage.setItem("token", response.data.accessToken);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { FetchApi };
