import { Role } from "@/app/(auth)/login/loginAction";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const jar = await cookies();
    const role = (jar.get("role")?.value as Role) ?? null;
    if (role !== 'admin') {
        // 접근 권한이 없음을 안내 
        redirect('/')
    }

    return <>{children}</>;
}

// admin 전용 페이지 가드를 위한 컴포넌트
// 여기서는 어드민만 접근 가능함에 따라 '사원이 해당 경로로 접근'할 경우에 대한 처리 