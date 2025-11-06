"use client";

import styled from "styled-components";

interface WorkHoursData {
  date: string;
  hours: number;
  overtime?: number;
}

interface WorkHoursChartProps {
  data?: WorkHoursData[];
}

const ChartContainer = styled.div`
  background-color: var(--color-background);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 100%;
`;

const ChartTitle = styled.h3`
  font-size: 24px;
  font-weight: 500;
  color: var(--color-text);
  margin: 0 0 12px 0;
`;

const ChartArea = styled.div`
  position: relative;
  height: 422px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 31px 0 0 37px;
  border-bottom: 1px solid var(--color-border);
  border-left: 1px solid var(--color-border);
`;

const YAxisLabels = styled.div`
  position: absolute;
  left: 0;
  top: 31px;
  height: calc(100% - 31px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 8px;
  font-size: 12px;
  color: var(--color-text-secondary);
  width: 37px;
`;

const YAxisLabel = styled.div`
  text-align: right;
  padding-right: 8px;
`;

const YAxisTitle = styled.div`
  position: absolute;
  left: 5px;
  top: 9px;
  font-size: 12px;
  color: var(--color-text-secondary);
`;

const BarsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 52px;
  width: calc(100% - 37px);
  height: 100%;
  padding-bottom: 60px;
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const BarGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70px;
  justify-content: flex-end;
`;

const RegularBar = styled.div<{ $height: number }>`
  width: 70px;
  height: ${({ $height }) => $height}px;
  background-color: var(--color-gray-300);
  border-radius: 4px 4px 0 0;
  min-height: ${({ $height }) => $height > 0 ? '4px' : '0'};
`;

const OvertimeBar = styled.div<{ $height: number }>`
  width: 70px;
  height: ${({ $height }) => $height}px;
  background-color: #F26B63;
  border-radius: 4px 4px 0 0;
  margin-top: 2px;
  min-height: ${({ $height }) => $height > 0 ? '4px' : '0'};
`;

const DateLabel = styled.div`
  font-size: 12px;
  color: var(--color-text);
  text-align: center;
  width: 70px;
`;

const Legend = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  font-size: 12px;
  color: var(--color-text-secondary);
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LegendColor = styled.div<{ $color: string }>`
  width: 20px;
  height: 20px;
  background-color: ${({ $color }) => $color};
  border-radius: 2px;
`;

const WorkHoursChart = ({ data = [] }: WorkHoursChartProps) => {
  const maxHours = 14;
  const chartHeight = 330; // 실제 차트 영역 높이 (422 - 31 - 60)
  const yAxisLabels = [12, 10, 8, 6, 4, 2, 0];

  const calculateHeight = (hours: number) => {
    return (hours / maxHours) * chartHeight;
  };

  return (
    <ChartContainer>
      <ChartTitle>이번주 근무 누적시간</ChartTitle>
      <ChartArea>
        <YAxisTitle>(시간)</YAxisTitle>
        <YAxisLabels>
          {yAxisLabels.map((label) => (
            <YAxisLabel key={label}>{label}</YAxisLabel>
          ))}
        </YAxisLabels>
        <BarsContainer>
          {data.map((item, index) => {
            const regularHours = item.hours - (item.overtime || 0);
            const regularHeight = calculateHeight(regularHours);
            const overtimeHeight = calculateHeight(item.overtime || 0);
            
            return (
              <BarContainer key={index}>
                <BarGroup>
                  {regularHeight > 0 && <RegularBar $height={regularHeight} />}
                  {overtimeHeight > 0 && <OvertimeBar $height={overtimeHeight} />}
                </BarGroup>
                <DateLabel>{item.date}</DateLabel>
              </BarContainer>
            );
          })}
        </BarsContainer>
      </ChartArea>
      <Legend>
        <LegendItem>
          <LegendColor $color="#F26B63" />
          <span>연장근무</span>
        </LegendItem>
      </Legend>
    </ChartContainer>
  );
};

export default WorkHoursChart;
