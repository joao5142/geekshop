import { AppError } from "@/utils/erros/AppError";
import axios, { AxiosRequestConfig, AxiosRequestHeaders,  } from "axios";
 
interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 10000,
});

const requestHandler = async (requestConfig: AdaptAxiosRequestConfig) => {
   try {
    let token = ""

    if (token) {
      requestConfig.headers.Authorization = "bearer " + token;
    }
  } catch (e) {}

  return requestConfig;
};

axiosInstance.interceptors.request.use((requestConfig) => requestHandler(requestConfig));

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;