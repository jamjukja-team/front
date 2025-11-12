"use client";

import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CalendarIcon, ClockIcon, FileTextIcon, UserIcon } from "@/utils/icons";
import { useAuthStore } from "@/stores/authStore";
import ProfileDialog from "@/components/Dialog/ProfileDialog";

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const LogoBar = styled.div`
  padding: 20px 30px;
  margin-bottom: 30px;
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const LogoMark = styled.div`
  width: 75px; 
  height: 75px; 
  border-radius: 50%;
  background-color: var(--color-gray-200);
  display: flex; 
  align-items: center; 
  justify-content: center;
  flex-shrink: 0;
  span { 
    font-size: 1.5rem; 
    font-weight: 600;
    color: var(--color-text);
  } 
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
`;

const Nav = styled.nav`
  flex: 1;
  padding: 0 30px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
`;

const SectionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 0;
  color: var(--color-text);
  margin-top: 40px;
  &:first-child { margin-top: 0; }
`;

const SectionTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const SubList = styled.div`
  margin-left: 0;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const NavItem = styled(Link) <{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 9px 0 9px 37px;     
  font-size: 14px;  
  border-radius: 8px; 
  text-decoration: none;
  color: ${({ $active }) => ($active ? "#0B898A" : "#000000")};
  background: ${({ $active }) => ($active ? "#D7F6F8" : "transparent")};
  font-weight: ${({ $active }) => ($active ? "600" : "400")};

 &:hover {
    background: ${({ $active }) => ($active ? "#D7F6F8" : "#f3f4f6")};
  }
`;

const FooterBar = styled.div`
  padding: 0 43px 0 43px;
  margin-top: auto;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Avatar = styled.button`
  width: 60px; 
  height: 60px;
  border-radius: 50%;
  background: #d1d5db;
  flex-shrink: 0;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default function Sidebar() {
  const pathname = usePathname();
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const handlePasswordChange = () => {
    setIsDialogOpen(false);
    // TODO: 비밀번호 변경 페이지로 이동 또는 모달 열기
    console.log("비밀번호 변경");
  };

  const handleLogout = () => {
    setIsDialogOpen(false);
    // TODO: 로그아웃 로직 구현
    console.log("로그아웃");
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
                  href="/employees"
                  $active={pathname === "/employees" || (pathname.startsWith("/employees/") && pathname !== "/employees")}
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
        <Avatar onClick={() => setIsDialogOpen(true)} />
      </FooterBar>

      {/* Profile Dialog */}
      <ProfileDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        userName="김희은"
        status="working"
        onPasswordChange={handlePasswordChange}
        onLogout={handleLogout}
      />
    </Aside>
  );
}