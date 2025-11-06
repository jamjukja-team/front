"use client";

import styled from "styled-components";
import Button from "@/components/Button/Button";

interface AttendanceButtonProps {
  type: "checkIn" | "checkOut";
  onClick: () => void;
  disabled?: boolean;
}

const StyledAttendanceButton = styled(Button)<{ $buttonType: "checkIn" | "checkOut" }>`
  width: 150px;
  height: 35px;
  padding: 0;
  font-size: 20px;
  font-weight: 400;
  background-color: ${(props) =>
    props.$buttonType === "checkIn"
      ? "#d9d9d9"
      : "#d9d9d9"};
  color: var(--color-text);
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
  box-shadow: none;

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.$buttonType === "checkIn"
        ? "#c9c9c9"
        : "#c9c9c9"};
    transform: none;
    box-shadow: none;
  }

  &:active:not(:disabled) {
    transform: none;
    box-shadow: none;
  }

  &:disabled {
    background-color: var(--color-gray-400);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &:focus {
    outline: none;
  }
`;

const AttendanceButton = ({
  type,
  onClick,
  disabled = false,
}: AttendanceButtonProps) => {
  const buttonText = type === "checkIn" ? "출근" : "퇴근";

  return (
    <StyledAttendanceButton
      type="button"
      onClick={onClick}
      disabled={disabled}
      $buttonType={type}
    >
      {buttonText}
    </StyledAttendanceButton>
  );
};

export default AttendanceButton;
