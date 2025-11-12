"use client";

import PeriodPicker from "@/components/DatePicker/PeriodPicker";
import { getAttendances } from "@/services/attendanceService";
import { Attendance, AttendancesResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import AttendanceWithWeeks from "./AttendanceWithWeeks";
import { FilterLabel, FilterSection, FilterSelect, SearchButton, SearchInput, SearchInputBox } from "../employees/Employees.view";
import Select from "@/components/Input/Select/Select";
import { PeriodBlock, PeriodPickerWrapper, Title } from "./Attendance.view";

// 날짜를 "yyyy-MM" 형태로 변환 -> 서버에서 초기 데이터 불러올 때의 쿼리키와 일치해야함 
function formatMonth(date: Date | null) {
    const target = date ?? new Date(); // null이면 오늘 날짜로 대체
    const y = target.getFullYear();
    const m = String(target.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
}

const AttendanceAdminView = () => {
    // const [attendances, setAttendances] = useState<Attendance[]>(initialAttendances);
    const [month, setMonth] = useState<Date | null>(new Date());

    // 필터 상태
    const [department, setDepartment] = useState<string>("");
    const [grade, setGrade] = useState<string>("");

    // --- 이름: 입력 중과 제출 값을 분리 ---
    const [nameInput, setNameInput] = useState(""); // 입력 중
    const [name, setName] = useState("");           // 제출된 값 (쿼리에 쓰임)

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

    const ym = useMemo(() => formatMonth(month), [month]);

    // const { data: attendances = [], isFetching, refetch } = useQuery<
    //     AttendancesResponse,        // 쿼리 함수가 반환하는 원본 타입
    //     Error,                      // 에러 타입
    //     Attendance[]    // 실제로 사용하는 데이터 타입
    // >({
    //     queryKey: ["attendance", ym],
    //     queryFn: () => getAttendances(ym),
    //     enabled: !!ym, // ym이 있을 때만 실행
    //     staleTime: 1000 * 60 * 3, // 3분 동안 캐시 유지
    //     select: (res) => res.attendances ?? [], // 배열만 꺼내서 전달
    // });

    // 쿼리키에 '제출된 이름'만 포함 -> 이름은 버튼 눌러야 반영됨
    const { data: attendances = [], isFetching, refetch } = useQuery<
        AttendancesResponse,        // 쿼리 함수가 반환하는 원본 타입
        Error,                      // 에러 타입
        Attendance[]    // 실제로 사용하는 데이터 타입
    >({
        queryKey: ["attendance", ym, department, grade, name],
        queryFn: () => getAttendances({ ym, department, grade, name }),
        enabled: !!ym, // ym이 있을 때만 실행
        staleTime: 1000 * 60 * 3,
        select: (res) => res.attendances ?? [], // 배열만 꺼내서 전달
    });

    const handleFetchByMonth = async () => {
        await refetch();
    };

    const handleSearch = () => {

    }

    return (
        <div>
            <Title className="text-2xl font-bold">출퇴근 내역 조회</Title>
            <PeriodBlock>
                <PeriodPickerWrapper>
                    <PeriodPicker mode={"month"} value={month} onChange={setMonth} />
                </PeriodPickerWrapper>
            </PeriodBlock>

            <FilterSection>
                <FilterLabel>부서</FilterLabel>
                <FilterSelect>
                    <Select
                        value={department}
                        onChange={setDepartment}
                        placeholder="전체"
                        options={departmentOptions}
                    />
                </FilterSelect>

                <FilterLabel>직급</FilterLabel>
                <FilterSelect>
                    <Select
                        value={grade}
                        onChange={setGrade}
                        placeholder="전체"
                        options={gradeOptions}
                    />
                </FilterSelect>
                <SearchInput>
                    <SearchInputBox
                        type="text"
                        placeholder="이름 또는 이메일 검색"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && setName(nameInput)}
                        style={{
                            width: "100%",
                            height: "40px",
                            padding: "0 12px",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            fontSize: "14px",
                        }}
                    />
                </SearchInput>

                <SearchButton type="button" onClick={handleFetchByMonth}>조회</SearchButton>
            </FilterSection>

            <div>
                <AttendanceWithWeeks monthlyData={attendances} month={month ?? new Date()} />
            </div>
        </div>
    )
}

export default AttendanceAdminView;