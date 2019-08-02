import React from 'react';

import styled from 'styled-components/macro';

import {
  CraftingAction,
} from '@ffxiv-teamcraft/simulator';

import actionNames from './data/actionNames';

const Button = styled.div`
  padding: 8px 16px;
`;

const MacroOutput = styled.textarea`
  display: none;
  line-height: 14px;
  width: 70vw;
  padding: 4px;
  margin-bottom: 8px;
  border-bottom: solid 1px #000;

  &:hover {
    display: block;
  }

  &:focus {
    outline: none;
  }
`;

const Wrapper = styled.div`
  background: #fff;
  border-radius: 4px;
  z-index: 5;
  border: solid 1px silver;
  color: #666;
  font-size: 11px;
  cursor: pointer;
  line-height: 14px;
  z-index: 15;
  max-height: 70vh;
  overflow: auto;

  &:focus, &:focus-within {
    outline: none;
    opacity: 0.9;

    ${Button} {
      display: none;
    }

    ${MacroOutput} {
      display: block;
    }
  }
`;

interface MacroBookProps {
  actions: CraftingAction[]
}

const MacroBook = (props: MacroBookProps) => {
  const {
    actions
  } = props;

  const macro = actions.map(act => {
    const id = act.getIds()[0];
    const name = (actionNames[id] || { en: 'Unknown Action' })['en'];
    return `/ac "${name}" <wait.${act.getWaitDuration()}>`;
  });
  let macros = [];
  if (macro.length > 15) {
    while(macro.length > 0) {
      const macroBlock = macro.splice(0, 14);
      if (macro.length > 0) {
        macroBlock.push('/echo <se.1>');
      }
      macros.push(macroBlock);
    }
  } else {
    macros = [macro];
  }

  const clickOutput = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget) {
      e.currentTarget.setSelectionRange(0, e.currentTarget.value.length);
    }
  };

  return <Wrapper tabIndex={1}>
    {macros.map((macroBlock, index) => <MacroOutput
      key={index}
      readOnly
      value={macroBlock.join("\n")}
      style={{
        height: `${macroBlock.length * 14}px`
      }}
      onClick={clickOutput}
    />)}
    <Button>Macro</Button>
  </Wrapper>
};

export default MacroBook;