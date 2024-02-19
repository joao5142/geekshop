import store from '@/store'
import { AppError } from '@/utils/erros/AppError'
import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'
// import { HttpsProxyAgent } from 'https-proxy-agent'
interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}

export const BASE_URL_API = 'https://api.deepspacestore.com'

// const agent = new HttpsProxyAgent('https://localhost:3001')

const axiosInstance = axios.create({
  baseURL: BASE_URL_API,
  timeout: 10000,
  // httpsAgent: agent,
})

const requestHandler = async (requestConfig: AdaptAxiosRequestConfig) => {
  try {
    store.commit('loading/setIsLoading', true)

    const token = ''

    if (token) {
      requestConfig.headers.Authorization = 'bearer ' + token
    }
  } catch (e) {
    console.error(e)
  }

  return requestConfig
}

const responseHandler = async (response: AxiosResponse) => {
  store.commit('loading/setIsLoading', false)

  return response
}

axiosInstance.interceptors.request.use((requestConfig) => requestHandler(requestConfig))
axiosInstance.interceptors.response.use((response) => responseHandler(response))

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    store.commit('loading/setIsLoading', false)

    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      return Promise.reject(error)
    }
  }
)

export default axiosInstance
