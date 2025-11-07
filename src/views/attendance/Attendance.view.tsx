"use client";

import Button from "@/components/Button/Button";
import PeriodPicker from "@/components/DatePicker/PeriodPicker";
import { getAttendances } from "@/services/attendanceService";
import { useAuthStore } from "@/stores/authStore";
import { Attendance, AttendancesResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import styled from "styled-components";
import AttendanceWithWeeks from "./AttendanceWithWeeks";

interface AttendanceViewProps {
    initialAttendances?: Attendance[];
}

const Title = styled.h1`
 margin-top : 0;
 margin-bottom : 30px;
`;
const PeriodBlock = styled.div`
display : flex;
gap : 12px;

@media (max-width: 768px) {
  flex-direction : column;
}
`
const PeriodPickerWrapper = styled.div`

 /* react-datepicker 기본 래퍼들을 100%로 확장 */
  .react-datepicker-wrapper {
    width: 100%;
    display: block; /* inline-block → block */
  }
  .react-datepicker__input-container {
    width: 100%;
    display: block;
  }
  width: 40%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ViewSwitcherWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 8px;
`;

const TabGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Tab = styled.button<{ $active?: boolean }>`
  background: transparent;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  color: ${({ $active }) => ($active ? "#00C2C4" : "#6B7280")};
  border-bottom: ${({ $active }) => ($active ? "2px solid #00C2C4" : "2px solid transparent")};
  padding-bottom: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: #00C2C4;
  }
`;

const SortButton = styled.button`
  background: transparent;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: #111827;
  }

  &::after {
    content: "↑";
    font-size: 12px;
    color: #9CA3AF;
  }
`;

// 날짜를 "yyyy-MM" 형태로 변환 -> 서버에서 초기 데이터 불러올 때의 쿼리키와 일치해야함 
function formatMonth(date: Date | null) {
    if (!date) return undefined;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
}

const AttendanceView = ({ initialAttendances = [] }: AttendanceViewProps) => {
    // const [attendances, setAttendances] = useState<Attendance[]>(initialAttendances);
    const [viewMode, setViewMode] = useState<"table" | "graph">("table");
    const [month, setMonth] = useState<Date | null>(new Date());
    const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
    const setIsAdmin = useAuthStore((s) => s.setIsAdmin);
    const isAdmin = useAuthStore((s) => s.isAdmin);

    const testAdmin = () => {
        setIsAdmin(!isAdmin);
    }
    const ym = useMemo(() => formatMonth(month), [month]);

    const { data: attendances = [], isFetching, refetch } = useQuery<
        AttendancesResponse,        // 쿼리 함수가 반환하는 원본 타입
        Error,                      // 에러 타입
        Attendance[]    // 실제로 사용하는 데이터 타입
    >({
        queryKey: ["attendance", ym],
        queryFn: () => getAttendances(ym),
        enabled: !!ym, // ym이 있을 때만 실행
        staleTime: 1000 * 60 * 3, // 3분 동안 캐시 유지
        select: (res) => res.attendances ?? [], // 배열만 꺼내서 전달
    });

    const handleFetchByMonth = async () => {
        await refetch();
    };

    return (
        <div>
            <Title className="text-2xl font-bold">출퇴근 내역 조회</Title>
            <PeriodBlock>
                <PeriodPickerWrapper>
                    <PeriodPicker mode={"month"} value={month} onChange={setMonth} />
                </PeriodPickerWrapper>
                <Button onClick={handleFetchByMonth} type="button">조회</Button>
            </PeriodBlock>
            <ViewSwitcherWrapper>
                <TabGroup>
                    <Tab $active={viewMode === "table"} onClick={() => setViewMode("table")}>테이블 보기</Tab>
                    <Tab $active={viewMode === "graph"} onClick={() => setViewMode("graph")}>그래프 보기</Tab>
                </TabGroup>
                <SortButton>날짜순</SortButton>
            </ViewSwitcherWrapper>
            <div>
                {/* <AttendanceTable attendanceData={attendances} /> */}
                <AttendanceWithWeeks monthlyData={attendances} month={month ?? new Date()} mode={viewMode} />
            </div>
            {/* <Button onClick={testAdmin} type="button">관리자 권한 토글(테스트)</Button> */}
        </div>
    )
}

export default AttendanceView;