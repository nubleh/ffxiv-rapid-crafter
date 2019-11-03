import React from 'react';

import styled from 'styled-components/macro';

import { CraftState } from './index';

const buffLineColors: { [key: number]: string } = {
  /*
    1: 'Waste Not',
    2: 'Waste Not II',
    3: 'Manipulation',
    4: 'Great Strides',
    5: 'Innovation',
    6: 'Ingenuity',
    7: 'Maker\'s Mark',
    8: 'Name of the Elements',
    9: 'Reuse',
    10: 'Muscle Memory',
    11: 'Final Appraisal',
  */
  1: '#6a6a69',
  2: '#6a6a69',
  3: '#68ccac',
  4: '#c35289',
  5: '#2675c5',
  6: '#c5a666',
  7: '#2b7d5c',
  8: '#3bac4a',
  9: '#f7de63',
  10: '#ab6e59',
  11: '#1777da',
};

const BuffTimelineSVG = styled.svg`
  min-height: 15px;

  path {
    cursor: pointer;
    &:hover {
      stroke: black;
    }
  }
`;

interface BuffLine {
  buffId: number
  points: Array<number[] | null | undefined>
}
interface BuffTimelineProps {
  states: CraftState[]
  colWidth: number
  showBuffLineTooltip: (i: number) => (() => void)
  hideBuffLineTooltip: () => void
}
const BuffTimeline = (props: BuffTimelineProps) => {
  const { states, colWidth, showBuffLineTooltip, hideBuffLineTooltip } = props;
  const buffLines: BuffLine[] = [];
  const buffLineThickness = 3;
  const buffLineGap = 3;
  const buffLineTopGap = 5;
  const buffLineSpacing = buffLineThickness + buffLineGap;
  states.slice(1).forEach((state, stateIndex) => {
    const { buffs } = state;
    buffs.filter(buff => buff.buff !== 0).forEach((buff, buffIndex, filteredBuffs) => {
      const existingBuff = buffLines.find(b => b.buffId === buff.buff);
      let thisBuff: BuffLine;
      if (existingBuff) {
        thisBuff = existingBuff;
      } else {
        thisBuff = {
          buffId: buff.buff,
          points: [],
        };
        buffLines.push(thisBuff);
      }
      const startX = 20 + stateIndex * colWidth + buffLineSpacing;
      const startY = buffLineTopGap + ((filteredBuffs.length - 1) * buffLineSpacing + (buffLineThickness)) - (buffIndex * buffLineSpacing);
      const endX = 20 + (stateIndex * colWidth) + colWidth - buffLineSpacing;
      const endY = startY;
      thisBuff.points[stateIndex] = [startX, startY, endX, endY];
    });
  });
  const maxBuffHeight = Math.max(...states.map(st => st.buffs.length));
  return <BuffTimelineSVG style={{
    width: `${(states.length - 1) * colWidth}px`,
    height: `${(maxBuffHeight * buffLineSpacing) + buffLineTopGap}px`
  }}>
    {buffLines.map(buffLine => {
      const d = buffLine.points.map((point, pointIndex, points) => {
        let pointD = '';
        const prevPoint = points[pointIndex - 1];
        if (point && !prevPoint) {
          pointD += `
            M ${point[0] - (buffLineSpacing / 2)} 0
            C ${point[0] - (buffLineSpacing / 2)} ${point[1] / 2}
              ${point[0] - (buffLineSpacing / 4)} ${point[1]}
              ${point[0]} ${point[1]}
            L ${point[2]} ${point[3]}
          `;
        }
        if (point && prevPoint) {
          pointD += `
            M ${prevPoint[2]} ${prevPoint[3]}
            C ${point[0] - (point[0] - prevPoint[2]) / 2} ${prevPoint[3]}
              ${point[0] - (point[0] - prevPoint[2]) / 2} ${point[1]}
              ${point[0]} ${point[1]}
            L ${point[2]} ${point[3]}
          `;
        }
        return pointD;
      }).join(' ');
      return <path
        onMouseOver={showBuffLineTooltip(buffLine.buffId)}
        onMouseOut={hideBuffLineTooltip}
        key={buffLine.buffId}
        d={d}
        fill="transparent"
        strokeWidth="3"
        stroke={buffLineColors[buffLine.buffId] || '#ccc'}
      />;
    })}
  </BuffTimelineSVG>;
};

export default BuffTimeline;