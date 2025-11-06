"use client";

import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { Employee } from "@/types/api";

interface EmployeeDetailViewProps {
  employee: Employee | null | undefined;
  employeeId: string;
}

const Container = styled.main`
  width: 100%;
  padding: 40px;
  background-color: var(--color-gray-50);
  min-height: calc(100vh - 80px);
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  margin-bottom: 24px;

  &:hover {
    color: var(--color-primary);
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 32px;
`;

const Avatar = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const Name = styled.h1`
  font-size: 34px;
  font-weight: 500;
  color: var(--color-text);
  margin: 0;
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 400;
  background-color: ${({ $status }) => {
    switch ($status) {
      case "재직":
        return "#dbeafe";
      case "퇴직":
        return "#fee2e2";
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
      default:
        return "#374151";
    }
  }};
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  font-size: 14px;
  color: var(--color-text);
`;

const InfoLabel = styled.span`
  font-weight: 400;
`;

const InfoValue = styled.span`
  font-weight: 400;
`;

const DetailsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
`;

const DetailCard = styled.div`
  background-color: var(--color-background);
  padding: 20px;
  border-radius: 8px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;
  color: var(--color-text);

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-weight: 400;
`;

const DetailValue = styled.span`
  font-weight: 400;
`;

const LeaveStatusSection = styled.div`
  background-color: var(--color-background);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 16px 0;
`;

const LeaveStatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
`;

const LeaveStatusRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }
`;

const LeaveStatusCell = styled.div`
  padding: 12px;
  text-align: center;
  font-size: 14px;
  color: var(--color-text);
  border-right: 1px solid var(--color-border);

  &:last-child {
    border-right: none;
  }
`;

const LeaveStatusHeader = styled(LeaveStatusCell)`
  font-weight: 600;
  background-color: var(--color-gray-50);
`;

const ActionSection = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const ActionButton = styled(Button)`
  width: 150px;
  height: 40px;
  background-color: #0B898A;
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

const DeactivateButton = styled(ActionButton)`
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid #d1d5db;
`;

const ResignButton = styled(ActionButton)`
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid #d1d5db;
`;

const ResendLink = styled(Link)`
  font-size: 14px;
  color: var(--color-primary);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const EmployeeDetailView = ({
  employee,
  employeeId,
}: EmployeeDetailViewProps) => {
  const [isResigned, setIsResigned] = useState(false);

  if (!employee) {
    return (
      <Container>
        <BackLink href="/employees">← 사원 상세</BackLink>
        <div>사원을 찾을 수 없습니다.</div>
      </Container>
    );
  }

  const status = isResigned ? "퇴직" : "재직";

  return (
    <Container>
      <BackLink href="/employees">← 사원 상세</BackLink>

      <ProfileSection>
        <Avatar>
          {employee.photo ? (
            <img
              src={employee.photo}
              alt={employee.emp_nm}
              style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontSize: "48px", color: "#9ca3af" }}>👤</span>
          )}
        </Avatar>
        <ProfileInfo>
          <NameRow>
            <Name>{employee.emp_nm || "-"}</Name>
            <StatusBadge $status={status}>{status}</StatusBadge>
          </NameRow>
          <InfoRow>
            <InfoLabel>생년월일</InfoLabel>
            <InfoValue>{employee.birth_date || "-"}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>직급/부서</InfoLabel>
            <InfoValue>
              {employee.dept_id || "-"} / {employee.grade_id || "-"}
            </InfoValue>
          </InfoRow>
        </ProfileInfo>
      </ProfileSection>

      <DetailsSection>
        <DetailCard>
          <DetailRow>
            <DetailLabel>입사일</DetailLabel>
            <DetailValue>{employee.hire_date || "-"}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>근속기간</DetailLabel>
            <DetailValue>1일</DetailValue>
          </DetailRow>
        </DetailCard>
        <DetailCard>
          <DetailRow>
            <DetailLabel>연락처</DetailLabel>
            <DetailValue>010-9160-2600</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>이메일</DetailLabel>
            <DetailValue>{employee.email || "-"}</DetailValue>
          </DetailRow>
        </DetailCard>
      </DetailsSection>

      <LeaveStatusSection>
        <SectionTitle>연차 현황</SectionTitle>
        <LeaveStatusGrid>
          <LeaveStatusRow>
            <LeaveStatusHeader>총 연차</LeaveStatusHeader>
            <LeaveStatusHeader>사용 연차</LeaveStatusHeader>
            <LeaveStatusHeader>잔여 연차</LeaveStatusHeader>
          </LeaveStatusRow>
          <LeaveStatusRow>
            <LeaveStatusCell>13일</LeaveStatusCell>
            <LeaveStatusCell>0일</LeaveStatusCell>
            <LeaveStatusCell>13일</LeaveStatusCell>
          </LeaveStatusRow>
        </LeaveStatusGrid>
      </LeaveStatusSection>

      <ActionSection>
        <ActionButton>정보 수정</ActionButton>
        <DeactivateButton>비활성화</DeactivateButton>
        <ResignButton>퇴직처리</ResignButton>
      </ActionSection>

      <ResendLink href="#">초대 메일 재발송</ResendLink>
    </Container>
  );
};

export default EmployeeDetailView;

