import React, { useEffect, useState, useRef } from 'react';

import styled, { css, keyframes } from 'styled-components/macro';

import { CraftState } from './index';

const IQLine = styled.div`
  padding: 0 10px;
  position: relative;
  bottom: -10px;

  > svg {
    height: 40px;
    display: block;

    > path {
      cursor: pointer;
      stroke: #6e9a1b;
    }
  }
`;

interface StackNumberProps {
  full?: boolean
}
const StackNumber = styled.div`
  position: absolute;
  color: #666;
  font-size: 10px;
  transform: translateX(-50%);

  ${({ full }: StackNumberProps) => full && css`
    color: #000;
  `}
`;

interface IQBedProps {
  states: CraftState[]
  colWidth: number
}
const IQBed = (props: IQBedProps) => {
  const { states, colWidth } = props;
  const lineThickness = 3;
  const lineSpacing = 6;
  const IQStacks = states.slice(1).map(st => {
    const { buffs } = st;
    const IQ = buffs.find(buff => buff.buff === 0);
    return IQ ? IQ.stacks : 0;
  });
  const IQLines: Array<{
    start: number
    end: number
  }> = [];
  let start = -1;
  IQStacks.forEach((stack, stackIndex) => {
    if (stack > 0 && start < 0) {
      start = stackIndex;
      IQLines.push({
        start,
        end: -1
      });
    }
    if (start > -1 && stack < 1) {
      IQLines[IQLines.length - 1].end = stackIndex;
      start = -1;
    }
  });
  const leafWidth = 6;
  const leafHeight = 4;

  return <IQLine>
    {IQStacks.map((IQStack, IQStackIndex) => {
      return IQStack > 0 && <StackNumber
        style={{
          top: 20 - IQStack * (leafHeight / 2),
          left: colWidth + IQStackIndex * colWidth
        }}
        full={IQStack >= 11}
      >{IQStack}</StackNumber>;
    })}
    <svg style={{
      width: `${(states.length - 1) * colWidth}px`,
    }}>
      {IQStacks.map((IQStack, IQStackIndex) => {
        const leaves: number[] = [];
        const x = 20 + IQStackIndex * colWidth;
        const y = 40 - lineSpacing;
        for (let j = 0; j < IQStack; j++) {
          leaves.push(1);
        }
        const leafColor = leaves.length >= 11 ? '#dcac2a' : '#3e6a00';
        return <g
          key={IQStackIndex}
        >
          <path
            d={`
              M ${x + leafWidth} ${y}
              L ${x + leafWidth} ${y - IQStack * leafHeight * 0.5}
            `}
            stroke="#6e9a1b"
            fill="transparent"
          />;
          {leaves.map((_, leafIndex) => {
            const xx = x + (leafIndex % 2) * leafWidth;
            const yy = (y - leafHeight * 1.5) - (leafIndex * leafHeight * 0.5);
            const d = leafIndex >= 10 ? `
              M ${xx + 0.5 * leafWidth} ${yy + 0.75 * leafHeight}
              C ${xx + 0.75 * leafWidth} ${yy + 0.75 * leafHeight}
                ${xx + leafWidth} ${yy + 0.9 * leafHeight}
                ${xx + leafWidth} ${yy + leafHeight}
              C ${xx + leafWidth} ${yy + 0.5 * leafHeight}
                ${xx + 0.75 * leafWidth} ${yy}
                ${xx + 0.5 * leafWidth} ${yy}
              C ${xx + 0.25 * leafWidth} ${yy}
                ${xx} ${yy - 0.15 * leafHeight}
                ${xx} ${yy - 0.25 * leafHeight}
              C ${xx} ${yy + 0.25 * leafHeight}
                ${xx + 0.25 * leafWidth} ${yy + 0.75 * leafHeight}
                ${xx + 0.5 * leafWidth} ${yy + 0.75 * leafHeight}
            ` : `
              M ${xx} ${yy + leafHeight}
              C ${xx} ${yy + 0.9 * leafHeight}
                ${xx + 0.25 * leafWidth} ${yy + 0.75 * leafHeight}
                ${xx + 0.5 * leafWidth} ${yy + 0.75 * leafHeight}
              C ${xx + 0.75 * leafWidth} ${yy + 0.75 * leafHeight}
                ${xx + leafWidth} ${yy + 0.9 * leafHeight}
                ${xx + leafWidth} ${yy + leafHeight}
              C ${xx + leafWidth} ${yy + 0.5 * leafHeight}
                ${xx + 0.75 * leafWidth} ${yy}
                ${xx + 0.5 * leafWidth} ${yy}
              C ${xx + 0.25 * leafWidth} ${yy}
                ${xx} ${yy + 0.5 * leafHeight}
                ${xx} ${yy + leafHeight}
            `;
            return <path
              d={d}
              key={leafIndex}
              stroke="transparent"
              fill={leafColor}
            />;
          })}
        </g>;
      })}
      {IQLines.map((IQLine, IQLineIndex) => {
        const start = 20 + IQLine.start * colWidth + lineThickness / 2;
        const end = IQLine.end < 0 ? (states.length - 1) * colWidth : IQLine.end * colWidth;
        const gap = lineSpacing;
        return <path
          key={IQLineIndex}
          d={`
            M ${start} 40
            C ${start} ${40 - gap / 2}
              ${start + gap / 2} ${40 - gap}
              ${start + gap} ${40 - gap}
            ${IQLine.end < 0 ? `
              L ${end} ${40 - gap}
            ` : `
              L ${end + gap} ${40 - gap}
              C ${end + gap * 1.5} ${40 - gap}
                ${end + gap * 2} ${40 - gap / 2}
                ${end + gap * 2} 40
            `}
          `}
          fill="transparent"
          strokeWidth="3"
          stroke={'#ccc'}
        />
      })}
    </svg>
  </IQLine>;
};

export default IQBed;
