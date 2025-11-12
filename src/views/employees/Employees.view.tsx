"use client";

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button/Button";
import EmployeeTable from "@/components/Table/EmployeeTable";
import Select from "@/components/Input/Select/Select";
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

export const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const FilterLabel = styled.label`
  font-size: 15px;
  font-weight: 400;
  color: var(--color-text);
  white-space: nowrap;
`;

export const FilterSelect = styled.div`
  width: 96px;
`;

export const SearchInput = styled.div`
  flex: 1;
  min-width: 200px;
  max-width: 301px;
`;

export const SearchInputBox = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
`;

export const SearchButton = styled(Button)`
  width: 82px;
  height: 40px;
  color: white;
  font-size: 14px;
  font-weight: 500;
`;

const SortSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 12px;
  color: var(--color-text-secondary);
`;

const PaginationSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 16px;
  font-size: 14px;
  color: var(--color-text);
`;

const EmployeesView = ({ initialEmployees = [] }: EmployeesViewProps) => {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(initialEmployees);
  const [loading, setLoading] = useState(false);

  // 필터 상태
  const [departmentFilter, setDepartmentFilter] = useState<string>("");
  const [gradeFilter, setGradeFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 옵션
  const departmentOptions = [
    { value: "", label: "전체" },
    { value: "dev", label: "개발팀" },
    { value: "hr", label: "인사팀" },
    { value: "finance", label: "재무팀" },
  ];

  const gradeOptions = [
    { value: "", label: "전체" },
    { value: "emp", label: "사원" },
    { value: "senior", label: "대리" },
    { value: "manager", label: "과장" },
    { value: "team_lead", label: "팀장" },
  ];

  const statusOptions = [
    { value: "", label: "전체" },
    { value: "active", label: "재직" },
    { value: "retired", label: "퇴직" },
    { value: "leave", label: "휴직" },
    { value: "pending", label: "입사예정" },
  ];

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await getEmployees();
        setEmployees(response.employees || []);
        setFilteredEmployees(response.employees || []);
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

  // 필터링 로직
  useEffect(() => {
    let filtered = [...employees];

    // 검색어 필터
    if (searchQuery) {
      filtered = filtered.filter(
        (emp) =>
          emp.emp_nm?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 부서 필터
    if (departmentFilter) {
      filtered = filtered.filter((emp) => emp.dept_id === departmentFilter);
    }

    // 직급 필터
    if (gradeFilter) {
      filtered = filtered.filter((emp) => emp.grade_id === gradeFilter);
    }

    setFilteredEmployees(filtered);
  }, [employees, searchQuery, departmentFilter, gradeFilter, statusFilter]);

  const handleSearch = () => {
    // 검색은 useEffect에서 자동으로 처리됨
  };

  const handleEmployeeClick = (employee: Employee) => {
    // 상세 페이지로 이동
    if (employee.emp_id) {
      router.push(`/employees/${employee.emp_id}`);
    } else {
      console.error("Employee ID is missing:", employee);
    }
  };

  return (
    <Container>
      <Header>
        <Title>사원 조회</Title>
        <Link href="/register">
          <RegisterButton type="button">사원 등록</RegisterButton>
        </Link>
      </Header>

      {/* 필터 섹션 */}
      <FilterSection>
        <FilterLabel>부서</FilterLabel>
        <FilterSelect>
          <Select
            value={departmentFilter}
            onChange={setDepartmentFilter}
            placeholder="전체"
            options={departmentOptions}
          />
        </FilterSelect>

        <FilterLabel>직급</FilterLabel>
        <FilterSelect>
          <Select
            value={gradeFilter}
            onChange={setGradeFilter}
            placeholder="전체"
            options={gradeOptions}
          />
        </FilterSelect>

        <FilterLabel>상태</FilterLabel>
        <FilterSelect>
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="전체"
            options={statusOptions}
          />
        </FilterSelect>

        <SearchInput>
          <SearchInputBox
            type="text"
            placeholder="이름 또는 이메일 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            style={{
              width: "100%",
              height: "40px",
              padding: "0 12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          />
        </SearchInput>

        <SearchButton type="button" onClick={handleSearch}>검색</SearchButton>
      </FilterSection>

      {/* 정렬 섹션 */}
      <SortSection>
        <span>입사일순</span>
      </SortSection>

      {/* 테이블 */}
      {loading ? (
        <div>로딩 중...</div>
      ) : (
        <EmployeeTable
          employees={filteredEmployees}
          onEmployeeClick={handleEmployeeClick}
        />
      )}

      {/* 페이지네이션 */}
      <PaginationSection>
        <span>&lt; 1 / 1 &gt;</span>
      </PaginationSection>
    </Container>
  );
};

export default EmployeesView;

