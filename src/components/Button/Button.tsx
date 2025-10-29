"use client";

import styled from "styled-components";
import cn from "classnames/bind";
import styles from "./Button.module.css";
import { ReactNode } from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
}

const cx = cn.bind(styles);

const StyledButton = styled.button``;

const Button = ({ type, children }: ButtonProps) => {
  return <StyledButton type={type}>{children}</StyledButton>;
};

export default Button;
