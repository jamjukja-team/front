// components/Attendance/WeeklySummaryTable.tsx
"use client";

import styled from "styled-components";
import { summarizeWeek } from "@/utils/attendanceSummary";
import { Attendance } from "@/types/api";

const TableWrap = styled.div`
  margin-top: 24px;
  width: 100%;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 12px;
  background: #fff;
  overflow: auto;           /* ✅ 작은 화면에서 가로 스크롤 허용 */
`;

const Table = styled.table`
  width: 100%;
  min-width: 520px;         /* ✅ 4열이 무너지지 않도록 최소 너비 */
  border-collapse: collapse;
  table-layout: fixed;      /* 셀 폭 균등 배분 */
`;

const Thead = styled.thead`
  position: sticky;
  top: 0;
  background: var(--color-gray-50, #f9fafb);
  z-index: 1;
`;

const Th = styled.th`
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  text-align: center;
  border-bottom: 1px solid var(--color-border, #e5e7eb);
`;

const Td = styled.td`
  padding: 16px;
  font-size: 14px;
  color: #111827;
  text-align: center;
`;

export default function WeeklySummaryTable({ data }: { data: Attendance[] }) {
    const s = summarizeWeek(data);
    return (
        <TableWrap>
            <Table>
                <Thead>
                    <tr>
                        <Th>근무일수</Th>
                        <Th>총 근무시간</Th>
                        <Th>평균 근무시간</Th>
                        <Th>출근율</Th>
                    </tr>
                </Thead>
                <tbody>
                    <tr>
                        <Td>{s.workDays}일</Td>
                        <Td>{s.totalText}</Td>
                        <Td>{s.avgText}</Td>
                        <Td>{s.attendanceRate}%</Td>
                    </tr>
                </tbody>
            </Table>
        </TableWrap>
    );
}