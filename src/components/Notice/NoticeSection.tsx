"use client";

import styled from "styled-components";

interface Notice {
  id: string;
  title: string;
  content: string;
  date?: string;
}

interface NoticeSectionProps {
  notices?: Notice[];
}

const NoticeContainer = styled.div`
  background-color: var(--color-background);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
`;

const NoticeTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 24px 0;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 16px 0;
`;

const NoticeItem = styled.div`
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const NoticeItemTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 4px;
`;

const NoticeItemContent = styled.div`
  font-size: 14px;
  color: var(--color-text-secondary);
`;

const NoticeSection = ({ notices = [] }: NoticeSectionProps) => {
  return (
    <NoticeContainer>
      <NoticeTitle>공지사항</NoticeTitle>
      <Divider />
      {notices.length > 0 ? (
        notices.map((notice) => (
          <NoticeItem key={notice.id}>
            <NoticeItemTitle>{notice.title}</NoticeItemTitle>
            <NoticeItemContent>{notice.content}</NoticeItemContent>
          </NoticeItem>
        ))
      ) : (
        <NoticeItem>
          <NoticeItemContent>공지사항이 없습니다.</NoticeItemContent>
        </NoticeItem>
      )}
    </NoticeContainer>
  );
};

export default NoticeSection;

