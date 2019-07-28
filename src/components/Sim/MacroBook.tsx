import React, { useState, useEffect } from 'react';

import styled, { css } from 'styled-components/macro';

import {
  CraftingAction,
} from '@ffxiv-teamcraft/simulator';

import actionNames, { ActionNames } from './data/actionNames';

const Wrapper = styled.div`
  background: #fff;
  padding: 4px 0;
  border-radius: 4px;
  position: fixed;
  z-index: 5;
  left: 4px;
  bottom: 4px;
  border: solid 1px silver;
  color: #666;
  font-size: 11px;
  cursor: pointer;

  &:focus, &:focus-within, &:hover {
    outline: none;
  }
`;

interface MacroBookProps {
  actions: CraftingAction[]
}

const MacroBook = (props: MacroBookProps) => {
  const {
    actions
  } = props;

  return <Wrapper tabIndex={1}>
    Macroa
  </Wrapper>
};

export default MacroBook;