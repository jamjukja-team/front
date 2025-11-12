// src/utils/weeks.ts
import {
    addDays,
    endOfMonth,
    endOfWeek,
    max as dfMax,
    min as dfMin,
    parseISO,
    startOfMonth,
    startOfWeek,
    format,
} from "date-fns";

export type WeekInfo = {
    index: number;        // 1주차
    fullFrom: Date;       // 캘린더 상 첫 월요일 (예: 11월에서는 10월 27일)
    fullTo: Date;         // 캘린더 상 그 주의 일요일 (예: 11월에서는 11월 2일)
    from: Date;           // 해당 월로 클램프한 시작 (예: 11월에서는 11월 1일)
    to: Date;             // 해당 월로 클램프한 끝   (예: 11월에서는 11월 2일)
    hasInMonthDays: boolean; // 해당 월 날짜가 최소 하루라도 포함되는가 - yes
    label: string;        // "1주차 (11/1–11/2)" 같은 표시
};

// "M/d" 라벨용
function md(d: Date) {
    return format(d, "M/d");
}

/**
 * 월을 "캘린더식 주(월~일)" 단위로 쪼갠 배열을 생성합니다.
 * - weekStartsOn 기본: 1(월요일)
 * - 라벨은 in-month 범위를 기준으로 표기합니다.
 */
export function buildMonthWeeks(monthDate: Date, weekStartsOn: 0 | 1 = 1): WeekInfo[] {
    const mStart = startOfMonth(monthDate); // 해당 월의 첫날 (예: 11월 1일)
    const mEnd = endOfMonth(monthDate); // 해당 월의 마지막날 (예: 11월 30일)

    // 달력을 그릴 때, 월 전체를 커버하는 '완전한 주' 범위
    let cursor = startOfWeek(mStart, { weekStartsOn }); // 첫날이 속한 주의 시작일(예: 10월 27일)
    const gridEnd = endOfWeek(mEnd, { weekStartsOn }); // 마지막날이 속한 주의 마지막일(예: 12월 1일)

    const weeks: WeekInfo[] = [];
    let idx = 1;

    while (cursor.getTime() <= gridEnd.getTime()) {
        const fullFrom = cursor; // 주 시작일 (예: 10월 27일)
        const fullTo = endOfWeek(cursor, { weekStartsOn }); // 주 마지막일 (예: 11월 2일)

        // 월 경계로 클램프(집계/테이블용)
        const from = dfMax([fullFrom, mStart]);
        const to = dfMin([fullTo, mEnd]);
        const hasInMonthDays = from.getTime() <= to.getTime(); // 월 내의 날짜가 최소 하루라도 포함되는가 - yes

        const rangeText = hasInMonthDays ? `${md(from)}–${md(to)}` : `${md(fullFrom)}–${md(fullTo)}`;
        const label = `${idx}주차 (${rangeText})`;

        weeks.push({ index: idx, fullFrom, fullTo, from, to, hasInMonthDays, label });

        // 다음 주의 월요일로 이동
        cursor = addDays(fullTo, 1);
        idx++;
    }

    return weeks;
}

/** Attendance.date(YYYY-MM-DD) → Date */
export function parseYmd(dateStr: string): Date {
    // date-fns parseISO: "YYYY-MM-DD"를 안전하게 Date로 변환
    return parseISO(dateStr);
}