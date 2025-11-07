"use client";

import { forwardRef, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import styled from "styled-components";
import { TodayIcon } from "@/utils/icons";

// '일' 단위 (기간 선택) props
type DayProps = {
    mode: "day";
    value: [Date | null, Date | null];   // 날짜 범위
    onChange: (range: [Date | null, Date | null]) => void;
    minDate?: Date;
    maxDate?: Date;
    disabled?: boolean;
    className?: string;
    placeholderText?: string;
};
// '월' 단위 (단일 선택) props
type MonthProps = {
    mode: "month";
    value: Date | null;   // 단일 월
    onChange: (month: Date | null) => void;
    minDate?: Date;
    maxDate?: Date;
    disabled?: boolean;
    className?: string;
    placeholderText?: string;
};

export type PeriodPickerProps = DayProps | MonthProps;

const Shell = styled.button<{ disabled?: boolean }>`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: 1px solid var(--color-border, #e5e7eb);
  background: var(--color-background, #fff);
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 12px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  position: relative;

  &:hover {
    border-color: ${({ disabled }) =>
        disabled ? "var(--color-border, #e5e7eb)" : "#cbd5e1"};
  }
`;

const LabelBox = styled.span`
  flex: 0 0 auto;
  padding: 0 12px 0 4px;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text, #111827);    
  border-right : 1px solid #e5e7eb;
`;

const ValueBox = styled.span<{ $placeholder?: boolean }>`
  flex: 1 1 auto;
  padding-left: 8px;
  font-size: 18px;
  color: ${({ $placeholder }) => ($placeholder ? "#9ca3af" : "#111827")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align : left;
`;

const IconBox = styled.span`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  color: #374151;
  font-size: 14px;
`;

type CustomInputProps = React.ComponentPropsWithoutRef<"button"> & {
    placeholderText?: string;
    value?: string; // react-datepicker가 넘겨주는 표시 문자열
};

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
    ({ placeholderText, value, disabled, onClick }, ref) => {
        return (
            <Shell onClick={onClick} ref={ref} disabled={disabled}>
                <LabelBox>기간</LabelBox>
                <ValueBox $placeholder={!value}>
                    {!value ? placeholderText ?? "" : value}
                </ValueBox>
                <IconBox>
                    <TodayIcon />
                </IconBox>
            </Shell>
        );
    }
);
CustomInput.displayName = "CustomInput";

export default function PeriodPicker(props: PeriodPickerProps) {
    const common = {
        locale: ko,
        disabled: props.disabled,
        minDate: props.minDate,
        maxDate: props.maxDate,
        className: props.className,
    };

    if (props.mode === "day") {
        const [startDate, endDate] = props.value;
        const dateFormat = useMemo(() => "yyyy-MM-dd", []);
        return (
            <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={(dates) => {
                    const [start, end] = (dates ?? []) as [Date | null, Date | null];
                    props.onChange([start, end]);
                }}
                dateFormat={dateFormat}
                placeholderText={props.placeholderText ?? "YYYY-MM-DD ~ YYYY-MM-DD"}
                {...common}
            />
        );
    }

    // mode === 'month' : 단일 월 선택
    const dateFormat = useMemo(() => "yyyy-MM", []);
    return (
        <DatePicker
            selected={props.value}
            onChange={(d) => props.onChange(d)}
            showMonthYearPicker
            dateFormat={dateFormat}
            placeholderText={props.placeholderText ?? "YYYY-MM"}
            {...common}
            customInput={<CustomInput placeholderText={props.placeholderText ?? "YYYY-MM"} />}
        />
    );
}