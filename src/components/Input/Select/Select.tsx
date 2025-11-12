"use client";

import styled from "styled-components";
import { KeyboardArrowDownIcon } from "@/utils/icons";
import { useState, useRef, useEffect } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  options: SelectOption[];
  errorMessage?: string;
  required?: boolean;
}

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectButton = styled.button<{ $hasError?: boolean; $isOpen?: boolean }>`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid ${({ $hasError }) => ($hasError ? "#f26b63" : "#e5e7eb")};
  border-radius: 8px;
  font-size: 14px;
  color: ${({ value }) => (value ? "var(--color-text)" : "var(--color-text-secondary)")};
  background-color: var(--color-background);
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? "#f26b63" : "#0B898A")};
  }

  &:hover {
    border-color: ${({ $hasError }) => ($hasError ? "#f26b63" : "#9ca3af")};
  }
`;

const SelectText = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const IconWrapper = styled.div<{ $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  transition: transform 0.2s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const Dropdown = styled.div<{ $isOpen?: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background-color: var(--color-background);
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
  max-height: 200px;
  overflow-y: auto;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
`;

const Option = styled.div<{ $isSelected?: boolean }>`
  padding: 10px 12px;
  font-size: 14px;
  color: var(--color-text);
  cursor: pointer;
  background-color: ${({ $isSelected }) => ($isSelected ? "#f3f4f6" : "transparent")};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: #f26b63;
  min-height: 15px;
`;

const Select = ({
  value,
  onChange,
  placeholder = "선택해 주세요.",
  options,
  errorMessage,
  required,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <SelectContainer ref={containerRef}>
      <SelectButton
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        $hasError={!!errorMessage}
        $isOpen={isOpen}
        value={selectedOption?.label || ""}
      >
        <SelectText>{selectedOption?.label || placeholder}</SelectText>
        <IconWrapper $isOpen={isOpen}>
          <KeyboardArrowDownIcon />
        </IconWrapper>
      </SelectButton>
      <Dropdown $isOpen={isOpen}>
        {options.map((option) => (
          <Option
            key={option.value}
            $isSelected={option.value === value}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </Option>
        ))}
      </Dropdown>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </SelectContainer>
  );
};

export default Select;


