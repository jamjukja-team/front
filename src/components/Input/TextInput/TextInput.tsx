"use client";

import React, { forwardRef, useState } from "react";
import styled from "styled-components";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  showVisibilityToggle?: boolean;
  errorMessage?: string;
};

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 24px;
`;

const StyledInput = styled.input<{ $isError?: boolean }>`
  width: 100%;
  padding: 14px 16px;
  font-size: 16px;
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-background);
  border: 1px solid ${({ $isError }) => ($isError ? "var(--color-error)" : "var(--color-border)")};
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: var(--color-text-secondary);
  }

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &:disabled {
    background-color: var(--color-gray-100);
    cursor: not-allowed;
  }
`;

const VisibilityToggleButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: var(--color-text-secondary);
  font-size: 14px;

  &:hover {
    color: var(--color-text);
  }

  &:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const ErrorMessage = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: var(--color-error);
  line-height: 1.4;
`;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ type = "text", placeholder, showVisibilityToggle, className, errorMessage, ...rest }, ref) => {
    const [inputType, setInputType] = useState<"text" | "password" | "email" | "tel" | "number">(
      (type as any) || "text"
    );
    const isError = Boolean(errorMessage);

    const toggleVisibility = () => {
      if (type !== "password") return;
      setInputType((prev) => (prev === "password" ? "text" : "password"));
    };

    return (
      <InputWrapper className={className}>
        <StyledInput
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          $isError={isError}
          {...rest} // RHF가 준 name/onChange/onBlur/value 등 전부 그대로 연결
        />
        {showVisibilityToggle && type === "password" && (
          <VisibilityToggleButton type="button" onClick={toggleVisibility}>
            {inputType === "password" ? "보기" : "숨기기"}
          </VisibilityToggleButton>
        )}
        {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </InputWrapper>
    );
  }
);

TextInput.displayName = "TextInput";
export default TextInput;

// ref를 prop으로 받지 마세요 → forwardRef로 전달해야 RHF가 인풋을 “등록”할 수 있습니다.
// 	RHF가 주는 name / onChange / onBlur / value / ref를 그대로 <input>에 붙이기: ...rest를 <StyledInput>에 전달.
// 	커스텀 스타일 prop은 $isError처럼 transient prop을 사용해 DOM 경고 방지.
// 	비밀번호 토글은 type="password"일 때만 작동하고, 기존 onChange/value를 건드리지 않도록 <input {...rest}> 구조 유지.