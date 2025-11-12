// src/views/attendance/AttendanceWithWeeks.tsx
"use client";

import styled from "styled-components";
import AttendanceTable from "@/components/Table/AttendanceTable";
import { Attendance } from "@/types/api";
import { useAuthStore } from "@/stores/authStore";
import AttendanceChart from "@/components/Chart/AttendanceChart";
import WeeklySummaryTable from "@/components/Table/WeeklySummaryTable";
import { useWeeklySlice } from "@/hooks/useWeeklySlice";

const WeekBar = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 30px 0 12px;
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
    const isAdmin = useAuthStore((s) => s.isAdmin);

    const { weeks, activeIdx, setActiveIdx, filtered } = useWeeklySlice(
        month,
        monthlyData
    );

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
                <AttendanceChart data={filtered} />
            )}

            {!isAdmin && (
                <WeeklySummaryTable data={filtered} />
            )}
        </>
    );
}