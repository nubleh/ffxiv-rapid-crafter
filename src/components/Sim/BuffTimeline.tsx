import React, { useEffect, useState, useRef } from 'react';

import styled, { css, keyframes } from 'styled-components/macro';

import { CraftState } from './index';

const buffLineColors: { [key: number]: string } = {
  /*
    INNER_QUIET = 0,
    STEADY_HAND = 1,
    STEADY_HAND_II = 2,
    WASTE_NOT = 3,
    WASTE_NOT_II = 4,
    STROKE_OF_GENIUS = 5,
    INITIAL_PREPARATIONS = 6,
    COMFORT_ZONE = 7,
    WHISTLE_WHILE_YOU_WORK = 8,
    HEART_OF_CRAFTER = 9,
    MANIPULATION = 10,
    MANIPULATION_II = 11,
    GREAT_STRIDES = 12,
    INNOVATION = 13,
    INGENUITY = 14,
    INGENUITY_II = 15,
    MAKERS_MARK = 16,
    NAME_OF_THE_ELEMENTS = 17,
    RECLAIM = 18,
    REUSE = 19
  */
  0: '#deae6d',
  1: '#ab6e59', 
  2: '#ab6e59', 
  3: '#6a6a69',
  4: '#6a6a69',
  5: '#6d7d69',
  6: '#1777da',
  7: '#db75ed',
  8: '#e1be4d',
  9: '#6ee626',
  10: '#68ccac',
  11: '#68ccac',
  12: '#c35289',
  13: '#2675c5',
  14: '#c5a666',
  15: '#c5a666',
  16: '#2b7d5c',
  17: '#3bac4a',
  18: '#72aae7',
  19: '#f7de63',
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

interface BuffTimelineProps {
  states: CraftState[]
  colWidth: number
  showBuffLineTooltip: (i: number) => (() => void)
  hideBuffLineTooltip: () => void
}
const BuffTimeline = (props: BuffTimelineProps) => {
  const { states, colWidth, showBuffLineTooltip, hideBuffLineTooltip } = props;
  const buffLines: Array<{
    buffId: number
    points: Array<number[] | null | undefined>
  }> = [];
  const buffLineThickness = 3;
  const buffLineGap = 3;
  const buffLineTopGap = 5;
  const buffLineSpacing = buffLineThickness + buffLineGap;
  states.slice(1).forEach((state, stateIndex) => {
    const { buffs } = state;
    buffs.filter(buff => buff.buff !== 0).forEach((buff, buffIndex, filteredBuffs) => {
      const existingBuff = buffLines.find(b => b.buffId === buff.buff);
      let thisBuff: {
        buffId: number
        points: Array<number[] | null | undefined>
      };
      if (existingBuff) {
        thisBuff = existingBuff;
      } else {
        thisBuff = {
          buffId: buff.buff,
          points: []
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