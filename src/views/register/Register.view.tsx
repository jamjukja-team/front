"use client";

import styled from "styled-components";
import Link from "next/link";
import Button from "@/components/Button/Button";
import TextInput from "@/components/Input/TextInput/TextInput";
import ProfileUpload from "@/components/Input/ProfileUpload/ProfileUpload";
import DateInput from "@/components/Input/DateInput/DateInput";
import Select from "@/components/Input/Select/Select";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ConfirmDialog from "@/components/Dialog/ConfirmDialog";
import SuccessDialog from "@/components/Dialog/SuccessDialog";
import { registerEmployee } from "@/services/employeeService";

interface RegisterViewProps {}

interface RegisterFormData {
  email: string;
  password?: string;
  passwordConfirm?: string;
  emp_nm: string;
  birth_date: string;
  hire_date: string;
  dept_id: string;
  grade_id: string;
  photo?: string;
  phone?: string;
}

const RegisterContainer = styled.main`
  width: 100%;
  padding: 40px;
  background-color: var(--color-gray-50);
  min-height: calc(100vh - 80px);
`;

const RegisterTitle = styled.h1`
  font-size: 30px;
  font-weight: 500;
  color: var(--color-text);
  margin: 0 0 40px 0;
`;

const RegisterForm = styled.form`
  width: 100%;
  max-width: 900px;
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

const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RequiredMark = styled.span`
  color: #f26b63;
  font-size: 16px;
`;

const InputWrapper = styled.div`
  width: 100%;
  max-width: 472px;
`;

const RegisterButton = styled(Button)`
  margin-top: 24px;
  width: 192px;
  height: 40px;
  background-color: #0B898A;
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

const RegisterView = ({}: RegisterViewProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterFormData>();

  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (data: RegisterFormData) => {
    // 필수 필드 검증
    if (!data.emp_nm || !data.birth_date || !data.hire_date || !data.dept_id || !data.grade_id || !data.email) {
      return;
    }
    setFormData(data);
    setShowConfirmDialog(true);
  };

  const handleConfirm = async () => {
    if (!formData) return;
    
    setIsSubmitting(true);
    try {
      await registerEmployee({
        email: formData.email,
        password: formData.password || "",
        emp_nm: formData.emp_nm,
        birth_date: formData.birth_date,
        hire_date: formData.hire_date,
        dept_id: formData.dept_id,
        grade_id: formData.grade_id,
        photo: formData.photo || "",
      });
      setShowConfirmDialog(false);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error("Register error:", error);
      // TODO: 에러 메시지 표시
      setShowConfirmDialog(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 날짜 형식 검증 (YYYY.MM.DD)
  const validateDate = (value: string) => {
    if (!value) return "날짜를 입력해주세요";
    const dateRegex = /^\d{4}\.\d{2}\.\d{2}$/;
    if (!dateRegex.test(value)) {
      return "올바른 날짜 형식으로 입력해 주세요.";
    }
    return true;
  };

  // 전화번호 형식 검증
  const validatePhone = (value: string) => {
    if (!value) return "연락처를 입력해주세요";
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(value)) {
      return "올바른 휴대폰 형식으로 입력해 주세요.";
    }
    return true;
  };

  // 이메일 형식 검증
  const validateEmail = (value: string) => {
    if (!value) return "이메일을 입력해주세요";
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(value)) {
      return "올바른 이메일 형식으로 입력해 주세요.";
    }
    return true;
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
    <RegisterContainer>
      <RegisterTitle>사원 등록</RegisterTitle>
      <RegisterForm onSubmit={handleSubmit(onSubmit)}>
        <FormSection>
          {/* 프로필 사진 */}
          <FormRow>
            <ProfileUpload
              value={watch("photo")}
              onChange={(file) => {
                setProfileFile(file);
                // TODO: 파일을 base64로 변환하여 photo 필드에 저장
              }}
            />
          </FormRow>

          {/* 이름 */}
          <FormRow>
            <FormLabel>
              이름 <RequiredMark>*</RequiredMark>
            </FormLabel>
            <InputWrapper>
              <TextInput
                type="text"
                placeholder="이름"
                {...register("emp_nm", {
                  required: "이름을 입력하세요.",
                  validate: (value) => value.trim() !== "" || "이름을 입력하세요.",
                })}
                errorMessage={errors?.emp_nm?.message as string | undefined}
              />
            </InputWrapper>
          </FormRow>

          {/* 생년월일 */}
          <FormRow>
            <FormLabel>
              생년월일 <RequiredMark>*</RequiredMark>
            </FormLabel>
            <InputWrapper>
              <DateInput
                value={watch("birth_date") || ""}
                onChange={(value) => {
                  setValue("birth_date", value, { shouldValidate: true });
                }}
                placeholder="YYYY.MM.DD"
                errorMessage={errors?.birth_date?.message as string | undefined}
                required
              />
              <input
                type="hidden"
                {...register("birth_date", {
                  required: "생년월일을 입력하세요.",
                  validate: validateDate,
                })}
              />
            </InputWrapper>
          </FormRow>

          {/* 입사일 */}
          <FormRow>
            <FormLabel>
              입사일 <RequiredMark>*</RequiredMark>
            </FormLabel>
            <InputWrapper>
              <DateInput
                value={watch("hire_date") || ""}
                onChange={(value) => {
                  setValue("hire_date", value, { shouldValidate: true });
                }}
                placeholder="YYYY.MM.DD"
                errorMessage={errors?.hire_date?.message as string | undefined}
                required
              />
              <input
                type="hidden"
                {...register("hire_date", {
                  required: "입사일을 입력하세요.",
                  validate: validateDate,
                })}
              />
            </InputWrapper>
          </FormRow>

          {/* 부서 */}
          <FormRow>
            <FormLabel>
              부서 <RequiredMark>*</RequiredMark>
            </FormLabel>
            <InputWrapper>
              <Select
                value={watch("dept_id") || ""}
                onChange={(value) => {
                  setValue("dept_id", value, { shouldValidate: true });
                }}
                placeholder="부서를 선택해 주세요."
                options={departmentOptions}
                errorMessage={errors?.dept_id?.message as string | undefined}
                required
              />
              <input
                type="hidden"
                {...register("dept_id", {
                  required: "부서를 선택하세요.",
                  validate: (value) => value !== "" || "부서를 선택하세요.",
                })}
              />
            </InputWrapper>
          </FormRow>

          {/* 직급 */}
          <FormRow>
            <FormLabel>
              직급 <RequiredMark>*</RequiredMark>
            </FormLabel>
            <InputWrapper>
              <Select
                value={watch("grade_id") || ""}
                onChange={(value) => {
                  setValue("grade_id", value, { shouldValidate: true });
                }}
                placeholder="직급을 선택해 주세요."
                options={gradeOptions}
                errorMessage={errors?.grade_id?.message as string | undefined}
                required
              />
              <input
                type="hidden"
                {...register("grade_id", {
                  required: "직급을 선택하세요.",
                  validate: (value) => value !== "" || "직급을 선택하세요.",
                })}
              />
            </InputWrapper>
          </FormRow>

          {/* 연락처 */}
          <FormRow>
            <FormLabel>
              연락처 <RequiredMark>*</RequiredMark>
            </FormLabel>
            <InputWrapper>
              <TextInput
                type="text"
                placeholder="010-0000-0000"
                {...register("phone", {
                  required: "연락처를 입력하세요.",
                  validate: validatePhone,
                })}
                errorMessage={errors?.phone?.message as string | undefined}
              />
            </InputWrapper>
          </FormRow>

          {/* 이메일 */}
          <FormRow>
            <FormLabel>
              이메일 <RequiredMark>*</RequiredMark>
            </FormLabel>
            <InputWrapper>
              <TextInput
                type="email"
                placeholder="email@example.com"
                {...register("email", {
                  required: "이메일을 입력하세요.",
                  validate: validateEmail,
                })}
                errorMessage={errors?.email?.message as string | undefined}
              />
            </InputWrapper>
          </FormRow>

          <RegisterButton type="submit">등록하기</RegisterButton>
        </FormSection>
      </RegisterForm>

      {/* 확인 모달 */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        message="해당 정보로 사원 등록을 하시겠습니까?"
        confirmText="예"
        cancelText="아니오"
        onConfirm={handleConfirm}
      />

      {/* 성공 모달 */}
      <SuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        message={`사원 등록이 완료되었습니다.\n${formData?.email || ""}으로 초대 메일이 발송되었습니다.`}
      />
    </RegisterContainer>
  );
};

export default RegisterView;
