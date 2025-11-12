"use client";

import styled from "styled-components";
import { Attendance } from "@/types/api";
import React, { useMemo, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { EditIcon } from "@/utils/icons";
import EditAttendanceModal from "../Dialog/EditAttendanceDialog";

interface AttendanceTableProps {
    attendanceData: Attendance[];
}

const TableContainer = styled.div`
  width: 100%;
  background-color: var(--color-background);
  border-radius: 8px;
  overflow: auto;
  border: 1px solid var(--color-border);
  max-height: 500px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
    position: sticky;
    top: 0;
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

const AttendanceTable = ({ attendanceData }: AttendanceTableProps) => {
    const isAdmin = useAuthStore((s) => s.isAdmin);
    const [editData, setEditData] = useState<Attendance>({} as Attendance);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    // 사번 기준 그룹화
    const grouped = React.useMemo(() => {
        if (!isAdmin) return [];
        const map = new Map<number, Attendance[]>();
        attendanceData.forEach((a) => {
            if (!a.emp_id) return;
            if (!map.has(a.emp_id)) map.set(a.emp_id, []);
            map.get(a.emp_id)!.push(a);
        });
        return Array.from(map.entries());
    }, [attendanceData]);

    // 수정을 위한 map형태 데이터를 생성
    const groupedMap = useMemo(() => {
        if (!isAdmin) return new Map<number, Attendance[]>();
        const map = new Map<number, Attendance[]>();
        attendanceData.forEach((a) => {
            if (!a.emp_id) return;
            if (!map.has(a.emp_id)) map.set(a.emp_id, []);
            map.get(a.emp_id)!.push(a);
        });
        return map;
    }, [attendanceData]);

    // 수정하려는 사번+날짜 데이터를 꺼냄
    const findAttendance = (empId: number, date: string) => {
        const records = groupedMap.get(empId);
        if (!records) return null;
        return records.find((r) => r.date === date) || null;
    };

    const handleEdit = (empId: number, date: string) => {
        const targetData = findAttendance(empId, date);
        setEditData(targetData ?? {} as Attendance);

        setIsEditing(true);
    }

    const handleSave = (data: Attendance) => {
        // 실제 데이터를 수정하는 요청을 날리고 
        setEditData({} as Attendance);
    }

    return (
        <TableContainer>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        {isAdmin && <TableHeaderCell>사번</TableHeaderCell>}
                        {isAdmin && <TableHeaderCell>이름</TableHeaderCell>}
                        <TableHeaderCell>날짜</TableHeaderCell>
                        <TableHeaderCell>출근</TableHeaderCell>
                        <TableHeaderCell>퇴근</TableHeaderCell>
                        <TableHeaderCell>근무시간</TableHeaderCell>
                        <TableHeaderCell>상태</TableHeaderCell>
                        <TableHeaderCell>비고</TableHeaderCell>
                        {isAdmin && <TableHeaderCell> </TableHeaderCell>}
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
                        isAdmin ? (
                            grouped.map(([empId, records]) =>
                                records.map((attendance, i) => (
                                    <TableRow key={`${empId}-${attendance.date}`}>
                                        {/* 첫 번째 행에만 사번/이름 출력 & rowSpan 적용 */}
                                        {i === 0 && (
                                            <TableCell rowSpan={records.length}>{empId}</TableCell>
                                        )}
                                        {i === 0 && (
                                            <TableCell rowSpan={records.length}>{attendance.emp_nm}</TableCell>
                                        )}
                                        <TableCell>{attendance.date || "-"}</TableCell>
                                        <TableCell>{attendance.check_in || "-"}</TableCell>
                                        <TableCell>{attendance.check_out || "-"}</TableCell>
                                        <TableCell>{attendance.work_hours || "-"}</TableCell>
                                        <TableCell>{attendance.status || "-"}</TableCell>
                                        <TableCell>{attendance.remarks || "-"}</TableCell>
                                        <TableCell onClick={() => handleEdit(empId, attendance.date)}><EditIcon size={20} /></TableCell>
                                    </TableRow>
                                ))
                            )
                        ) : (
                            attendanceData.map((attendance) => (
                                <TableRow
                                    key={`${attendance.emp_id}-${attendance.date}`}
                                >
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
                        )

                    )}
                </TableBody>
            </Table>
            {/* 수정 모드 - 데이터가 준비된 후 수정모드를 true로 한 후에 모달을 렌더링 -> data가 제대로 전달됨 */}
            {isEditing && <EditAttendanceModal
                open={isEditing}
                onClose={() => setIsEditing(false)}
                data={editData}
                onSave={handleSave}
            />}
        </TableContainer>
    );
};

export default AttendanceTable;


