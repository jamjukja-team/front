"use client";

import { RefCallback, useState } from "react";
import styled from "styled-components";

interface TextInputProps {
  type: "text" | "password" | "number" | "tel" | "email";
  placeholder: string;
  showVisibilityToggle?: boolean;
  className?: string;
  errorMessage?: string;
  value?: string;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: RefCallback<HTMLInputElement> | null;
}

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 24px;
`;

const StyledInput = styled.input<{ isError?: boolean }>`
  width: 100%;
  padding: 14px 16px;
  font-size: 16px;
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-background);
  border: 1px solid ${(props) => (props.isError ? "var(--color-error)" : "var(--color-border)")};
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
  transition: color 0.2s ease-in-out;

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

const TextInput = ({
  type,
  placeholder,
  showVisibilityToggle,
  className,
  errorMessage,
  value,
  maxLength,
  onChange,
  ref,
}: TextInputProps) => {
  const [inputType, setInputType] = useState(type);
  const isError = Boolean(errorMessage);
  const toggleVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };
  return (
    <InputWrapper className={className}>
      <StyledInput
        onChange={onChange}
        type={inputType}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        ref={ref}
        isError={isError}
      />
      {showVisibilityToggle && type === "password" && (
        <VisibilityToggleButton
          type="button"
          onClick={toggleVisibility}
        >
          {inputType === "password" ? "보기" : "숨기기"}
        </VisibilityToggleButton>
      )}
      {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </InputWrapper>
  );
};

export default TextInput;
