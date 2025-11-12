import DashboardLayout from "@/components/Layout/DashboardLayout";
import AuthProvider from "@/components/Providers/AuthProvider";
import { cookies } from "next/headers";
import { Role } from "../(auth)/login/loginAction";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  const role = (jar.get("role")?.value as Role) ?? null;
  if (!role) redirect("/login");

  return (
    <DashboardLayout>
      <AuthProvider initialRole={role}>
        {children}
      </AuthProvider>
    </DashboardLayout>
  );
}

// 여기서는 로그인 후의 모든 사용자들에게 '사원/어드민' 뷰에 대한 분기처리. 같은 경로여도 보여지는 ui가 달라야 함. 
// role이 없다면 로그인하지 않은 것으로 간주하여 '로그인 페이지'로 이동. 로그인은 했지만 쿠키에 저장하는 것에 실패한다면? 