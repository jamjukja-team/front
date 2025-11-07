// src/views/attendance/AttendanceWithWeeks.tsx
"use client";

import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import AttendanceTable from "@/components/Table/AttendanceTable";
import { Attendance } from "@/types/api";
import { buildMonthWeeks, parseYmd, WeekInfo } from "@/utils/weeks";

const WeekBar = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 16px 0 12px;
`;

const WeekChip = styled.button<{ $active?: boolean; $disabled?: boolean }>`
  padding: 8px 12px;
  font-size: 13px;
  border-radius: 18px;
  font-weight:  ${({ $active }) => ($active ? "600" : "400")};
  border: 1px solid ${({ $active }) => ($active ? "#00C2C4" : "#e5e7eb")};
  color: ${({ $active }) => ($active ? "#0B898A" : "#374151")};
  background: ${({ $active }) => ($active ? "#D7F6F8" : "#fff")};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: all 0.15s ease;
`;

type Props = {
    mode?: "table" | "graph"
    month: Date;
    monthlyData: Attendance[];
};

export default function AttendanceWithWeeks({
    mode = "table",
    month = new Date(),
    monthlyData,
}: Props) {
    // 1) 해당 월의 주차 목록
    const weeks = useMemo<WeekInfo[]>(() => buildMonthWeeks(month, 1), [month]);

    // 2) ‘오늘이 포함된 주’ 인덱스 우선 탐색 (오늘이 현재 month의 달/연도와 같을 때만)
    const today = useMemo(() => {
        const t = new Date();
        // 시간 제거(날짜 비교 안정화)
        t.setHours(0, 0, 0, 0);
        return t;
    }, []);

    // 오늘이 선택된 '달'에 포함되어 있는지 여부
    const isSameMonthAsView =
        month.getFullYear() === today.getFullYear() &&
        month.getMonth() === today.getMonth();

    // 기본값으로 설정할 주차 인덱스
    const defaultIdx = useMemo(() => {
        if (weeks.length === 0) return 0;

        if (isSameMonthAsView) {
            const idxToday = weeks.findIndex(
                (w) => w.hasInMonthDays && today >= w.from && today <= w.to
            );
            if (idxToday >= 0) return idxToday;
        }

        // 오늘이 그 달이 아니거나 못 찾으면: 월 내 날짜가 포함된 첫 주
        const idxFirstInMonth = weeks.findIndex((w) => w.hasInMonthDays);
        return Math.max(0, idxFirstInMonth);
    }, [weeks, isSameMonthAsView, today]);

    // 선택되어 있는 주차 인덱스 
    const [activeIdx, setActiveIdx] = useState(defaultIdx);

    // 3) month(또는 weeks)가 바뀔 때 defaultIdx로 재동기화
    useEffect(() => {
        setActiveIdx(defaultIdx);
    }, [defaultIdx]);

    const activeWeek = weeks[activeIdx];

    // 4) 선택된 주 범위로 필터링
    const filtered = useMemo(() => {
        if (!activeWeek) return [];
        const { from, to } = activeWeek;
        return monthlyData.filter((a) => {
            const d = parseYmd(a.date); // a.date: "YYYY-MM-DD"
            return d >= from && d <= to;
        });
    }, [monthlyData, activeWeek]);

    return (
        <>
            <WeekBar>
                {weeks.map((w, i) => (
                    <WeekChip
                        key={w.index}
                        $active={i === activeIdx}
                        $disabled={!w.hasInMonthDays}
                        onClick={() => w.hasInMonthDays && setActiveIdx(i)}
                        title={w.label}
                    >
                        {w.label}
                    </WeekChip>
                ))}
            </WeekBar>

            {mode === "table" ? (
                <AttendanceTable attendanceData={filtered} />
            ) : (
                <div>Graph View</div>
            )}
        </>
    );
}