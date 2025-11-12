"use server";

import { cookies } from "next/headers";
import { postLogin } from "@/services/authService";

// role 타입
export type Role = "admin" | "employee";

export type LoginSuccess = { ok: true; role: Role };
export type LoginFail = { ok: false; error: string };
export type LoginResult = LoginSuccess | LoginFail;

export async function loginAction(email: string, password: string): Promise<LoginResult> {
    try {
        // const res = await postLogin({ email, password });
        // const role: Role = res.role; // 실제 응답값에서 role을 받는다고 가정
        const role: Role = "admin"; // 임시로 admin으로 설정

        const cookieStore = await cookies();

        cookieStore.set("role", role, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return { ok: true, role };
    } catch (e) {
        return { ok: false, error: "로그인 실패" };
    }
}