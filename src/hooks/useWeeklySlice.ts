// src/hooks/useWeeklySlice.ts
"use client";

import { useEffect, useMemo, useState } from "react";
import { Attendance } from "@/types/api";
import { buildMonthWeeks, parseYmd, WeekInfo } from "@/utils/weeks";

/**
 * month 기준으로 주차 목록을 만들고,
 * 기본 선택 주차(오늘 포함 주 → 없으면 월 내 첫 주)를 활성화하며,
 * 해당 주 범위로 monthlyData를 필터링해서 반환하는 훅
 */
export function useWeeklySlice(
    month: Date,
    monthlyData: Attendance[],
) {
    // 1) 주차 목록
    const weeks = useMemo<WeekInfo[]>(
        () => buildMonthWeeks(month, 1),
        [month, 1]
    );

    // 2) 오늘(시간 제거)
    const today = useMemo(() => {
        const t = new Date();
        t.setHours(0, 0, 0, 0);
        return t;
    }, []);

    // 3) month가 오늘과 같은 달인지
    const isSameMonthAsView =
        month.getFullYear() === today.getFullYear() &&
        month.getMonth() === today.getMonth();

    // 4) 기본 주차 인덱스: 오늘 포함 주 → 없으면 월 내 첫 주
    const defaultIdx = useMemo(() => {
        if (weeks.length === 0) return 0;

        if (isSameMonthAsView) {
            const idxToday = weeks.findIndex(
                (w) => w.hasInMonthDays && today >= w.from && today <= w.to
            );
            if (idxToday >= 0) return idxToday;
        }

        const idxFirstInMonth = weeks.findIndex((w) => w.hasInMonthDays);
        return Math.max(0, idxFirstInMonth);
    }, [weeks, isSameMonthAsView, today]);

    // 5) 활성 주차 상태 + month 변경 시 재동기화
    const [activeIdx, setActiveIdx] = useState(defaultIdx);
    useEffect(() => {
        setActiveIdx(defaultIdx);
    }, [defaultIdx]);

    const activeWeek = weeks[activeIdx];

    // 6) 활성 주차 범위로 필터링 (경계일 포함)
    const filtered = useMemo(() => {
        if (!activeWeek) return [];

        const fromTs = new Date(
            activeWeek.from.getFullYear(),
            activeWeek.from.getMonth(),
            activeWeek.from.getDate()
        ).getTime();

        const toTs = new Date(
            activeWeek.to.getFullYear(),
            activeWeek.to.getMonth(),
            activeWeek.to.getDate()
        ).getTime();

        return monthlyData.filter((a) => {
            const dTs = parseYmd(a.date).getTime(); // "YYYY-MM-DD" → 로컬 자정 Date
            return dTs >= fromTs && dTs <= toTs;
        });
    }, [monthlyData, activeWeek]);

    return {
        weeks,        // WeekInfo[]
        activeIdx,    // number
        setActiveIdx, // (n: number) => void
        activeWeek,   // WeekInfo | undefined
        filtered,     // Attendance[] (현재 활성 주의 데이터)
    };
}