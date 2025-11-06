import apiClient from "./ApiClient";
import {
  EmployeeRegisterRequest,
  EmployeeRegisterResponse,
  EmployeesResponse,
  Employee,
} from "@/types/api";

// 목 데이터
const mockEmployees: Employee[] = [
  {
    emp_id: 1,
    emp_nm: "김철수",
    email: "kim.chulsoo@example.com",
    birth_date: "1990.01.15",
    hire_date: "2020.03.01",
    dept_id: "개발팀",
    grade_id: "과장",
    photo: "",
  },
  {
    emp_id: 2,
    emp_nm: "이영희",
    email: "lee.younghee@example.com",
    birth_date: "1992.05.20",
    hire_date: "2021.07.15",
    dept_id: "인사팀",
    grade_id: "대리",
    photo: "",
  },
];

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
    // response가 없거나 response.data가 없으면 목 데이터 반환
    if (!response || !response.data) {
      console.warn("Invalid response from server, using mock data");
      return { employees: mockEmployees };
    }
    // 실제 데이터가 있고 employees 배열이 비어있지 않으면 반환
    if (response.data.employees && response.data.employees.length > 0) {
      return response.data;
    }
    // 데이터가 없으면 목 데이터 반환
    return { employees: mockEmployees };
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    // 에러 발생 시 목 데이터 반환
    return { employees: mockEmployees };
  }
};
