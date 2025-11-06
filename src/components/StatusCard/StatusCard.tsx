"use client";

import styled from "styled-components";

interface StatusCardProps {
  status: "beforeWork" | "working" | "afterWork";
  checkInTime?: string;
  checkOutTime?: string;
  workingHours?: string;
}

const CardContainer = styled.div<{ $status: string }>`
  padding: 32px;
  background-color: var(--color-background);
  border-radius: 16px;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 450px;
`;

const StatusBadge = styled.div<{ $status: string }>`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 20px;
  background-color: ${(props) => {
    if (props.$status === "beforeWork") return "#fef3c7";
    if (props.$status === "working") return "#dbeafe";
    return "#f3f4f6";
  }};
  color: ${(props) => {
    if (props.$status === "beforeWork") return "#92400e";
    if (props.$status === "working") return "#1e40af";
    return "#6b7280";
  }};
`;

const StatusText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 12px;
`;

const TimeInfo = styled.div`
  font-size: 15px;
  color: var(--color-text-secondary);
  margin-top: 16px;
`;

const TimeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding: 8px 0;
  
  span:first-child {
    font-weight: 500;
    color: var(--color-text);
  }
  
  span:last-child {
    font-weight: 600;
    color: var(--color-text);
  }
`;

const StatusCard = ({
  status,
  checkInTime,
  checkOutTime,
  workingHours,
}: StatusCardProps) => {
  const getStatusText = () => {
    if (status === "beforeWork") return "출근 전";
    if (status === "working") return "근무 중";
    return "퇴근 완료";
  };

  return (
    <CardContainer $status={status}>
      <StatusBadge $status={status}>{getStatusText()}</StatusBadge>
      <StatusText>{getStatusText()}</StatusText>
      {checkInTime && (
        <TimeInfo>
          <TimeRow>
            <span>출근 시간:</span>
            <span>{checkInTime}</span>
          </TimeRow>
        </TimeInfo>
      )}
      {checkOutTime && (
        <TimeInfo>
          <TimeRow>
            <span>퇴근 시간:</span>
            <span>{checkOutTime}</span>
          </TimeRow>
        </TimeInfo>
      )}
      {workingHours && (
        <TimeInfo>
          <TimeRow>
            <span>근무 시간:</span>
            <span>{workingHours}</span>
          </TimeRow>
        </TimeInfo>
      )}
    </CardContainer>
  );
};

export default StatusCard;
