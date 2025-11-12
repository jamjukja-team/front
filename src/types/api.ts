// API 공통 응답 타입
export interface ApiResponse<T = any> {
  code: string;
  message: string;
  data?: T;
}

// 로그인 요청 타입
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  code: string;
  message: string;
  emp_id: number;
  accessToken: string;
  refreshToken: string;
  role?: string;
}

// 사원등록 요청 타입
export interface EmployeeRegisterRequest {
  email: string;
  password: string;
  emp_nm: string;
  birth_date: string;
  hire_date: string;
  dept_id: string;
  grade_id: string;
  photo: string;
}

// 사원등록 응답 타입
export interface EmployeeRegisterResponse {
  code: string;
  message: string;
}

// 사원 정보 타입
export interface Employee {
  emp_id?: number;
  email?: string;
  emp_nm?: string;
  birth_date?: string;
  hire_date?: string;
  dept_id?: string;
  grade_id?: string;
  photo?: string;
}

// 사원 전체 조회 응답 타입
export interface EmployeesResponse {
  employees: Employee[];
}

// 출퇴근 내역 데이터 타입
export interface Attendance {
  emp_id?: number;
  emp_nm?: string;
  date: string;
  check_in: string;
  check_out: string;
  work_hours: string;
  status: string;
  remarks: string;
}

// 출퇴근 내역 조회 응답 타입
export interface AttendancesResponse {
  attendances: Attendance[];
}

// 출퇴근 내역 요청 타입
export interface AttendancesRequest {
  ym: string; // "yyyy-MM" 형식
  department?: string;
  grade?: string;
  name?: string;
}
