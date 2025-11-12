import apiClient from "./ApiClient";
import {
    Attendance,
    AttendancesRequest,
    AttendancesResponse,
} from "@/types/api";

// 목 데이터
const mockAttendance: Attendance[] = [
    {
        date: "2025-11-03",
        check_in: "09:00",
        check_out: "18:00",
        work_hours: "8시간",
        status: "정상근무",
        remarks: "",
    },
    {
        date: "2025-11-04",
        check_in: "09:30",
        check_out: "14:30",
        work_hours: "4시간",
        status: "반차",
        remarks: "",
    },
    {
        date: "2025-11-05",
        check_in: "09:00",
        check_out: "19:00",
        work_hours: "9시간",
        status: "정상근무",
        remarks: "연장근무",
    },
    {
        date: "2025-11-06",
        check_in: "09:00",
        check_out: "18:00",
        work_hours: "8시간",
        status: "정상근무",
        remarks: "",
    },
    {
        date: "2025-11-07",
        check_in: "09:00",
        check_out: "18:00",
        work_hours: "8시간",
        status: "정상근무",
        remarks: "",
    },
];

export const mockAttendanceAdmin: Attendance[] = [
    // ---------------- 홍길동 ----------------
    { emp_id: 1001, emp_nm: "홍길동", date: "2025-11-01", check_in: "09:00", check_out: "18:00", work_hours: "8시간", status: "정상근무", remarks: "" },
    { emp_id: 1001, emp_nm: "홍길동", date: "2025-11-02", check_in: "-", check_out: "-", work_hours: "-", status: "결근", remarks: "" },
    { emp_id: 1001, emp_nm: "홍길동", date: "2025-11-03", check_in: "09:05", check_out: "18:10", work_hours: "8시간", status: "정상근무", remarks: "" },
    { emp_id: 1001, emp_nm: "홍길동", date: "2025-11-04", check_in: "09:30", check_out: "18:00", work_hours: "7시간 30분", status: "지각", remarks: "" },
    { emp_id: 1001, emp_nm: "홍길동", date: "2025-11-05", check_in: "-", check_out: "-", work_hours: "-", status: "연차", remarks: "" },
    { emp_id: 1001, emp_nm: "홍길동", date: "2025-11-06", check_in: "09:10", check_out: "18:40", work_hours: "8시간 30분", status: "정상근무", remarks: "연장 근무" },
    { emp_id: 1001, emp_nm: "홍길동", date: "2025-11-07", check_in: "09:00", check_out: "18:00", work_hours: "8시간", status: "정상근무", remarks: "" },

    // ---------------- 김철수 ----------------
    { emp_id: 1002, emp_nm: "김철수", date: "2025-11-01", check_in: "09:15", check_out: "18:15", work_hours: "8시간", status: "정상근무", remarks: "" },
    { emp_id: 1002, emp_nm: "김철수", date: "2025-11-02", check_in: "-", check_out: "-", work_hours: "-", status: "결근", remarks: "" },
    { emp_id: 1002, emp_nm: "김철수", date: "2025-11-03", check_in: "09:40", check_out: "18:20", work_hours: "7시간 30분", status: "지각", remarks: "" },
    { emp_id: 1002, emp_nm: "김철수", date: "2025-11-04", check_in: "09:00", check_out: "18:00", work_hours: "8시간", status: "정상근무", remarks: "" },
    { emp_id: 1002, emp_nm: "김철수", date: "2025-11-05", check_in: "09:10", check_out: "19:00", work_hours: "8시간 50분", status: "정상근무", remarks: "연장 근무" },
    { emp_id: 1002, emp_nm: "김철수", date: "2025-11-06", check_in: "-", check_out: "-", work_hours: "-", status: "병가", remarks: "" },
    { emp_id: 1002, emp_nm: "김철수", date: "2025-11-07", check_in: "09:00", check_out: "18:00", work_hours: "8시간", status: "정상근무", remarks: "" },

    // ---------------- 이영희 ----------------
    { emp_id: 1003, emp_nm: "이영희", date: "2025-11-01", check_in: "08:50", check_out: "18:10", work_hours: "8시간 20분", status: "정상근무", remarks: "" },
    { emp_id: 1003, emp_nm: "이영희", date: "2025-11-02", check_in: "-", check_out: "-", work_hours: "-", status: "반차", remarks: "오전 반차" },
    { emp_id: 1003, emp_nm: "이영희", date: "2025-11-03", check_in: "09:00", check_out: "18:00", work_hours: "8시간", status: "정상근무", remarks: "" },
    { emp_id: 1003, emp_nm: "이영희", date: "2025-11-04", check_in: "09:25", check_out: "18:10", work_hours: "7시간 40분", status: "지각", remarks: "" },
    { emp_id: 1003, emp_nm: "이영희", date: "2025-11-05", check_in: "09:00", check_out: "18:00", work_hours: "8시간", status: "정상근무", remarks: "" },
    { emp_id: 1003, emp_nm: "이영희", date: "2025-11-06", check_in: "09:10", check_out: "18:50", work_hours: "8시간 40분", status: "정상근무", remarks: "연장 근무" },
    { emp_id: 1003, emp_nm: "이영희", date: "2025-11-07", check_in: "-", check_out: "-", work_hours: "-", status: "결근", remarks: "" },
];

/**
 * 사원의 출퇴근 내역 조회 API
 * @returns 사원의 출퇴근 내역 조회 응답 데이터
 */
export const getAttendances = async ({ ym, department = 'all', grade = 'all', name = '' }: AttendancesRequest): Promise<AttendancesResponse> => {
    try {
        // const response = await apiClient.instance.get<AttendancesResponse>(
        //   "/api/hr/attendances"
        // );
        const response = { data: { attendances: [] } }; // 임시로 null 처리
        // response가 없거나 response.data가 없으면 목 데이터 반환
        if (!response || !response.data) {
            console.warn("Invalid response from server, using mock data");
            return { attendances: mockAttendanceAdmin };
        }
        // 실제 데이터가 있고 attendances 배열이 비어있지 않으면 반환
        if (response.data.attendances && response.data.attendances.length > 0) {
            return response.data;
        }
        // 데이터가 없으면 목 데이터 반환
        return { attendances: mockAttendanceAdmin };
    } catch (error) {
        console.error("Failed to fetch attendances:", error);
        // 에러 발생 시 목 데이터 반환
        return { attendances: mockAttendanceAdmin };
    }
};
