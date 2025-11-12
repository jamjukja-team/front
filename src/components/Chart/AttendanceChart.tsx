"use client";

import { useMemo } from "react";
import styled from "styled-components";
import { parseWorkMinutes, formatHm } from "@/utils/attendanceSummary";
import { Attendance } from "@/types/api";

// react-chartjs-2 + Chart.js 등록
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const Wrap = styled.div`
width : 100%;

`;

const Card = styled.div`
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 12px;
  background: #fff;
  padding: 16px;
  padding-bottom : 36px;
`;

const TitleBox = styled.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

type OvertimeLike = {
    // 있으면 그대로 사용 (분 단위)
    overtime_minutes?: number;
    // "1:30" 같은 문자열일 경우(선택)
    overtime_hm?: string;
};

function parseOvertimeMinutes(d: Attendance & OvertimeLike, totalMins: number) {
    // 1) 명시 필드가 있으면 최우선 사용
    if (typeof d.overtime_minutes === "number") return Math.max(d.overtime_minutes, 0);

    if (typeof d.overtime_hm === "string") {
        const [h, m] = d.overtime_hm.split(":").map((x) => parseInt(x, 10));
        if (!Number.isNaN(h)) return Math.max(h * 60 + (Number.isNaN(m) ? 0 : m), 0);
    }

    // 2) 상태가 '연장근무'이거나, 총 근무가 8시간 초과면 초과분을 연장으로 간주 (폴백 규칙)
    const BASE = 8 * 60;
    if (d.status === "연장근무" || totalMins > BASE) {
        return Math.max(totalMins - BASE, 0);
    }

    // 3) 없으면 0
    return 0;
}

export default function AttendanceChart({ data }: { data: Attendance[] }) {
    // x축 라벨(날짜), 일반근무/연장근무(시), 총합(분)
    const { labels, regularHours, overtimeHours, totalMinutes } = useMemo(() => {
        const labels: string[] = [];
        const regularHours: number[] = [];
        const overtimeHours: number[] = [];
        let totalMinutes = 0;

        data.forEach((d) => {
            labels.push(d.date.slice(5)); // "MM-DD"
            const totalMins = parseWorkMinutes(d.work_hours); // 전체 근무(분)
            totalMinutes += totalMins;

            const otMins = parseOvertimeMinutes(d as any, totalMins);
            const regMins = Math.max(totalMins - otMins, 0);

            // 소수 2자리로 시간 단위로 변환
            regularHours.push(Number((regMins / 60).toFixed(2)));
            overtimeHours.push(Number((otMins / 60).toFixed(2)));
        });

        return { labels, regularHours, overtimeHours, totalMinutes };
    }, [data]);

    // 스택형 막대 데이터 (일반 + 연장)
    const barData = useMemo(
        () => ({
            labels,
            datasets: [
                {
                    label: "일반 근무",
                    data: regularHours,
                    backgroundColor: "#d1d5db",
                    borderWidth: 0,
                    stack: "work",
                },
                {
                    label: "연장 근무",
                    data: overtimeHours,
                    backgroundColor: "#F9B8B8",
                    borderWidth: 0,
                    stack: "work",
                },
            ],
        }),
        [labels, regularHours, overtimeHours]
    );

    const barOptions = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false as const,
            plugins: {
                legend: { display: true },
                tooltip: {
                    callbacks: {
                        // 각 막대 조각 툴팁
                        label: (ctx: any) => {
                            const h = Number(ctx.parsed.y);
                            const mins = Math.round(h * 60);
                            return ` ${ctx.dataset.label}: ${h}h (${formatHm(mins)})`;
                        },
                        // 한 막대(하루)에 대한 전체 합계 표시
                        footer: (items: any[]) => {
                            const sumH = items.reduce((acc: number, it: any) => acc + Number(it.parsed.y), 0);
                            const sumM = Math.round(sumH * 60);
                            return `합계: ${sumH.toFixed(2)}h (${formatHm(sumM)})`;
                        },
                    },
                    footerFont: { weight: 600 },
                },
                title: {
                    display: false,
                    text: "",
                },
            },
            scales: {
                x: { stacked: true },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        callback: (val: any) => `${val}h`,
                    },
                },
            },
        }),
        []
    );

    return (
        <Wrap>
            <Card style={{ height: 360 }}>
                <TitleBox>일자별 근무시간</TitleBox>
                <Bar data={barData} options={barOptions} />
            </Card>
        </Wrap>
    );
}