"use client";

import styled from "styled-components";
import { TodayIcon } from "@/utils/icons";

interface DateInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  errorMessage?: string;
  required?: boolean;
}

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 40px;
  padding: 0 40px 0 12px;
  border: 1px solid ${({ $hasError }) => ($hasError ? "#f26b63" : "#d1d5db")};
  border-radius: 8px;
  font-size: 14px;
  color: var(--color-text);
  background-color: var(--color-background);
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? "#f26b63" : "#0B898A")};
  }

  &::placeholder {
    color: var(--color-text-secondary);
  }
`;

const CalendarIconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  color: var(--color-text-secondary);
`;

const ErrorMessage = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: #f26b63;
  min-height: 15px;
`;

const DateInput = ({
  value,
  onChange,
  placeholder,
  errorMessage,
  required,
}: DateInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <InputContainer>
      <StyledInput
        type="text"
        value={value || ""}
        onChange={handleChange}
        placeholder={placeholder}
        $hasError={!!errorMessage}
      />
      <CalendarIconWrapper>
        <TodayIcon />
      </CalendarIconWrapper>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </InputContainer>
  );
};

export default DateInput;


