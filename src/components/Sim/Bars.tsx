import React from 'react';

import styled, { css } from 'styled-components/macro';

interface GenericBarProps {
  color?: string
}
const GenericBar = styled.div`
  width: 300px;
  height: 20px;
  background: #eee;
  margin: 10px;
  font-size: 10px;
  line-height: 20px;
  white-space: nowrap;

  > div, span {
    vertical-align: middle;
  }

  > span {
    margin: 0 4px;
  }

  > div {
    height: 100%;
    width: 100%;
    transition: width 0.3s;
    background: #ccc;
    display: inline-block;
  }

  ${({ color }: GenericBarProps) => color && css`
    > div {
      background: ${color};
    }
  `}
`;

interface Props {
  currentProgress: number
  maxProgress: number
  currentQuality: number
  maxQuality: number
  currentDurability: number
  maxDurability: number
  currentCP: number
  maxCP: number
}
const Bars = (props: Props) => {
  const {
    currentProgress,
    maxProgress,
    currentQuality,
    maxQuality,
    currentDurability,
    maxDurability,
    currentCP,
    maxCP,
  } = props;
  return <div>
    <GenericBar color={'#9eca4b'}>
      <div style={{width: `${Math.min(100, currentProgress/maxProgress*100)}%`}}/>
      <span>
        {currentProgress}/{maxProgress} Progress
      </span>
    </GenericBar>
    <GenericBar color={'#50a1bf'}>
      <div style={{width: `${Math.min(100, currentQuality/maxQuality*100)}%`}}/>
      <span>
        {currentQuality}/{maxQuality} Quality
      </span>
    </GenericBar>
    <GenericBar>
      <div style={{width: `${Math.min(100, currentDurability/maxDurability*100)}%`}}/>
      <span>
        {currentDurability}/{maxDurability} Durability
      </span>
    </GenericBar>
    <GenericBar color={'#bf7ed9'}>
      <div style={{width: `${Math.min(100, currentCP/maxCP*100)}%`}}/>
      <span>
        {currentCP}/{maxCP} CP
      </span>
    </GenericBar>
  </div>
};

export default Bars;