"use client";

import styled from "styled-components";
import AttendanceButton from "@/components/AttendanceButton/AttendanceButton";
import { useState, useEffect } from "react";

type Status = "beforeWork" | "working" | "afterWork";

interface WorkStatusCardProps {
  status: Status;
  checkInTime?: string;
  checkOutTime?: string;
  onCheckIn?: () => void;
  onCheckOut?: () => void;
}

const CardContainer = styled.div`
  position: relative;
  background-color: var(--color-background);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 100%;
  min-height: 250px;
`;

const TimeInfo = styled.div`
  font-size: 20px;
  color: var(--color-text);
  margin-bottom: 16px;
  font-weight: 400;
  text-align: right;
  margin-right: 20px;
`;

const ClockDisplay = styled.div`
  font-size: 54px;
  font-weight: 400;
  color: var(--color-text);
  margin: 24px 0;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.03em;
  text-align: center;
  line-height: 1;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const DateBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const DateText = styled.span`
  font-size: 20px;
  color: var(--color-text);
  font-weight: 400;
`;

const StatusBadgeWrapper = styled.div`
  position: absolute;
  top: 18px;
  right: 16px;
`;

const StatusBadge = styled.div`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 400;
  background-color: #d9d9d9;
  color: var(--color-text);
`;

const DisabledButton = styled.div`
  width: 150px;
  height: 35px;
  border-radius: 10px;
  background-color: #f3ecec;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #d9d9d9;
  margin: 0 auto;
  margin-top: 24px;
`;

const StyledCheckOutButton = styled.button`
  width: 400px;
  height: 45px;
  border-radius: 10px;
  background-color: #00c2c4;
  border: none;
  color: white;
  font-size: 24px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #0B898A;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const WorkStatusCard = ({
  status,
  checkInTime,
  checkOutTime,
  onCheckIn,
  onCheckOut,
}: WorkStatusCardProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()];
    return `${month}.${day} (${weekday})`;
  };

  // 출근 전 상태
  if (status === "beforeWork") {
    return (
      <CardContainer>
        <ClockDisplay $size="large">{formatTime(currentTime)}</ClockDisplay>
        <ButtonWrapper>
          <AttendanceButton type="checkIn" onClick={onCheckIn || (() => {})} />
        </ButtonWrapper>
      </CardContainer>
    );
  }

  // 근무 중 상태
  if (status === "working") {
    const timeDisplay = checkInTime 
      ? `출근 : ${checkInTime} | 퇴근 : --`
      : "";

    return (
      <CardContainer>
        <DateBadge>
          <DateText>📅 {formatDate(currentTime)}</DateText>
        </DateBadge>
        <TimeInfo>{timeDisplay}</TimeInfo>
        <ClockDisplay>{formatTime(currentTime)}</ClockDisplay>
        <ButtonWrapper>
          <StyledCheckOutButton onClick={onCheckOut || (() => {})}>
            퇴근
          </StyledCheckOutButton>
        </ButtonWrapper>
      </CardContainer>
    );
  }

  // 퇴근 후 상태
  const timeDisplay = checkInTime && checkOutTime
    ? `출근 : ${checkInTime} | 퇴근 : ${checkOutTime}`
    : "";

  return (
    <CardContainer>
      <TimeInfo>{timeDisplay}</TimeInfo>
      <ClockDisplay $size="large">{formatTime(currentTime)}</ClockDisplay>
      <DisabledButton>퇴근</DisabledButton>
    </CardContainer>
  );
};

export default WorkStatusCard;
