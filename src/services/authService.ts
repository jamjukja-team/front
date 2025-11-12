import apiClient from "./ApiClient";
import { LoginRequest, LoginResponse } from "@/types/api";

/**
 * 로그인 API
 * @param loginData 로그인 요청 데이터
 * @returns 로그인 응답 데이터
 */
export const postLogin = async (
  loginData: LoginRequest
): Promise<LoginResponse> => {
  const response = await apiClient.instance.post<LoginResponse>(
    "/api/auth/login",
    loginData
  );
  return response.data;
};
