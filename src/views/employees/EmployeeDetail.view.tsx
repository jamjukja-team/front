"use client";

import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { Employee } from "@/types/api";
import { AccountCircleIcon } from "@/utils/icons";

interface EmployeeDetailViewProps {
  employee?: Employee;
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

const AvatarContainer = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #9ca3af;
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
  font-size: 12px;
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

const InfoText = styled.p`
  font-size: 14px;
  color: var(--color-text);
  margin: 4px 0;
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

const DetailTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 16px 0;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  font-size: 14px;
  color: var(--color-text);
`;

const DetailValue = styled.span`
  font-size: 14px;
  color: var(--color-text);
  font-weight: 400;
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

const ResendLink = styled(Link)`
  font-size: 14px;
  color: var(--color-primary);
  text-decoration: none;
  margin-top: 8px;
  display: inline-block;

  &:hover {
    text-decoration: underline;
  }
`;

const EmployeeDetailView = ({ employee }: EmployeeDetailViewProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isResignModalOpen, setIsResignModalOpen] = useState(false);

  if (!employee) {
    return (
      <Container>
        <div>사원 정보를 찾을 수 없습니다.</div>
      </Container>
    );
  }

  // 근속기간 계산 (간단한 예시)
  const calculateServicePeriod = () => {
    if (!employee.hire_date) return "0일";
    // 실제로는 날짜 계산 로직 필요
    return "1일";
  };

  return (
    <Container>
      <BackLink href="/employees">← 사원 상세</BackLink>

      <ProfileSection>
        <AvatarContainer>
          <AccountCircleIcon />
        </AvatarContainer>
        <ProfileInfo>
          <NameRow>
            <Name>{employee.emp_nm || "-"}</Name>
            <StatusBadge $status="재직">재직</StatusBadge>
          </NameRow>
          <InfoText>생년월일 {employee.birth_date || "-"}</InfoText>
          <InfoText>직급/부서 {employee.grade_id || "-"} / {employee.dept_id || "-"}</InfoText>
        </ProfileInfo>
      </ProfileSection>

      <DetailsSection>
        <DetailCard>
          <DetailTitle>기본 정보</DetailTitle>
          <DetailItem>
            <DetailLabel>입사일</DetailLabel>
            <DetailValue>{employee.hire_date || "-"}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>근속기간</DetailLabel>
            <DetailValue>{calculateServicePeriod()}</DetailValue>
          </DetailItem>
        </DetailCard>

        <DetailCard>
          <DetailTitle>연락처</DetailTitle>
          <DetailItem>
            <DetailLabel>연락처</DetailLabel>
            <DetailValue>{employee.email || "-"}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>이메일</DetailLabel>
            <DetailValue>{employee.email || "-"}</DetailValue>
          </DetailItem>
        </DetailCard>
      </DetailsSection>

      <DetailCard>
        <DetailTitle>연차 현황</DetailTitle>
        <DetailItem>
          <DetailLabel>총 연차</DetailLabel>
          <DetailValue>13일</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>사용 연차</DetailLabel>
          <DetailValue>0일</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>잔여 연차</DetailLabel>
          <DetailValue>13일</DetailValue>
        </DetailItem>
      </DetailCard>

      <ActionSection>
        <ActionButton onClick={() => setIsEditModalOpen(true)}>
          정보 수정
        </ActionButton>
        <ActionButton onClick={() => setIsDeactivateModalOpen(true)}>
          비활성화
        </ActionButton>
        <ActionButton onClick={() => setIsResignModalOpen(true)}>
          퇴직처리
        </ActionButton>
      </ActionSection>

      <ResendLink href="#">초대 메일 재발송</ResendLink>
    </Container>
  );
};

export default EmployeeDetailView;
