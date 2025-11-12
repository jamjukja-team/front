// components/Attendance/WeeklySummary.tsx
"use client";

import styled from "styled-components";
import { summarizeWeek } from "@/utils/attendanceSummary";
import { Attendance } from "@/types/api";

const SummaryCard = styled.div`
  margin-top: 24px;
  width: 100%;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 12px;
  background: #fff;
  overflow: hidden;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const HeadCell = styled.div`
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  background: var(--color-gray-50, #f9fafb);
  text-align: center;
  border-bottom: 1px solid var(--color-border, #e5e7eb);

  &:not(:last-child) {
    border-right: 1px solid var(--color-border, #e5e7eb);
  }
`;

const Cell = styled.div`
  padding: 16px;
  font-size: 14px;
  color: #111827;
  text-align: center;
  &:not(:last-child) {
    border-right: 1px solid var(--color-border, #e5e7eb);
  }
`;

export default function WeeklySummary({ data }: { data: Attendance[] }) {
    const s = summarizeWeek(data);

    return (
        <SummaryCard>
            <Row>
                <HeadCell>근무일수</HeadCell>
                <HeadCell>총 근무시간</HeadCell>
                <HeadCell>평균 근무시간</HeadCell>
                <HeadCell>출근율</HeadCell>
            </Row>
            <Row>
                <Cell>{s.workDays}일</Cell>
                <Cell>{s.totalText}</Cell>
                <Cell>{s.avgText}</Cell>
                <Cell>{s.attendanceRate}%</Cell>
            </Row>
        </SummaryCard>
    );
}