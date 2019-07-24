import React, { useEffect, useState, useRef } from 'react';

import styled, { css } from 'styled-components/macro';

import {
  ActionType,
  CraftingAction,
  CraftingActionsRegistry,
  Simulation,
  Craft,
  CrafterStats,
  CraftingJob
} from '@ffxiv-teamcraft/simulator';

import { Icons } from './Icons';

const jobs = [
  '', '', '', '', '', '', '', '',
  'CRP',
  'BSM',
  'ARM',
  'GSM',
  'LTW',
  'WVR',
  'ALC',
  'CUL'
];

const job_id = 1;
const testRecipe = {
  durability: 80,
  job: job_id,
  lvl: 80,
  progress: 3943,
  quality: 20287,
  rlvl: 430,
  materialQualityFactor: 75,
  id: '0',
  suggestedControl: 1733,
  suggestedCraftsmanship: 1866,
  quickSynth: 1,
  ingredients: [],
  hq: 1,
} as Craft;
const testStats = new CrafterStats(
  job_id,
  1800,
  1800,
  400,
  false,
  80,
  [80, 80, 80, 80, 80, 80, 80, 80]
);
const testActions: CraftingAction[] = [
];
const all = CraftingActionsRegistry.ALL_ACTIONS;
window.console.log(all);
(window as any).derp = all;

interface JobButtonProps {
  active?: boolean
}
const JobButton = styled.div`
  padding: 4px 8px;
  display: inline-block;
  cursor: pointer;
  background: f0f0f0;
  border-radius: 4px;
  box-sizing: border-box;
  margin: 4px;

  ${({ active }: JobButtonProps) => active && css`
    border: solid 1px #ccc;
  `}

  &:hover {
    background: #a0a0a0;
  }
`;

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

const ActionBar = styled.div`
  background: #f0f0f0;
  padding: 10px 20px;
  height: 40px;

  > img, > div {
    vertical-align: middle;
  }

  &::before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 40px;
  }
`;

const SimComponent = () => {
  const [actions, set_actions] = useState([] as CraftingAction[]);
  const [jobId, set_jobId] = useState(8);
  const [craftsmanship, set_craftsmanship] = useState(1800);
  const [control, set_control] = useState(1800);
  const [cp, set_cp] = useState(400);

  const [sim, set_sim] = useState(undefined as Simulation | undefined);

  useEffect(() => {
    const stats = new CrafterStats(
      jobId,
      craftsmanship,
      control,
      cp,
      false,
      80,
      [80, 80, 80, 80, 80, 80, 80, 80]
    );
    const sim = new Simulation(
      testRecipe,
      actions,
      stats,
    );
    sim.run();
    set_sim(sim);
    (window as any).derp2 = sim;
    window.console.log(sim);
  }, [
    actions,
    craftsmanship,
    control,
    cp,
  ]);

  const clickAction = (action: CraftingAction) => {
    return () => {
      set_actions([...actions, action]);
    };
  };

  const clickJobAction = (index: number) => {
    return () => {
      set_actions([
        ...actions.slice(0, index),
        ...actions.slice(index + 1)
      ]);
    };
  };

  const clickJobButton = (jobId: number) => {
    return () => {
      set_jobId(jobId);
    };
  };

  const clearActions = () => {
    set_actions([]);
  };

  return <div>
    {sim && <div>
      <GenericBar color={'#9eca4b'}>
        <div style={{width: `${Math.min(100, sim.progression/sim.recipe.progress*100)}%`}}/>
        <span>
          {sim.progression}/{sim.recipe.progress} Progress
        </span>
      </GenericBar>
      <GenericBar color={'#50a1bf'}>
        <div style={{width: `${Math.min(100, sim.quality/sim.recipe.quality*100)}%`}}/>
        <span>
          {sim.quality}/{sim.recipe.quality} Quality
        </span>
      </GenericBar>
      <GenericBar>
        <div style={{width: `${Math.min(100, sim.durability/sim.recipe.durability*100)}%`}}/>
        <span>
          {sim.durability}/{sim.recipe.durability} Durability
        </span>
      </GenericBar>
      <GenericBar color={'#bf7ed9'}>
        <div style={{width: `${Math.min(100, sim.availableCP/cp*100)}%`}}/>
        <span>
          {sim.availableCP}/{cp} CP
        </span>
      </GenericBar>
    </div>}
    <ActionBar>
      <JobButton onClick={clearActions} active={true}>Clear</JobButton>
      {actions.map((action, index) => <img
        key={index}
        src={(Icons as any)[action.getId(jobId)]}
        onClick={clickJobAction(index)}
      />)}
    </ActionBar>
    <div>
      {jobs.map((n, i) => n && <JobButton
        active={jobId === i}
        key={i}
        onClick={clickJobButton(i)}>
        {n}
      </JobButton>)}
    </div>
    {all.map((i, index) => <img
      key={index}
      src={(Icons as any)[i.action.getId(jobId)]}
      onClick={clickAction(i.action)}
    />)}
    <pre>
      {JSON.stringify(sim, null, 2)}
    </pre>
  </div>;
};

export default SimComponent;
