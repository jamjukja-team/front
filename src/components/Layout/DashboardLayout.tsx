"use client";

import styled from "styled-components";
import Sidebar from "@/components/Layout/Sidebar";
import { useState } from "react";
import { CloseIcon, HamburgerIcon } from "@/utils/icons";
import { useAuthHydrated } from "@/hooks/useAuthHydrated";

const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  position: relative;  /* 모바일에서 사이드바 오버레이를 위해 필요 */
`;

const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  background-color: var(--color-background);
  z-index: 100;
  box-shadow: 2px 0 2px rgba(0, 0, 0, 0.2);
  position: fixed;
  overflow-x: hidden;

  @media (min-width: 769px) {
    width: 260px;
    flex-shrink: 0;
    height: 100%;
    top: 0; 
    left: 0;
    transform: none;
  }

  @media (max-width: 768px) {
    inset: 0;
    width: 100vw;
    height: 100vh;
    transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(-100%)")};
    transition: transform 0.3s ease;
  }
`;

const MainContainer = styled.main`
  flex: 1;
  margin-left: 260px;
  height: 100vh;
  overflow-y: auto;
  background-color: var(--color-gray-50);
  padding-top: 80px;
  padding-left: 40px;
  padding-right : 40px;

  transition: margin-left 0.3s ease;
  @media (max-width: 768px) {
    margin-left: 0;
   padding-left : 20px;
   padding-right : 20px;
}
`;

const HamburgerButton = styled.button`
  position: fixed;
  top: 24px;
  right: 24px;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  cursor: pointer;
  z-index: 200;

  display: none;
  @media (max-width: 768px) {
    display: block; 
  }
`;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const ready = useAuthHydrated(); // persist 복원 상태 확인

  if (!ready) {
    return null; // 복원 전에는 아무것도 렌더링하지 않음(혹은 로딩 스피너) 
  }
  return (
    // 전체
    <LayoutWrapper>
      {/* 햄버거 버튼 */}
      <HamburgerButton
        className={isOpen ? "open" : ""}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
      </HamburgerButton>

      {/* 사이드바 */}
      <SidebarContainer $isOpen={isOpen}>
        <Sidebar />
      </SidebarContainer>
      {/* 메인 컨텐츠 */}
      <MainContainer onClick={() => isOpen && setIsOpen(false)}>{children}</MainContainer>
    </LayoutWrapper>
  );
}