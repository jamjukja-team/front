import apiClient from "./ApiClient";
import {
  EmployeeRegisterRequest,
  EmployeeRegisterResponse,
  EmployeesResponse,
} from "@/types/api";

/**
 * 사원등록(회원가입) API
 * @param employeeData 사원등록 요청 데이터
 * @returns 사원등록 응답 데이터
 */
export const registerEmployee = async (
  employeeData: EmployeeRegisterRequest
): Promise<EmployeeRegisterResponse> => {
  const response = await apiClient.instance.post<EmployeeRegisterResponse>(
    "/api/hr/employees",
    employeeData
  );
  return response.data;
};

/**
 * 사원 전체 조회 API
 * @returns 사원 목록 응답 데이터
 */
export const getEmployees = async (): Promise<EmployeesResponse> => {
  try {
    const response = await apiClient.instance.get<EmployeesResponse>(
      "/api/hr/employees"
    );
    if (!response || !response.data) {
      throw new Error("Invalid response from server");
    }
    return response.data;
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    // 기본값 반환
    return { employees: [] };
  }
};
