"use client";

import Button from "@/components/Button/Button";
import { useAuthStore } from "@/stores/authStore";
import styled from "styled-components";

const Title = styled.h1`
 margin-top : 0;
`;

const AttendanceView = () => {
    const setIsAdmin = useAuthStore((s) => s.setIsAdmin);
    const isAdmin = useAuthStore((s) => s.isAdmin);

    const testAdmin = () => {
        setIsAdmin(!isAdmin);
    }

    return (
        <div>
            <Title className="text-2xl font-bold">출퇴근 내역 조회</Title>
            <Button onClick={testAdmin} type="button">관리자 권한 토글(테스트)</Button>
        </div>
    )
}

export default AttendanceView;