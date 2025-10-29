"use client";

import styled from "styled-components";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  onSubmit?: () => void;
  children?: React.ReactNode;
}

const StyledButton = styled.button``;

const Button = ({ type, onClick, onSubmit, children }: ButtonProps) => {
  return (
    <StyledButton type={type} onClick={onClick} onSubmit={onSubmit}>
      {children}
    </StyledButton>
  );
};

export default Button;
