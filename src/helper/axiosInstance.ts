import axios, { AxiosError, AxiosInstance } from "axios"

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
  headers: {},
})

axiosInstance.interceptors.request.use((config) => {
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)