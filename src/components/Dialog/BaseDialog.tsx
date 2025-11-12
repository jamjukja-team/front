// src/components/Modal/Modal.tsx
"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    width?: number; // px
    children: React.ReactNode;
    title?: string;
};

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Dialog = styled.div<{ $width?: number }>`
  width: 100%;
  max-width: ${({ $width }) => ($width ? `${$width}px` : "640px")};
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  overflow: hidden;
`;

const Header = styled.div`
  padding: 18px 20px;
  font-size: 20px;
  font-weight: 700;
  border-bottom: 1px solid #eceef1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CloseBtn = styled.button`
  border: 0;
  background: transparent;
  font-size: 20px;
  line-height: 1;
  padding: 6px;
  cursor: pointer;
  color: #6b7280;

  &:hover { color: #111827; }
`;

const Body = styled.div`
  padding: 20px;
`;

export default function Modal({ open, onClose, width, children, title }: ModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    // 바깥 클릭 닫기
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    if (!open) return null;

    return createPortal(
        <Backdrop onClick={handleBackdropClick} aria-modal="true" role="dialog">
            <Dialog ref={dialogRef} $width={width} aria-label={title}>
                {title && (
                    <Header>
                        <span>{title}</span>
                        <CloseBtn type="button" onClick={onClose} aria-label="닫기">×</CloseBtn>
                    </Header>
                )}
                <Body>{children}</Body>
            </Dialog>
        </Backdrop>,
        document.body
    );
}