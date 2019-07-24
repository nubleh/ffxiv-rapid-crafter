import React, { useEffect, useState, useRef } from 'react';

import styled, { css } from 'styled-components/macro';

import {
  ActionType,
  CraftingAction,
  CraftingActionsRegistry,
  Simulation,
  Craft,
  CrafterStats,
  CraftingJob,
  EffectiveBuff,
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
  progress: Math.floor(3943 / 2.5),
  quality: Math.floor(20287 / 2),
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
  489,
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
  background: #f7f7f7;
  border-radius: 4px;
  box-sizing: border-box;
  margin: 4px;
  border: solid 1px transparent;
  margin-top: 20px;

  ${({ active }: JobButtonProps) => active && css`
  border: solid 1px #ccc;
  `}

  &:hover {
    background: #eee;
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
  padding: 10px 10px;
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

const ChartBar = styled.div`
  height: 40px;
  padding: 0 10px;
  position: relative;

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

const SuccessBox = styled.div`
  padding: 10px;
  
`;

interface CraftState {
  progress: number
  quality: number
  cp: number
  durability: number
  buffs: EffectiveBuff[]
}
const defaultState: CraftState = {
  progress: 0,
  quality: 0,
  cp: testStats.cp,
  durability: testRecipe.durability,
  buffs: []
};

const SimComponent = () => {
  const [actions, set_actions] = useState([] as CraftingAction[]);
  const [jobId, set_jobId] = useState(8);
  const [craftsmanship, set_craftsmanship] = useState(1800);
  const [control, set_control] = useState(1800);
  const [cp, set_cp] = useState(defaultState.cp);

  const [sim, set_sim] = useState(undefined as Simulation | undefined);

  const [states, set_states] = useState([defaultState]);
  const [statedActions, set_statedActions] = useState([] as CraftingAction[]);

  const stats = new CrafterStats(
    jobId,
    craftsmanship,
    control,
    cp,
    false,
    80,
    [80, 80, 80, 80, 80, 80, 80, 80]
  );

  // useEffect(() => {
  //   const stats = new CrafterStats(
  //     jobId,
  //     craftsmanship,
  //     control,
  //     cp,
  //     false,
  //     80,
  //     [80, 80, 80, 80, 80, 80, 80, 80]
  //   );
  //   const sim = new Simulation(
  //     testRecipe,
  //     actions,
  //     stats,
  //   );
  //   window.console.log(sim.availableCP);
  //   sim.run(true);
  //   window.console.log(sim.availableCP);
  //   window.console.log('---');
  //   set_sim(sim);
  //   (window as any).derp2 = sim;
  //   window.console.log(sim);
  // }, [
  //   actions,
  //   craftsmanship,
  //   control,
  //   cp,
  // ]);

  useEffect(() => {
    if (actions.length < 1) {
      set_statedActions([]);
      set_states([defaultState]);
      return;
    }
    // find how many actions match the saved one
    let x;
    for (x = 0; x < Math.max(actions.length, statedActions.length); x++) {
      if (actions[x] !== statedActions[x]) {
        break;
      }
    }
    // fix simulated data starting from step x
    const newStatedActions = statedActions.slice(0, x);
    const newStates = states.slice(0, x + 1);
    for (let y = x; y < actions.length; y++) {
      newStatedActions[y] = actions[y];
      const sim = new Simulation(
        testRecipe,
        newStatedActions,
        stats,
      );
      sim.run(true);
      newStates[y + 1] = {
        progress: sim.progression,
        quality: sim.quality,
        cp: sim.availableCP,
        durability: sim.durability,
        buffs: [...sim.buffs]
      };
    }
    set_statedActions(newStatedActions);
    set_states(newStates);

  }, [actions]);

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

  const latestState = states[states.length - 1];

  const [draggingIndex, set_draggingIndex] = useState(undefined as undefined | number);
  const [draggedOverIndex, set_draggedOverIndex] = useState(undefined as undefined | number);
  const OnActionDragEnd = () => {
    set_draggedOverIndex(undefined);
    set_draggingIndex(undefined);
  };
  const OnActionDragStart = (index: number) => {
    return (e: React.DragEvent) => {
      set_draggingIndex(index);
    };
  };
  const OnActionDragOver = (index: number) => {
    return (e: React.DragEvent) => {
      e.preventDefault();
      set_draggedOverIndex(index);
    };
  };
  const OnActionDrop = (index: number) => {
    return (e: React.DragEvent) => {
      e.preventDefault();
      set_draggedOverIndex(undefined);
      set_draggingIndex(undefined);
      if (typeof draggingIndex === 'undefined' || draggingIndex === index) {
        return;
      }
      const newActions = [...actions];
      const draggedAction = newActions.splice(draggingIndex, 1)[0];
      const targetIndex = index;
      newActions.splice(targetIndex, 0, draggedAction);
      set_actions(newActions);
    };
  };

  return <div>
    <div>
      <GenericBar color={'#9eca4b'}>
        <div style={{width: `${Math.min(100, latestState.progress/testRecipe.progress*100)}%`}}/>
        <span>
          {latestState.progress}/{testRecipe.progress} Progress
        </span>
      </GenericBar>
      <GenericBar color={'#50a1bf'}>
        <div style={{width: `${Math.min(100, latestState.quality/testRecipe.quality*100)}%`}}/>
        <span>
          {latestState.quality}/{testRecipe.quality} Quality
        </span>
      </GenericBar>
      <GenericBar>
        <div style={{width: `${Math.min(100, latestState.durability/testRecipe.durability*100)}%`}}/>
        <span>
          {latestState.durability}/{testRecipe.durability} Durability
        </span>
      </GenericBar>
      <GenericBar color={'#bf7ed9'}>
        <div style={{width: `${Math.min(100, latestState.cp/cp*100)}%`}}/>
        <span>
          {latestState.cp}/{cp} CP
        </span>
      </GenericBar>
    </div>
    {sim && <SuccessBox>
      {sim.getReliabilityReport().successPercent}% Success
    </SuccessBox>}
    <ChartBar>
      <svg style={{ verticalAlign: 'bottom', background: '#9eca4b' }} width={actions.length * 40} height="40" xmlns="http://www.w3.org/2000/svg">
        {states.slice(1).map((state, index, others) => {
          const progressEnd = 40 - (40 * (state.progress / testRecipe.progress));
          const progressStart = index < 1 ? 40 : 40 - (40 * (others[index - 1].progress / testRecipe.progress))
          return <path key={index} d={`
            M ${index * 40} 40
            L ${index * 40} ${progressStart}
            C ${index * 40 + 20} ${progressStart},
            ${index * 40 + 20} ${progressEnd},
            ${index * 40 + 40} ${progressEnd}
            L ${index * 40 + 40} 40
          `} fill="#6e9a1b"/>;
        })}
      </svg>
      <span style={{
        verticalAlign: 'bottom',
        bottom: `${Math.min(40, 40*latestState.progress/testRecipe.progress)}px`,
      }}>{latestState.progress}/{testRecipe.progress} Progress</span>
    </ChartBar>
    <ChartBar>
      <svg style={{ verticalAlign: 'top', background: '#80d1ef' }} width={actions.length * 40} height="40" xmlns="http://www.w3.org/2000/svg">
        {states.slice(1).map((state, index, others) => {
          const qualityEnd = (40 * (state.quality / testRecipe.quality));
          const qualityStart = index < 1 ? 0 : (40 * (others[index - 1].quality / testRecipe.quality))
          return <path key={index} d={`
            M ${index * 40} 0
            L ${index * 40} ${qualityStart}
            C ${index * 40 + 20} ${qualityStart},
            ${index * 40 + 20} ${qualityEnd},
            ${index * 40 + 40} ${qualityEnd}
            L ${index * 40 + 40} 0
          `} fill="#50a1bf"/>;
        })}
      </svg>
      <span style={{
        verticalAlign: 'top',
        top: `${Math.min(40, 40*latestState.quality/testRecipe.quality)}px`,
      }}>{latestState.quality}/{testRecipe.quality} Quality</span>
    </ChartBar>
    <ActionBar>
      {actions.map((action, index) => <img
        key={index}
        draggable={true}
        onDragStart={OnActionDragStart(index)}
        onDragOver={OnActionDragOver(index)}
        onDragEnd={OnActionDragEnd}
        onDrop={OnActionDrop(index)}
        src={process.env.PUBLIC_URL + (Icons as any)[action.getId(jobId)]}
        onClick={clickJobAction(index)}
        style={{
          marginLeft: draggingIndex !== undefined && index === draggedOverIndex && draggedOverIndex < draggingIndex ? '5px' : '',
          marginRight: draggingIndex !== undefined && index === draggedOverIndex && draggedOverIndex > draggingIndex ? '5px' : '',
          opacity: index === draggingIndex ? 0.5 : 1
        }}
      />)}
    </ActionBar>
    <ChartBar>
      <svg style={{ verticalAlign: 'bottom', background: '#eee' }} width={actions.length * 40} height="40" xmlns="http://www.w3.org/2000/svg">
        {states.slice(1).map((state, index, others) => {
          const cpEnd = 40 - (40 * (state.durability / testRecipe.durability));
          const cpStart = index < 1 ? 0 : 40 - (40 * (others[index - 1].durability / testRecipe.durability))
          return <path key={index} d={`
            M ${index * 40} 40
            L ${index * 40} ${cpStart}
            C ${index * 40 + 20} ${cpStart},
            ${index * 40 + 20} ${cpEnd},
            ${index * 40 + 40} ${cpEnd}
            L ${index * 40 + 40} 40
          `} fill="#ccc"/>;
        })}
      </svg>
      <span style={{
        verticalAlign: 'bottom',
        bottom: `${Math.min(40, 40*latestState.durability/testRecipe.durability)}px`,
      }}>{latestState.durability}/{testRecipe.durability} Durability</span>
    </ChartBar>
    <ChartBar>
      <svg style={{ verticalAlign: 'top', background: '#efaeff' }} width={actions.length * 40} height="40" xmlns="http://www.w3.org/2000/svg">
        {states.slice(1).map((state, index, others) => {
          const cpEnd = (40 * (state.cp / testStats.cp));
          const cpStart = index < 1 ? 40 : (40 * (others[index - 1].cp / testStats.cp))
          return <path key={index} d={`
            M ${index * 40} 0
            L ${index * 40} ${cpStart}
            C ${index * 40 + 20} ${cpStart},
            ${index * 40 + 20} ${cpEnd},
            ${index * 40 + 40} ${cpEnd}
            L ${index * 40 + 40} 0
          `} fill="#bf7ed9"/>;
        })}
      </svg>
      <span style={{
        verticalAlign: 'top',
        top: `${Math.min(40, 40*latestState.cp/testStats.cp)}px`,
      }}>{latestState.cp}/{testStats.cp} CP</span>
    </ChartBar>
    <JobButton onClick={clearActions} active={true}>Clear</JobButton>
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
      src={process.env.PUBLIC_URL + (Icons as any)[i.action.getId(jobId)]}
      onClick={clickAction(i.action)}
    />)}
    <pre>
      {JSON.stringify(sim, null, 2)}
    </pre>
  </div>;
};

export default SimComponent;
