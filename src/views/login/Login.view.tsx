"use client";

import styled from "styled-components";
import Button from "@/components/Button/Button";
import TextInput from "@/components/Input/TextInput/TextInput";
import { useForm } from "react-hook-form";

interface LoginViewProps {
  loginFn: (email: string, password: string) => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

const LoginButton = styled(Button)``;

const Input = styled(TextInput)``;

const LoginView = ({ loginFn }: LoginViewProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    loginFn(data.email, data.password);
  };

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="이메일"
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "이메일 형식이 올바르지 않습니다",
            },
          })}
          errorMessage={errors?.email?.message as string | undefined}
        />
        <Input
          type="password"
          placeholder="비밀번호"
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
      </form>
    </main>
  );
};

export default LoginView;
