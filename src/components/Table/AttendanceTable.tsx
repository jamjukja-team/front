"use client";

import styled from "styled-components";
import { Attendance } from "@/types/api";

interface AttendanceTableProps {
    role?: string;
    attendanceData: Attendance[];
}

const TableContainer = styled.div`
  width: 100%;
  background-color: var(--color-background);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-border);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: var(--color-gray-50);
`;

const TableHeaderRow = styled.tr`
  border-bottom: 1px solid var(--color-border);
`;

const TableHeaderCell = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  text-align: center;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-gray-50);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  color: var(--color-text);
  text-align : center
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 400;
  background-color: ${({ $status }) => {
        switch ($status) {
            case "정상근무":
                return "#dbeafe";
            case "연차":
                return "#fee2e2";
            case "반차":
                return "#fef3c7";
            case "결근":
                return "#e0e7ff";
            case "병가":
                return "#F0C4FF"
            default:
                return "#e5e7eb";
        }
    }};
`;

const RemarkBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 400;
  background-color: #e5e7eb;
`;

const AccountStatusBadge = styled.span<{ $active: boolean }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 400;
  background-color: ${({ $active }) => ($active ? "#d1fae5" : "#fee2e2")};
  color: ${({ $active }) => ($active ? "#065f46" : "#991b1b")};
`;

const AttendanceTable = ({ attendanceData, role = 'employee' }: AttendanceTableProps) => {
    // const handleRowClick = (employee: Employee) => {
    //     if (onEmployeeClick) {
    //         onEmployeeClick(employee);
    //     }
    // };

    return (
        <TableContainer>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        {role === 'admin' && <TableHeaderCell>사번</TableHeaderCell>}
                        {role === 'admin' && <TableHeaderCell>이름</TableHeaderCell>}
                        <TableHeaderCell>날짜</TableHeaderCell>
                        <TableHeaderCell>출근</TableHeaderCell>
                        <TableHeaderCell>퇴근</TableHeaderCell>
                        <TableHeaderCell>근무시간</TableHeaderCell>
                        <TableHeaderCell>상태</TableHeaderCell>
                        <TableHeaderCell>비고</TableHeaderCell>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {attendanceData.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} style={{ textAlign: "center", padding: "40px" }}>
                                조회된 결과가 없습니다.
                            </TableCell>
                        </TableRow>
                    ) : (
                        attendanceData.map((attendance) => (
                            <TableRow
                                key={attendance.date}
                            >
                                {role === 'admin' && <TableCell>{attendance.emp_id || "-"}</TableCell>}
                                {role === 'admin' && <TableCell>{attendance.emp_nm || "-"}</TableCell>}
                                <TableCell>{attendance.date || "-"}</TableCell>
                                <TableCell>{attendance.check_in || "-"}</TableCell>
                                <TableCell>{attendance.check_out || "-"}</TableCell>
                                <TableCell>{attendance.work_hours || "-"}</TableCell>
                                <TableCell>
                                    <StatusBadge $status={attendance.status}>
                                        {attendance.status}
                                    </StatusBadge>
                                </TableCell>
                                <TableCell>
                                    {attendance.remarks ? <RemarkBadge $status={attendance.remarks}>
                                        {attendance.remarks}
                                    </RemarkBadge> : ""}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AttendanceTable;


