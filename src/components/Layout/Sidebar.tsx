"use client";

import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarIcon, ClockIcon, FileTextIcon, UserIcon } from "@/utils/icons";
import { useAuthStore } from "@/stores/authStore";

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const LogoBar = styled.div`
  padding: 24px; /* p-6 */
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0px; /* gap-3 */
`;

const LogoMark = styled.div`
  width: 60px; 
  height: 60px; 
  border-radius: 50%;
  border: 2px solid #00C2C4; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  span { font-size: 1.25rem; font-weight: 600; } 
`;

const LogoText = styled.span`
  font-size: 1.25rem; /* text-xl */
  font-weight: 700;   /* font-bold */
`;

const Nav = styled.nav`
  flex: 1;
  padding: 16px;          /* p-4 */
  overflow-y: auto;
`;

const SectionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;            /* gap-3 */
  padding: 8px 12px;    /* px-3 py-2 */
  color: #374151;       /* text-gray-700 */
  margin-top: 16px;     /* mt-4 (맨 위 섹션은 필요 시 제거) */
  &:first-child { margin-top: 0; }
`;

const SectionTitle = styled.span`
  font-weight: 500; /* font-medium */
`;

const SubList = styled.div`
  margin-left: 32px; /* ml-8 */
  display: flex;
  flex-direction: column;
  gap: 4px; /* space-y-1 */
`;

const NavItem = styled(Link) <{ $active?: boolean }>`
  display: block;
  padding: 8px 12px;     
  font-size: 0.875rem;  
  border-radius: 6px;    
  text-decoration: none;
  color: ${({ $active }) => ($active ? "#0B898A" : "#000000")}; /* active: --color-primary-active / default: gray-600 */
  background: ${({ $active }) => ($active ? "#D7F6F8" : "transparent")}; /* active bg */
  font-weight: ${({ $active }) => ($active ? "600" : "400")}; /* active: font-semibold / default: font-normal */

  &:hover {
    background: ${({ $active }) => ($active ? "#D7F6F8" : "#f3f4f6")}; /* hover:bg-gray-100 */
  }
`;

const FooterBar = styled.div`
  padding: 28px;
  // border-top: 1px solid var(--color-border, #e5e7eb);
  margin-top: auto;
  display: flex;
  align-items: center;
  gap : 16px;
  justify-content: flex-start;
`;

const Avatar = styled.div`
  width: 60px; 
  height: 60px;
  border-radius: 50%;
  background: #d1d5db; /* bg-gray-300 */
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 4px; /* gap-3 */
`;

const PasswordBtn = styled.button`
  font-size: 0.875rem; /* text-sm */
  color: #4b5563;      /* text-gray-600 */
  cursor: pointer;
  background: transparent;
  border: 0;
  padding: 0;
  margin-bottom: 8px;
  text-align: left;
  text-decoration: underline;

  &:hover { color: #111827; } /* hover:text-gray-900 */
`;

const LogoutBtn = styled.button`
  font-size: 0.875rem; /* text-sm */
  color: #4b5563;      /* text-gray-600 */
  cursor: pointer;
  background: transparent;
  border: 0;
  padding: 0;
  text-align: left;
  text-decoration: underline;

  &:hover { color: #111827; } /* hover:text-gray-900 */
`;

export default function Sidebar() {
  const pathname = usePathname();
  const isAdmin = useAuthStore((s) => s.isAdmin);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <Aside>
      {/* Logo */}
      <LogoBar>
        <LogoRow>
          <LogoMark><span>HR</span></LogoMark>
          <LogoText>Project</LogoText>
        </LogoRow>
      </LogoBar>

      {/* Navigation */}
      <Nav>
        {/* 대시보드 */}
        <SectionRow>
          <CalendarIcon />
          <SectionTitle>대시보드</SectionTitle>
        </SectionRow>
        <SubList>
          <NavItem href="/" $active={isActive("/") && pathname === "/"}>대시보드</NavItem>
        </SubList>

        {/* 근태 관리 */}
        <SectionRow style={{ marginTop: 16 }}>
          <ClockIcon />
          <SectionTitle>근태 관리</SectionTitle>
        </SectionRow>
        <SubList>
          <NavItem href="/attendance" $active={isActive("/attendance")}>
            출퇴근 내역 조회
          </NavItem>
          <NavItem href="#" $active={false}>휴가 신청</NavItem>
          <NavItem href="#" $active={false}>휴가 내역 조회</NavItem>
        </SubList>

        {/* 급여 관리 */}
        <SectionRow style={{ marginTop: 16 }}>
          <FileTextIcon />
          <SectionTitle>급여 관리</SectionTitle>
        </SectionRow>
        <SubList>
          <NavItem href="/payroll" $active={isActive("/payroll")}>
            급여 명세서 조회
          </NavItem>
        </SubList>

        {/* 사원 관리 */}
        {
          isAdmin && (
            <>
              <SectionRow style={{ marginTop: 16 }}>
                <UserIcon />
                <SectionTitle>사원 관리</SectionTitle>
              </SectionRow>
              <SubList>
                <NavItem href="/register" $active={isActive("/register")}>
                  사원 등록
                </NavItem>
                <NavItem
                  href="/employees/1"
                  $active={pathname.startsWith("/employees/") && !pathname.includes("/register")}
                >
                  사원 조회
                </NavItem>
              </SubList>
            </>
          )
        }
      </Nav>

      {/* User Profile */}
      <FooterBar>
        <Avatar />
        <ProfileCard>
          <PasswordBtn>비밀번호 재설정</PasswordBtn>
          <LogoutBtn>로그아웃</LogoutBtn>
        </ProfileCard>
      </FooterBar>
    </Aside>
  );
}