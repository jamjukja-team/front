"use client";

import styled from "styled-components";
import { AccountCircleIcon } from "@/utils/icons";

interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  status?: "working" | "offline";
  onPasswordChange?: () => void;
  onLogout?: () => void;
}

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const DialogContainer = styled.div`
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 20px;
  width: 165px;
  min-height: 128px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const AvatarContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #9ca3af;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const UserName = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: var(--color-text);
  margin: 0;
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 15px;
  background-color: #d9d9d9;
  font-size: 12px;
  font-weight: 400;
  color: var(--color-text);
  height: 20px;
  width: 52px;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 8px;
  align-items: flex-start;
`;

const MenuItem = styled.button`
  background: none;
  border: none;
  padding: 0;
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text);
  cursor: pointer;
  transition: color 0.2s ease;
  width: auto;

  &:hover {
    color: var(--color-primary);
  }
`;

const LogoutItem = styled(MenuItem)`
  color: #f26b63;

  &:hover {
    color: #d32f2f;
  }
`;

const ProfileDialog = ({
  isOpen,
  onClose,
  userName = "김희은",
  status = "working",
  onPasswordChange,
  onLogout,
}: ProfileDialogProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <DialogContainer onClick={(e) => e.stopPropagation()}>
        <AvatarContainer>
          <AccountCircleIcon />
        </AvatarContainer>
        <UserInfo>
          <UserName>{userName}</UserName>
          {status === "working" && <StatusBadge>근무중</StatusBadge>}
        </UserInfo>
        <MenuList>
          <MenuItem onClick={onPasswordChange}>비밀번호 변경</MenuItem>
          <LogoutItem onClick={onLogout}>로그아웃</LogoutItem>
        </MenuList>
      </DialogContainer>
    </Overlay>
  );
};

export default ProfileDialog;

