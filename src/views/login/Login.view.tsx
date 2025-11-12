"use client";

import styled from "styled-components";
import Link from "next/link";
import Button from "@/components/Button/Button";
import TextInput from "@/components/Input/TextInput/TextInput";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LoginResult } from "@/app/(auth)/login/loginAction";

interface LoginViewProps {
  loginFn: (email: string, password: string) => Promise<LoginResult>;
}

interface LoginFormData {
  email: string;
  password: string;
}

const LoginContainer = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: var(--color-gray-50);
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 48px 40px;
  background-color: var(--color-background);
  border-radius: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const LoginTitle = styled.h1`
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text);
  text-align: center;
`;

const LoginSubtitle = styled.p`
  margin: 0 0 32px 0;
  font-size: 14px;
  color: var(--color-text-secondary);
  text-align: center;
`;

const LoginForm = styled.form`
  width: 100%;
`;

const LoginButton = styled(Button)`
  margin-top: 8px;
`;

const RegisterLink = styled.div`
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

const LoginView = ({ loginFn }: LoginViewProps) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    const response = await loginFn(data.email, data.password);
    if (response.ok) {
      router.push('/');
    } else {
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginTitle>로그인</LoginTitle>
        <LoginSubtitle>이메일과 비밀번호를 입력해주세요</LoginSubtitle>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
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
          <LoginButton type="submit">로그인</LoginButton>
        </LoginForm>
        <RegisterLink>
          계정이 없으신가요? <Link href="/register">회원가입</Link>
        </RegisterLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginView;
