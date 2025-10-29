"use client";

import styled from "styled-components";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
}

const StyledButton = styled.button``;

const Button = ({ type, children }: ButtonProps) => {
  return <StyledButton type={type}>{children}</StyledButton>;
};

export default Button;
