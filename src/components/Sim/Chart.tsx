import React from 'react';

import styled from 'styled-components/macro';

export enum ChartMode {
  UPWARDS = 0,
  DOWNWARDS = 1,
}

const ChartBar = styled.div`
  height: 40px;
  padding: 0 10px;
  position: relative;
  white-space: nowrap;

  > svg {
    transition: width 0.2s;
  }

  > span {
    font-size: 8px;
    position: relative;
    padding: 0 4px;
    transform: translateY(-50%);
  }

  & + & > svg {
    border-top: solid 1px #000;
  }
`;

interface ChartProps {
  colWidth: number
  rowHeight: number
  domain: number[]
  data: number[]
  mode: ChartMode
  color: string
  label: string
  bgColor: string
}

const Chart = (props: ChartProps) => {
  const {
    colWidth,
    rowHeight,
    domain,
    data,
    mode,
    color,
    label,
    bgColor
  } = props;

  const maxValue = domain[1] === 0 ? 1 : domain[1];

  return <ChartBar>
    <svg style={{
      verticalAlign: mode === ChartMode.DOWNWARDS ? 'bottom' : 'top',
      background: bgColor
    }} width={(data.length - 1) * colWidth} height={rowHeight} xmlns="http://www.w3.org/2000/svg">
      {mode === ChartMode.UPWARDS && <path d={`
        M 0 40
        L 0 ${rowHeight - (rowHeight * data[0] / maxValue)}
        ${data.map((value, index, others) => {
          if (index < 1) {
            return '';
          }
          const progressEnd = rowHeight - (rowHeight * (value / maxValue));
          const progressStart = rowHeight - (rowHeight * (others[index - 1] / maxValue));
          return `C ${(index - 1) * colWidth + colWidth / 2} ${progressStart}
                    ${(index - 1) * colWidth + colWidth / 2} ${progressEnd}
                    ${(index - 1) * colWidth + colWidth} ${progressEnd}`;
        }).join("\n")}
        L ${(data.length) * colWidth} ${rowHeight}
      `} fill={color}/>}
      {mode === ChartMode.DOWNWARDS && <path d={`
        M 0 0
        L 0 ${(rowHeight * data[0] / maxValue)}
        ${data.map((value, index, others) => {
          if (index < 1) {
            return '';
          }
          const qualityEnd = (rowHeight * (value / maxValue));
          const qualityStart = (rowHeight * (others[index - 1] / maxValue))
          return `C ${(index - 1) * colWidth + colWidth / 2} ${qualityStart}
                    ${(index - 1) * colWidth + colWidth / 2} ${qualityEnd}
                    ${(index - 1) * colWidth + colWidth} ${qualityEnd}`;
        }).join("\n")}
        L ${(data.length) * colWidth} 0
      `} fill={color}/>}
    </svg>
    {mode === ChartMode.UPWARDS && <span style={{
      verticalAlign: 'bottom',
      bottom: `${Math.min(rowHeight, rowHeight*data[data.length - 1]/maxValue)}px`,
    }}>{data[data.length - 1]}/{maxValue} {label}</span>}
    {mode === ChartMode.DOWNWARDS && <span style={{
      verticalAlign: 'top',
      top: `${Math.min(40, 40*data[data.length - 1]/maxValue)}px`,
    }}>{data[data.length - 1]}/{maxValue} {label}</span>}
  </ChartBar>;
};

export default Chart;
