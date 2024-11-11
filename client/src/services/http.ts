import axios, { Axios, AxiosResponse } from "axios";

class Http {
  instance: Axios;

  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:8080",
      timeout: 10000,
    });

    // Thêm interceptor để xử lý request (nếu cần)
    // this.instance.interceptors.request.use(
    //   (config) => {
         // Thêm logic như thêm token vào header nếu cần
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //       config.headers.Authorization = `Bearer ${token}`;
    //     }
    //     return config;
    //   },
    //   (error) => {
    //     return Promise.reject(error);
    //   }
    // );

    // Thêm interceptor để xử lý response
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Xử lý lỗi chung (ví dụ: 401 Unauthorized)
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized access");
        }
        return Promise.reject(error);
      }
    );
  }
  get(url: string) {
    return this.instance.get(url);
  }
  post(url: string, data: any) {
    return this.instance.post(url, data);
  }
  put(url: string, data: any) {
    return this.instance.put(url, data);
  }
  delete(url: string) {
    return this.instance.delete(url);
  }
  patch(url: string, data: any) {
    return this.instance.patch(url, data);
  }
}

const http = new Http();
export default http;