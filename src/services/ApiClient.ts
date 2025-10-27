import axios, {AxiosInstance} from 'axios';
import { getCookie } from 'cookies-next';

class ApiClient {
  instance: AxiosInstance;
  constructor(baseURL: string) {
    this.instance = axios.create(
      {
        baseURL: baseURL,
        withCredentials: true,
        timeout: 300,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    
    this.instance.interceptors.request.use(async (config) => {
      const accessToken = getCookie("accessToken");
      config.headers.Authorization = `Bearer ${accessToken}`
      return config;
    });

    this.instance.interceptors.response.use((response) => {
      return response;
    }, async(error) => {
      const originalRequest = error.config;
      // 요청 제한 에러 처리
      // 401 인증 오류 처리
    });

  }
};

const _getApiUrl = () => {
  if (typeof window === "undefined") {
    const serverUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    return serverUrl;
  }

  return "";
}

const baseURL = (() => {
  return _getApiUrl();  
})();

const apiClient = new ApiClient(baseURL);

export default apiClient;