"use client";

import styled from "styled-components";
import { useState, useEffect } from "react";

interface ClockProps {
  size?: "small" | "medium" | "large";
}

const ClockContainer = styled.div<{ $size: "small" | "medium" | "large" }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => (props.$size === "large" ? "20px" : "12px")};
  padding: ${(props) => (props.$size === "large" ? "40px" : "20px")};
`;

const TimeDisplay = styled.div<{ $size: "small" | "medium" | "large" }>`
  font-size: ${(props) => {
    if (props.$size === "large") return "72px";
    if (props.$size === "medium") return "48px";
    return "32px";
  }};
  font-weight: 700;
  color: var(--color-text);
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.03em;
  line-height: 1;
`;

const DateDisplay = styled.div<{ $size: "small" | "medium" | "large" }>`
  font-size: ${(props) => {
    if (props.$size === "large") return "24px";
    if (props.$size === "medium") return "18px";
    return "14px";
  }};
  color: var(--color-text-secondary);
  font-weight: 500;
  letter-spacing: -0.01em;
`;

const Clock = ({ size = "medium" }: ClockProps) => {
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
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()];
    return `${year}.${month}.${day} (${weekday})`;
  };

  return (
    <ClockContainer $size={size}>
      <TimeDisplay $size={size}>{formatTime(currentTime)}</TimeDisplay>
      <DateDisplay $size={size}>{formatDate(currentTime)}</DateDisplay>
    </ClockContainer>
  );
};

export default Clock;
