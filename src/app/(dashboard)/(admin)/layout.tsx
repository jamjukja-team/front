// admin 전용 페이지 가드를 위한 컴포넌트
// 로그인 response로 받은 role을 기반으로 접근 제어 및 리다이렉트 (서버 컴포넌트)
// 혹은 클라이언트 컴포넌트에서 useAuthStore로 role을 확인하여 접근 제어 가능

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}