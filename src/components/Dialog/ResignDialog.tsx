"use client";

import styled from "styled-components";
import { CancelIcon } from "@/utils/icons";
import Button from "@/components/Button/Button";
import DateInput from "@/components/Input/DateInput/DateInput";
import TextInput from "@/components/Input/TextInput/TextInput";
import { useState } from "react";

interface ResignDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (resignDate: string, reason: string) => void;
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
  width: 547px;
  max-width: 90vw;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
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

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 400;
  color: var(--color-text);
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const Message = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: var(--color-text);
  margin: 16px 0;
  text-align: center;
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
  background-color: #f26b63;
  color: white;
  width: 150px;
  height: 40px;
  font-size: 16px;
  font-weight: 400;

  &:hover {
    background-color: #d32f2f;
  }
`;

const ResignDialog = ({ isOpen, onClose, onConfirm }: ResignDialogProps) => {
  const [resignDate, setResignDate] = useState("");
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (resignDate && reason) {
      onConfirm(resignDate, reason);
      setResignDate("");
      setReason("");
      onClose();
    }
  };

  const handleClose = () => {
    setResignDate("");
    setReason("");
    onClose();
  };

  return (
    <Overlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <DialogContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose} aria-label="닫기">
          <CancelIcon />
        </CloseButton>
        <FormSection>
          <FormRow>
            <Label>퇴직일</Label>
            <InputWrapper>
              <DateInput
                value={resignDate}
                onChange={setResignDate}
                placeholder="YYYY.MM.DD"
              />
            </InputWrapper>
          </FormRow>
          <FormRow>
            <Label>퇴직사유</Label>
            <InputWrapper>
              <TextInput
                type="text"
                placeholder="퇴직사유를 입력하세요"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </InputWrapper>
          </FormRow>
        </FormSection>
        <Message>위 정보로 퇴직처리 하시겠습니까?</Message>
        <ButtonContainer>
          <CancelButton onClick={handleClose}>아니오</CancelButton>
          <ConfirmButton onClick={handleConfirm}>예</ConfirmButton>
        </ButtonContainer>
      </DialogContainer>
    </Overlay>
  );
};

export default ResignDialog;

