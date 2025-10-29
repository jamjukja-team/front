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

const InputWrapper = styled.div``;
const StyledInput = styled.input``;
const VisibilityToggleButton = styled.button``;
const ErrorMessage = styled.p``;

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
      />
      {showVisibilityToggle && (
        <VisibilityToggleButton
          type="button"
          onClick={toggleVisibility}
        ></VisibilityToggleButton>
      )}
      {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </InputWrapper>
  );
};

export default TextInput;
