"use client";

import styled from "styled-components";
import Link from "next/link";

interface WorkSummaryCardProps {
  workDays?: number;
  lateCount?: number;
  absenceCount?: number;
  attendanceRate?: number;
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
  margin: 16px 0;
`;

const SummaryItem = styled.div`
  font-size: 14px;
  color: var(--color-text);
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  
  &:last-of-type:not(:last-child) {
    margin-bottom: 0;
    margin-top: 16px;
    font-weight: 600;
  }
`;

const SummaryLabel = styled.span`
  font-weight: 400;
`;

const SummaryValue = styled.span`
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

const WorkSummaryCard = ({
  workDays = 0,
  lateCount = 0,
  absenceCount = 0,
  attendanceRate = 0,
}: WorkSummaryCardProps) => {
  return (
    <CardContainer>
      <CardTitle>근무 요약</CardTitle>
      <SummaryItem>
        <SummaryLabel>근무일수</SummaryLabel>
        <SummaryValue>{workDays}일</SummaryValue>
      </SummaryItem>
      <Divider />
      <SummaryItem>
        <SummaryLabel>지각</SummaryLabel>
        <SummaryValue>{lateCount}회</SummaryValue>
      </SummaryItem>
      <SummaryItem>
        <SummaryLabel>결근</SummaryLabel>
        <SummaryValue>{absenceCount}회</SummaryValue>
      </SummaryItem>
      <SummaryItem>
        <SummaryLabel>이번달 출근율</SummaryLabel>
        <SummaryValue>{attendanceRate}%</SummaryValue>
      </SummaryItem>
      <LinkText href="/attendance">
        출퇴근 내역 조회 →
      </LinkText>
    </CardContainer>
  );
};

export default WorkSummaryCard;
