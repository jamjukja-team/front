"use client";

import styled from "styled-components";
import { useState, useRef } from "react";
import { AccountCircleIcon } from "@/utils/icons";

interface ProfileUploadProps {
  value?: string;
  onChange?: (file: File | null) => void;
}

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text);
`;

const AvatarContainer = styled.div`
  position: relative;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  color: #9ca3af;
  transition: all 0.2s ease;

  &:hover {
    background: #c4c4c4;
  }
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const PlusIcon = styled.span`
  font-size: 36px;
  font-weight: 300;
  color: var(--color-text);
  line-height: 1;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ProfileUpload = ({ value, onChange }: ProfileUploadProps) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange?.(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <UploadContainer>
      <Label>프로필 사진</Label>
      <AvatarContainer onClick={handleClick}>
        {preview ? (
          <AvatarImage src={preview} alt="Profile" />
        ) : (
          <PlusIcon>+</PlusIcon>
        )}
        <HiddenInput
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </AvatarContainer>
    </UploadContainer>
  );
};

export default ProfileUpload;


