"use client";

import styled from "styled-components";
import { useState, useEffect } from "react";
import WorkStatusCard from "@/components/Card/WorkStatusCard";
import WorkSummaryCard from "@/components/Card/WorkSummaryCard";
import LeaveStatusCard from "@/components/Card/LeaveStatusCard";
import WorkHoursChart from "@/components/Chart/WorkHoursChart";

type AttendanceStatus = "beforeWork" | "working" | "afterWork";

interface HomeViewProps {
  onCheckIn?: () => void;
  onCheckOut?: () => void;
}

const HomeContainer = styled.main`
  width: 100%;
  padding: 40px;
  background-color: var(--color-gray-50);
  min-height: calc(100vh - 80px);
`;

const HeaderSection = styled.div`
  margin-bottom: 32px;
`;

const WelcomeText = styled.h1`
  font-size: 30px;
  font-weight: 500;
  color: var(--color-text);
  margin: 0 0 8px 0;
`;

const DateBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const DateText = styled.span`
  font-size: 14px;
  color: var(--color-text-secondary);
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  background-color: #dbeafe;
  color: #1e40af;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BottomGrid = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;


const HomeView = ({ onCheckIn, onCheckOut }: HomeViewProps) => {
  const [status, setStatus] = useState<AttendanceStatus>("beforeWork");
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [workingHours, setWorkingHours] = useState<string | null>(null);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === "undefined") return;

    // 현재 시간과 상태를 기반으로 상태 결정
    const now = new Date();
    const currentHour = now.getHours();

    // 로컬 스토리지에서 출퇴근 정보 가져오기
    const savedCheckIn = localStorage.getItem("checkInTime");
    const savedCheckOut = localStorage.getItem("checkOutTime");
    const savedStatus = localStorage.getItem("attendanceStatus") as AttendanceStatus | null;

    if (savedCheckIn) {
      const checkInDate = new Date(savedCheckIn);
      const timeString = checkInDate.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCheckInTime(timeString);
      
      if (savedStatus === "working") {
        setStatus("working");
        // 근무 시간 계산
        const diff = now.getTime() - checkInDate.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setWorkingHours(`${hours}시간 ${minutes}분`);
      }
    }

    if (savedCheckOut) {
      const checkOutDate = new Date(savedCheckOut);
      const timeString = checkOutDate.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCheckOutTime(timeString);
      setStatus("afterWork");
    }

    // 12시가 넘었고 출근 기록이 없으면 출근 전 상태
    if (currentHour >= 12 && !savedCheckIn) {
      setStatus("beforeWork");
    }

    // 근무 중이면 근무 시간 업데이트
    if (savedStatus === "working" && savedCheckIn) {
      const interval = setInterval(() => {
        const checkIn = new Date(savedCheckIn);
        const diff = now.getTime() - checkIn.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setWorkingHours(`${hours}시간 ${minutes}분`);
      }, 60000); // 1분마다 업데이트

      return () => clearInterval(interval);
    }
  }, []);

  const handleCheckIn = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setCheckInTime(timeString);
    setStatus("working");
    localStorage.setItem("checkInTime", now.toISOString());
    localStorage.setItem("attendanceStatus", "working");
    onCheckIn?.();
  };

  const handleCheckOut = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setCheckOutTime(timeString);
    setStatus("afterWork");
    localStorage.setItem("checkOutTime", now.toISOString());
    localStorage.setItem("attendanceStatus", "afterWork");
    
    // 근무 시간 계산
    const savedCheckIn = localStorage.getItem("checkInTime");
    if (savedCheckIn) {
      const checkIn = new Date(savedCheckIn);
      const diff = now.getTime() - checkIn.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setWorkingHours(`${hours}시간 ${minutes}분`);
    }
    
    onCheckOut?.();
  };

  // 샘플 데이터 (실제로는 API에서 가져와야 함)
  const workSummaryData = {
    workDays: 18,
    lateCount: 1,
    absenceCount: 0,
    attendanceRate: 95.2,
  };

  const leaveStatusData = {
    remainingDays: 5,
    totalDays: 13,
    usedThisMonth: 1,
    lastUsed: "10.20 (월)",
  };

  const chartData = [
    { date: "10.20 (월)", hours: 8, overtime: 0 },
    { date: "10.21 (화)", hours: 8, overtime: 0 },
    { date: "10.22 (수)", hours: 8, overtime: 2 },
    { date: "10.23 (목)", hours: 8, overtime: 0 },
    { date: "10.24 (금)", hours: 8, overtime: 0 },
    { date: "10.25 (토)", hours: 0, overtime: 4 },
    { date: "10.26 (일)", hours: 0, overtime: 0 },
  ];


  const formatDate = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()];
    return `${month}.${day} (${weekday})`;
  };

  return (
    <HomeContainer>
      <HeaderSection>
        <WelcomeText>환영합니다, 김희은님</WelcomeText>
        <DateBadge>
          <DateText>📅 {formatDate(new Date())}</DateText>
          {status === "working" && <StatusBadge>근무중</StatusBadge>}
        </DateBadge>
      </HeaderSection>

      <GridContainer>
        <WorkStatusCard
          status={status}
          checkInTime={checkInTime || undefined}
          checkOutTime={checkOutTime || undefined}
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
        />
        <WorkSummaryCard {...workSummaryData} />
        <LeaveStatusCard {...leaveStatusData} />
      </GridContainer>

      <BottomGrid>
        <WorkHoursChart data={chartData} />
      </BottomGrid>
    </HomeContainer>
  );
};

export default HomeView;
