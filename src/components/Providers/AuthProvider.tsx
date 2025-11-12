"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { Role } from "@/app/(auth)/login/loginAction";

export default function AuthProvider({
    initialRole,
    children,
}: {
    initialRole: Role;
    children: React.ReactNode;
}) {
    const setIsAdmin = useAuthStore((s) => s.setIsAdmin);

    useEffect(() => {
        // 서버 쿠키에서 읽은 role로 클라 상태 시드
        setIsAdmin(!!(initialRole === 'admin'));
    }, [initialRole]);

    return <>{children}</>;
}