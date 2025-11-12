// src/components/Attendance/EditAttendanceModal.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import type { Attendance } from "@/types/api";
import Modal from "./BaseDialog";

type Props = {
  open: boolean;
  onClose: () => void;
  data: Attendance; // 수정 대상
  onSave: (updated: Attendance) => void | Promise<void>; // 저장 콜백(서버 요청/뮤테이션 등)
};

// ----- 스타일 -----
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 24px;
  row-gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  font-size: 14px;
  color: #6b7280;
  display: block;
  margin-bottom: 8px;
`;

const Read = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fafafa;
  color: #111827;
`;

const Field = styled.input`
  height: 44px;
  width: 100%;
  padding: 0 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  color: #111827;
  font-size: 15px;

  &:focus {
    outline: none;
    border-color: #00c2c4;
    box-shadow: 0 0 0 3px rgba(0,194,196,0.15);
  }
`;

const Select = styled.select`
  height: 44px;
  width: 100%;
  padding: 0 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  color: #111827;
  font-size: 15px;

  &:focus {
    outline: none;
    border-color: #00c2c4;
    box-shadow: 0 0 0 3px rgba(0,194,196,0.15);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 44px;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #00c2c4;
    box-shadow: 0 0 0 3px rgba(0,194,196,0.15);
  }
`;

const Hr = styled.div`
  border-top: 1px solid #eceef1;
  margin: 16px 0 10px;
`;

const Row = styled.div`
  grid-column: 1 / -1;
`;

const Footer = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const Btn = styled.button<{ $kind?: "primary" | "ghost" }>`
  min-width: 88px;
  height: 40px;
  border-radius: 10px;
  font-weight: 600;
  border: 1px solid ${({ $kind }) => ($kind === "primary" ? "#0B898A" : "#e5e7eb")};
  background: ${({ $kind }) => ($kind === "primary" ? "#0B898A" : "#fff")};
  color: ${({ $kind }) => ($kind === "primary" ? "#fff" : "#374151")};
  cursor: pointer;

  &:disabled {
    opacity: .6;
    cursor: not-allowed;
  }
`;

// ----- 유틸(시간 계산) -----
function toMinutes(hhmm: string | undefined) {
  if (!hhmm) return null;
  const [h, m] = hhmm.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}
function diffText(inTime?: string, outTime?: string) {
  const a = toMinutes(inTime);
  const b = toMinutes(outTime);
  if (a == null || b == null || b < a) return "-";
  const d = b - a;
  const h = Math.floor(d / 60);
  const m = d % 60;
  return m ? `${h}시간 ${m}분` : `${h}시간`;
}

// ----- 컴포넌트 -----
export default function EditAttendanceModal({ open, onClose, data, onSave }: Props) {
  // form state
  const [form, setForm] = useState(() => ({
    check_in: data.check_in ?? "",
    check_out: data.check_out ?? "",
    status: data.status ?? "정상근무",
    remarks: data.remarks ?? "",
  }));
  const { check_in: checkIn, check_out: checkOut, status, remarks } = form;

  // type="time" 은 24시간제 → 값은 "HH:MM"
  // (표시는 브라우저/OS 로케일 영향. 디자인 그대로 오전/오후 문구를 만들고 싶다면 별도 커스텀 입력을 두세요.)
  const totalText = useMemo(() => diffText(checkIn, checkOut), [checkIn, checkOut]);

  const disabled = false;

  const handleSave = async () => {
    const updated: Attendance = {
      ...data,
      check_in: checkIn,
      check_out: checkOut,
      status,
      remarks,
      // 서버가 work_hours를 계산해 주면 제외해도 됨
      work_hours: totalText === "-" ? data.work_hours : totalText,
    };
    await onSave(updated);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} width={720} title="출퇴근 정보 수정">
      <Grid>
        {/* 사번 / 이름 */}
        <div>
          <Label>사번</Label>
          <Read>{data.emp_id ?? "-"}</Read>
        </div>
        <div>
          <Label>이름</Label>
          <Read>{data.emp_nm ?? "-"}</Read>
        </div>

        {/* 날짜 */}
        <Row>
          <Label>날짜</Label>
          <Read>{data.date}</Read>
          <Hr />
        </Row>

        {/* 출근/퇴근 */}
        <div>
          <Label>출근 시간</Label>
          <Field
            type="time"
            value={checkIn}
            onChange={(e) => setForm((f) => ({ ...f, check_in: e.target.value }))}
          />
        </div>
        <div>
          <Label>퇴근 시간</Label>
          <Field
            type="time"
            value={checkOut}
            onChange={(e) => setForm((f) => ({ ...f, check_out: e.target.value }))}
          />
        </div>

        {/* 상태 */}
        <Row>
          <Label>상태</Label>
          <Select value={status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
            <option value="정상근무">정상근무</option>
            <option value="지각">지각</option>
            <option value="조퇴">조퇴</option>
            <option value="연차">연차</option>
            <option value="반차">반차</option>
            <option value="결근">결근</option>
            <option value="병가">병가</option>
            <option value="연장근무">연장근무</option>
          </Select>
        </Row>

        {/* 비고 */}
        <Row>
          <Label>비고</Label>
          <Textarea
            placeholder="비고를 입력하세요"
            value={remarks}
            onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))}
          />
        </Row>

        {/* 요약(총 근무시간) */}
        <Row>
          <Read>총 근무시간: {totalText}</Read>
        </Row>
      </Grid>

      <Footer>
        <Btn $kind="ghost" type="button" onClick={onClose}>취소</Btn>
        <Btn $kind="primary" type="button" onClick={handleSave} disabled={disabled}>
          저장
        </Btn>
      </Footer>
    </Modal>
  );
}