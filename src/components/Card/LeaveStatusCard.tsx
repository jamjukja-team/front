"use client";

import styled from "styled-components";
import Link from "next/link";

interface LeaveStatusCardProps {
  remainingDays?: number;
  totalDays?: number;
  usedThisMonth?: number;
  lastUsed?: string;
}

const CardContainer = styled.div`
  background-color: var(--color-background);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 16px 0;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 0 0 16px 0;
`;

const StatusItem = styled.div`
  font-size: 14px;
  color: var(--color-text);
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
`;

const StatusLabel = styled.span`
  font-weight: 400;
`;

const StatusValue = styled.span`
  font-weight: 400;
`;

const LinkText = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: auto;
  font-size: 14px;
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    color: var(--color-primary);
  }
`;

const LeaveStatusCard = ({
  remainingDays = 0,
  totalDays = 0,
  usedThisMonth = 0,
  lastUsed = "",
}: LeaveStatusCardProps) => {
  return (
    <CardContainer>
      <CardTitle>휴가 현황</CardTitle>
      <Divider />
      <StatusItem>
        <StatusLabel>잔여 연차</StatusLabel>
        <StatusValue>{remainingDays} / {totalDays}</StatusValue>
      </StatusItem>
      <StatusItem>
        <StatusLabel>이번 달 사용</StatusLabel>
        <StatusValue>{usedThisMonth}일</StatusValue>
      </StatusItem>
      <StatusItem>
        <StatusLabel>최근 사용</StatusLabel>
        <StatusValue>{lastUsed}</StatusValue>
      </StatusItem>
      <LinkText href="#">
        휴가 신청 →
      </LinkText>
    </CardContainer>
  );
};

export default LeaveStatusCard;
