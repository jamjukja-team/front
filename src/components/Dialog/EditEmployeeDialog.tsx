"use client";

import styled from "styled-components";
import { CancelIcon } from "@/utils/icons";
import Button from "@/components/Button/Button";
import ProfileUpload from "@/components/Input/ProfileUpload/ProfileUpload";
import DateInput from "@/components/Input/DateInput/DateInput";
import Select from "@/components/Input/Select/Select";
import TextInput from "@/components/Input/TextInput/TextInput";
import { useState } from "react";
import { Employee } from "@/types/api";

interface EditEmployeeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: Partial<Employee>) => void;
  employee?: Employee;
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
  overflow-y: auto;
  padding: 20px;
`;

const DialogContainer = styled.div`
  background-color: var(--color-background);
  border-radius: 12px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 24px;
  width: 661px;
  max-width: 90vw;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 13px;
  right: 13px;
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

const Title = styled.h2`
  font-size: 24px;
  font-weight: 500;
  color: var(--color-text);
  margin: 0;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text);
`;

const InputWrapper = styled.div`
  width: 100%;
  max-width: 472px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
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

const EditEmployeeDialog = ({
  isOpen,
  onClose,
  onConfirm,
  employee,
}: EditEmployeeDialogProps) => {
  const [formData, setFormData] = useState({
    emp_nm: employee?.emp_nm || "",
    birth_date: employee?.birth_date || "",
    hire_date: employee?.hire_date || "",
    dept_id: employee?.dept_id || "",
    grade_id: employee?.grade_id || "",
    phone: "",
    email: employee?.email || "",
    photo: employee?.photo || "",
  });

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = () => {
    onConfirm(formData);
    onClose();
  };

  // 부서 옵션
  const departmentOptions = [
    { value: "", label: "부서를 선택해 주세요." },
    { value: "dev", label: "개발팀" },
    { value: "hr", label: "인사팀" },
    { value: "finance", label: "재무팀" },
  ];

  // 직급 옵션
  const gradeOptions = [
    { value: "emp", label: "사원" },
    { value: "senior", label: "대리" },
    { value: "manager", label: "과장" },
    { value: "team_lead", label: "팀장" },
  ];

  return (
    <Overlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <DialogContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="닫기">
          <CancelIcon />
        </CloseButton>
        <Title>정보 수정</Title>
        <FormSection>
          {/* 프로필 사진 */}
          <FormRow>
            <Label>프로필 사진</Label>
            <ProfileUpload
              value={formData.photo}
              onChange={(file) => {
                // TODO: 파일 처리
              }}
            />
          </FormRow>

          {/* 이름 */}
          <FormRow>
            <Label>이름</Label>
            <InputWrapper>
              <TextInput
                type="text"
                placeholder="이름"
                value={formData.emp_nm}
                onChange={(e) =>
                  setFormData({ ...formData, emp_nm: e.target.value })
                }
              />
            </InputWrapper>
          </FormRow>

          {/* 생년월일 */}
          <FormRow>
            <Label>생년월일</Label>
            <InputWrapper>
              <DateInput
                value={formData.birth_date}
                onChange={(value) =>
                  setFormData({ ...formData, birth_date: value })
                }
                placeholder="YYYY.MM.DD"
              />
            </InputWrapper>
          </FormRow>

          {/* 입사일 */}
          <FormRow>
            <Label>입사일</Label>
            <InputWrapper>
              <DateInput
                value={formData.hire_date}
                onChange={(value) =>
                  setFormData({ ...formData, hire_date: value })
                }
                placeholder="YYYY.MM.DD"
              />
            </InputWrapper>
          </FormRow>

          {/* 부서 */}
          <FormRow>
            <Label>부서</Label>
            <InputWrapper>
              <Select
                value={formData.dept_id}
                onChange={(value) =>
                  setFormData({ ...formData, dept_id: value })
                }
                placeholder="부서를 선택해 주세요."
                options={departmentOptions}
              />
            </InputWrapper>
          </FormRow>

          {/* 직급 */}
          <FormRow>
            <Label>직급</Label>
            <InputWrapper>
              <Select
                value={formData.grade_id}
                onChange={(value) =>
                  setFormData({ ...formData, grade_id: value })
                }
                placeholder="직급을 선택해 주세요."
                options={gradeOptions}
              />
            </InputWrapper>
          </FormRow>

          {/* 연락처 */}
          <FormRow>
            <Label>연락처</Label>
            <InputWrapper>
              <TextInput
                type="text"
                placeholder="010-0000-0000"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </InputWrapper>
          </FormRow>

          {/* 이메일 */}
          <FormRow>
            <Label>이메일</Label>
            <InputWrapper>
              <TextInput
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </InputWrapper>
          </FormRow>
        </FormSection>

        <ButtonContainer>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <ConfirmButton onClick={handleSubmit}>수정하기</ConfirmButton>
        </ButtonContainer>
      </DialogContainer>
    </Overlay>
  );
};

export default EditEmployeeDialog;
