"use client";

import { RefCallback, useState } from "react";
import styled from "styled-components";
import cn from "classnames/bind";
import styles from "./TextInput.module.css";

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

const cx = cn.bind(styles);

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
    <div className={cx("InputWrapper", className)}>
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
    </div>
  );
};

export default TextInput;
