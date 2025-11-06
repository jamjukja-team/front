"use client";

import styled from "styled-components";
import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { Employee } from "@/types/api";
import { getEmployees } from "@/services/employeeService";

interface EmployeesViewProps {
  initialEmployees?: Employee[];
}

const Container = styled.main`
  width: 100%;
  padding: 40px;
  background-color: var(--color-gray-50);
  min-height: calc(100vh - 80px);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 500;
  color: var(--color-text);
  margin: 0;
`;

const RegisterButton = styled(Button)`
  width: 92px;
  height: 40px;
  background-color: #0B898A;
  color: white;
  font-size: 14px;
  font-weight: 500;
`;

const EmployeesView = ({ initialEmployees = [] }: EmployeesViewProps) => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 클라이언트에서 데이터 새로고침
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await getEmployees();
        setEmployees(response.employees || []);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      } finally {
        setLoading(false);
      }
    };

    if (initialEmployees.length === 0) {
      fetchEmployees();
    }
  }, [initialEmployees.length]);

  return (
    <Container>
      <Header>
        <Title>사원 조회</Title>
        <Link href="/register">
          <RegisterButton>사원 등록</RegisterButton>
        </Link>
      </Header>
      {/* 필터 및 테이블은 다음 커밋에서 추가 */}
      {loading ? (
        <div>로딩 중...</div>
      ) : (
        <div>사원 목록: {employees.length}명</div>
      )}
    </Container>
  );
};

export default EmployeesView;

