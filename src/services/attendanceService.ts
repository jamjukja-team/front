import apiClient from "./ApiClient";
import {
    Attendance,
    AttendancesResponse,
} from "@/types/api";

// 목 데이터
const mockAttendance: Attendance[] = [
    {
        date: "2025-11-01",
        check_in: "09:00",
        check_out: "18:00",
        work_hours: "8시간",
        status: "정상근무",
        remarks: "",
    },
    {
        date: "2025-11-02",
        check_in: "09:30",
        check_out: "14:30",
        work_hours: "4시간",
        status: "반차",
        remarks: "",
    },
];


/**
 * 사원의 출퇴근 내역 조회 API
 * @returns 사원의 출퇴근 내역 조회 응답 데이터
 */
export const getAttendances = async (ym: string | undefined): Promise<AttendancesResponse> => {
    try {
        // const response = await apiClient.instance.get<AttendancesResponse>(
        //   "/api/hr/attendances"
        // );
        const response = { data: { attendances: [] } }; // 임시로 null 처리
        // response가 없거나 response.data가 없으면 목 데이터 반환
        if (!response || !response.data) {
            console.warn("Invalid response from server, using mock data");
            return { attendances: mockAttendance };
        }
        // 실제 데이터가 있고 attendances 배열이 비어있지 않으면 반환
        if (response.data.attendances && response.data.attendances.length > 0) {
            return response.data;
        }
        // 데이터가 없으면 목 데이터 반환
        return { attendances: mockAttendance };
    } catch (error) {
        console.error("Failed to fetch attendances:", error);
        // 에러 발생 시 목 데이터 반환
        return { attendances: mockAttendance };
    }
};
