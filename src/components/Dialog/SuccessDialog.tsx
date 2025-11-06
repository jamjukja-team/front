"use client";

import styled from "styled-components";
import { CancelIcon } from "@/utils/icons";
import Button from "@/components/Button/Button";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  buttonText?: string;
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
  width: 480px;
  max-width: 90vw;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
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
  font-size: 16px;
  font-weight: 400;
  color: var(--color-text);
  margin: 0;
  line-height: 1.5;
  white-space: pre-line;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

const OkButton = styled(Button)`
  background-color: #0B898A;
  color: white;
  width: 150px;
  height: 40px;

  &:hover {
    background-color: #0a7a7b;
  }
`;

const SuccessDialog = ({
  isOpen,
  onClose,
  message,
  buttonText = "확인",
}: SuccessDialogProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <DialogContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="닫기">
          <CancelIcon />
        </CloseButton>
        <Message>{message}</Message>
        <ButtonContainer>
          <OkButton onClick={onClose}>{buttonText}</OkButton>
        </ButtonContainer>
      </DialogContainer>
    </Overlay>
  );
};

export default SuccessDialog;


