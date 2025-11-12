import { Attendance } from "@/types/api";

const ABSENT_STATUSES = new Set(["결근", "연차"]); // 필요시 수정

/** "8시간 05분" | "8시간" | "4시간 30분" 등을 분으로 변환 */
export function parseWorkMinutes(s?: string | null): number {
    if (!s) return 0;
    // 하이픈이나 공백 처리
    const str = s.replace(/\s+/g, "");
    if (str === "-" || str.length === 0) return 0;

    // "8시간05분" 형태도 커버
    const hr = /(\d+)\s*시간/.exec(str)?.[1];
    const mn = /(\d+)\s*분/.exec(str)?.[1];
    const h = hr ? parseInt(hr, 10) : 0;
    const m = mn ? parseInt(mn, 10) : 0;
    return h * 60 + m;
}

export function formatHm(totalMinutes: number): string {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return m > 0 ? `${h}시간 ${String(m).padStart(2, "0")}분` : `${h}시간`;
}

export function summarizeWeek(attendanceData: Attendance[]) {
    const totalDays = attendanceData.length;

    let workDays = 0;
    let totalMinutes = 0;

    for (const a of attendanceData) {
        const isAbsent = ABSENT_STATUSES.has(a.status);
        const hasCheckIn = Boolean(a.check_in && a.check_in !== "-");

        if (!isAbsent && hasCheckIn) {
            workDays += 1;
        }
        totalMinutes += parseWorkMinutes(a.work_hours);
    }

    const avgMinutes = workDays > 0 ? Math.round(totalMinutes / workDays) : 0;
    const attendanceRate = totalDays > 0 ? Math.round((workDays / totalDays) * 100) : 0;

    return {
        workDays,                 // 근무일수
        totalMinutes,             // 총 근무시간(분)
        avgMinutes,               // 평균 근무시간(분)
        attendanceRate,           // 출근율(%)
        totalText: formatHm(totalMinutes), // 총 근무시간(시간)
        avgText: formatHm(avgMinutes), // 평균 근무시간(시간)
    };
}