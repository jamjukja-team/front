"use client";

import styled from "styled-components";
import Link from "next/link";
import { Employee } from "@/types/api";

interface EmployeeTableProps {
  employees: Employee[];
  onEmployeeClick?: (employee: Employee) => void;
}

const TableContainer = styled.div`
  width: 100%;
  background-color: var(--color-background);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: var(--color-gray-100);
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
  border-right: 1px solid var(--color-border);

  &:last-child {
    border-right: none;
  }
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
  border-right: 1px solid var(--color-border);

  &:last-child {
    border-right: none;
  }
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 400;
  background-color: ${({ $status }) => {
    switch ($status) {
      case "재직":
        return "#dbeafe";
      case "퇴직":
        return "#fee2e2";
      case "휴직":
        return "#fef3c7";
      case "입사예정":
        return "#e0e7ff";
      default:
        return "#e5e7eb";
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case "재직":
        return "#1e40af";
      case "퇴직":
        return "#991b1b";
      case "휴직":
        return "#92400e";
      case "입사예정":
        return "#3730a3";
      default:
        return "#374151";
    }
  }};
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

const EmployeeTable = ({ employees, onEmployeeClick }: EmployeeTableProps) => {
  const handleRowClick = (employee: Employee) => {
    if (onEmployeeClick) {
      onEmployeeClick(employee);
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderCell>사번</TableHeaderCell>
            <TableHeaderCell>이름</TableHeaderCell>
            <TableHeaderCell>부서</TableHeaderCell>
            <TableHeaderCell>직급</TableHeaderCell>
            <TableHeaderCell>입사일</TableHeaderCell>
            <TableHeaderCell>재직상태</TableHeaderCell>
            <TableHeaderCell>계정상태</TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} style={{ textAlign: "center", padding: "40px" }}>
                조회된 결과가 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            employees.map((employee) => (
              <TableRow
                key={employee.emp_id}
                onClick={() => handleRowClick(employee)}
              >
                <TableCell>{employee.emp_id || "-"}</TableCell>
                <TableCell>
                  <Link
                    href={`/employees/${employee.emp_id}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {employee.emp_nm || "-"}
                  </Link>
                </TableCell>
                <TableCell>{employee.dept_id || "-"}</TableCell>
                <TableCell>{employee.grade_id || "-"}</TableCell>
                <TableCell>
                  {employee.hire_date
                    ? employee.hire_date.replace(/\./g, ".")
                    : "-"}
                </TableCell>
                <TableCell>
                  <StatusBadge $status="재직">재직</StatusBadge>
                </TableCell>
                <TableCell>
                  <AccountStatusBadge $active={true}>활성</AccountStatusBadge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;

