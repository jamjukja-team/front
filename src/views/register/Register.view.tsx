"use client";

import styled from "styled-components";
import Link from "next/link";
import Button from "@/components/Button/Button";
import TextInput from "@/components/Input/TextInput/TextInput";
import { useForm } from "react-hook-form";

interface RegisterViewProps {
  registerFn: (data: {
    email: string;
    password: string;
    emp_nm: string;
    birth_date: string;
    hire_date: string;
    dept_id: string;
    grade_id: string;
    photo: string;
  }) => void;
}

interface RegisterFormData {
  email: string;
  password: string;
  passwordConfirm: string;
  emp_nm: string;
  birth_date: string;
  hire_date: string;
  dept_id: string;
  grade_id: string;
  photo: string;
}

const RegisterContainer = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: var(--color-gray-50);
`;

const RegisterCard = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 48px 40px;
  background-color: var(--color-background);
  border-radius: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const RegisterTitle = styled.h1`
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text);
  text-align: center;
`;

const RegisterSubtitle = styled.p`
  margin: 0 0 32px 0;
  font-size: 14px;
  color: var(--color-text-secondary);
  text-align: center;
`;

const RegisterForm = styled.form`
  width: 100%;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const RegisterButton = styled(Button)`
  margin-top: 8px;
`;

const LoginLink = styled.div`
  margin-top: 24px;
  text-align: center;
  font-size: 14px;
  color: var(--color-text-secondary);

  a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const RegisterView = ({ registerFn }: RegisterViewProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>();

  const password = watch("password");

  const onSubmit = (data: RegisterFormData) => {
    const { passwordConfirm, ...registerData } = data;
    registerFn(registerData);
  };

  // 날짜 형식 검증 (YYYY.MM.DD)
  const validateDate = (value: string) => {
    const dateRegex = /^\d{4}\.\d{2}\.\d{2}$/;
    if (!dateRegex.test(value)) {
      return "날짜 형식은 YYYY.MM.DD 입니다 (예: 2025.10.21)";
    }
    return true;
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <RegisterTitle>회원가입</RegisterTitle>
        <RegisterSubtitle>사원 정보를 입력해주세요</RegisterSubtitle>
        <RegisterForm onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            type="email"
            placeholder="이메일"
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "이메일 형식이 올바르지 않습니다",
              },
            })}
            errorMessage={errors?.email?.message as string | undefined}
          />

          <FormRow>
            <TextInput
              type="password"
              placeholder="비밀번호"
              showVisibilityToggle
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                minLength: {
                  value: 6,
                  message: "비밀번호는 최소 6자 이상이어야 합니다",
                },
              })}
              errorMessage={errors?.password?.message as string | undefined}
            />

            <TextInput
              type="password"
              placeholder="비밀번호 확인"
              showVisibilityToggle
              {...register("passwordConfirm", {
                required: "비밀번호 확인을 입력해주세요",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다",
              })}
              errorMessage={
                errors?.passwordConfirm?.message as string | undefined
              }
            />
          </FormRow>

          <TextInput
            type="text"
            placeholder="이름"
            {...register("emp_nm", {
              required: "이름을 입력해주세요",
            })}
            errorMessage={errors?.emp_nm?.message as string | undefined}
          />

          <FormRow>
            <TextInput
              type="text"
              placeholder="생년월일 (YYYY.MM.DD)"
              {...register("birth_date", {
                required: "생년월일을 입력해주세요",
                validate: validateDate,
              })}
              errorMessage={
                errors?.birth_date?.message as string | undefined
              }
            />

            <TextInput
              type="text"
              placeholder="입사일 (YYYY.MM.DD)"
              {...register("hire_date", {
                required: "입사일을 입력해주세요",
                validate: validateDate,
              })}
              errorMessage={errors?.hire_date?.message as string | undefined}
            />
          </FormRow>

          <FormRow>
            <TextInput
              type="text"
              placeholder="부서 코드 (예: HR001)"
              {...register("dept_id", {
                required: "부서 코드를 입력해주세요",
              })}
              errorMessage={errors?.dept_id?.message as string | undefined}
            />

            <TextInput
              type="text"
              placeholder="직급 코드 (예: ASS)"
              {...register("grade_id", {
                required: "직급 코드를 입력해주세요",
              })}
              errorMessage={errors?.grade_id?.message as string | undefined}
            />
          </FormRow>

          <TextInput
            type="text"
            placeholder="프로필 사진 (선택)"
            {...register("photo", {
              required: false,
            })}
            errorMessage={errors?.photo?.message as string | undefined}
          />

          <RegisterButton type="submit">회원가입</RegisterButton>
        </RegisterForm>
        <LoginLink>
          이미 계정이 있으신가요? <Link href="/login">로그인</Link>
        </LoginLink>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default RegisterView;
