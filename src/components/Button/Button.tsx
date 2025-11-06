"use client";

import styled from "styled-components";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  onSubmit?: () => void;
  children?: React.ReactNode;
  bg? : string;
  full?: boolean;
  color?: string;
}

const StyledButton = styled.button<{ $bg?: string, $full?: boolean; $color?: string}>`
   width: ${({ $full }) => ($full ? "100%" : "auto")};
  padding: 8px 18px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  color: ${({ $color }) =>
      $color === "white" ? "#fff" :
      $color === "black" ? "#000" :
      $color || "#fff"};

  background-color: ${({ $bg }) =>
      $bg === "primary" ? "#00C2C4" :
      $bg === "danger" ? "#F26B63" :
      $bg || "#00C2C4"};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--color-primary-hover);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background-color: var(--color-gray-400);
    cursor: not-allowed;
    transform: none;
  }

  &:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;

const Button = ({ type, onClick, onSubmit, children }: ButtonProps) => {
  return (
    <StyledButton type={type} onClick={onClick} onSubmit={onSubmit}>
      {children}
    </StyledButton>
  );
};

export default Button;
