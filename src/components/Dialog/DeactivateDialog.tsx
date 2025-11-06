"use client";

import styled from "styled-components";
import { CancelIcon } from "@/utils/icons";
import Button from "@/components/Button/Button";

interface DeactivateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  email?: string;
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
  background-color: var(--color-background);
  border-radius: 12px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 24px;
  width: 468px;
  max-width: 90vw;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const Message = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: var(--color-text);
  margin: 0;
  line-height: 1.5;
  text-align: center;
  padding: 24px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 8px;
`;

const CancelButton = styled(Button)`
  background-color: #d1d5db;
  color: var(--color-text);
  width: 150px;
  height: 40px;
  font-size: 16px;
  font-weight: 400;

  &:hover {
    background-color: #9ca3af;
  }
`;

const ConfirmButton = styled(Button)`
  background-color: #0B898A;
  color: white;
  width: 150px;
  height: 40px;
  font-size: 16px;
  font-weight: 400;

  &:hover {
    background-color: #0a7a7b;
  }
`;

const DeactivateDialog = ({
  isOpen,
  onClose,
  onConfirm,
  email,
}: DeactivateDialogProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Overlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <DialogContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="닫기">
          <CancelIcon />
        </CloseButton>
        <Message>계정을 비활성화 하시겠습니까?</Message>
        <ButtonContainer>
          <CancelButton onClick={onClose}>아니오</CancelButton>
          <ConfirmButton onClick={handleConfirm}>예</ConfirmButton>
        </ButtonContainer>
      </DialogContainer>
    </Overlay>
  );
};

export default DeactivateDialog;


