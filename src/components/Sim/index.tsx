import React, { useEffect, useState, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import queryString, { ParsedQuery } from 'query-string'

import styled, { css, keyframes } from 'styled-components/macro';

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
const testActions: CraftingAction[] = [
];
const actionsByType = [
  ActionType.PROGRESSION,
  ActionType.CP_RECOVERY,
  ActionType.OTHER,
  ActionType.QUALITY,
  ActionType.REPAIR,
  ActionType.BUFF,
  ActionType.SPECIALTY,
].map(type => CraftingActionsRegistry.getActionsByType(type));

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

  &:active {
    transform: translateY(1px);
    user-select: none;
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

const rotate = keyframes`
  from {
    transform: translateY(-5px) scale(1.15) rotate(-4deg);
  }

  to {
    transform: translateY(-5px) scale(1.15) rotate(3deg);
  }
`;
const ActionBar = styled.div`
  padding: 10px 10px;
  height: 40px;
  white-space: nowrap;

  > img, > div {
    vertical-align: middle;
  }

  &::before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 40px;
  }

  > img {
    cursor: grab;
    transition: transform 0.1s;

    &:hover {
      transform: translateY(-2px) scale(1.05);
    }

    &:active {
      cursor: grabbing;
    }
  }
`;

const BuffLines = styled.div`
  padding: 0 10px;

  > svg {
    height: 40px;
    min-width: 3px;
  }
`;

interface DraggedImageProps {
  isDragged?: boolean
}
const DraggedImage = styled.img`
  ${({ isDragged }: DraggedImageProps) => isDragged && css`
    animation: ${rotate} 1s infinite alternate;
  `}
`;

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

const ScrollingBar = styled.div`
  overflow: auto;
  padding: 45px;
`;

const SuccessBox = styled.div`
  padding: 10px;
  

`;

const ActionTypeSet = styled.div`
  display: inline-block;
  padding: 4px 8px;
  margin: 4px;
  background: #f5f5f5;
  border-radius: 4px;

  > img {
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(0.95);
    }

    &:active {
      transform: scale(0.9);
      transition-duration: 0.1s;
    }
  }
`;

const ShareInput = styled.input`
  width: 50vw;
  padding: 4px 8px;
  border-radius: 4px;
  border: solid 1px #eee;
`;

interface CraftState {
  progress: number
  quality: number
  cp: number
  durability: number
  buffs: EffectiveBuff[]
}

const SimComponent = (props: RouteComponentProps) => {
  const { history, location } = props;

  // recipe parameters
  const [recipeRLvl, set_recipeRLvl] = useState(430);
  const [recipeLvl, set_recipeLvl] = useState(80);
  const [recipeProg, set_recipeProg] = useState(1900);
  const [recipeQual, set_recipeQual] = useState(15000);
  const [recipeDur, set_recipeDur] = useState(80);
  const [recipeSugCraft, set_recipeSugCraft] = useState(1866);
  const [recipeSugControl, set_recipeSugControl] = useState(1733);

  // player parameters
  const [jobId, set_jobId] = useState(8);
  const [jobCraftsmanship, set_jobCraftsmanship] = useState(1800);
  const [jobControl, set_jobControl] = useState(1800);
  const [jobCP, set_jobCP] = useState(489);
  const [jobLvl, set_jobLvl] = useState(80);
  const [jobIsSpecialist, set_jobIsSpecialist] = useState(false);
  const testStats = new CrafterStats(
    jobId,
    jobCraftsmanship,
    jobControl,
    jobCP,
    jobIsSpecialist,
    jobLvl,
    [jobLvl, jobLvl, jobLvl, jobLvl, jobLvl, jobLvl, jobLvl, jobLvl]
  );

  const [defaultState, set_defaultState] = useState({
    progress: 0,
    quality: 0,
    cp: testStats.cp,
    durability: 80,
    buffs: [] as EffectiveBuff[]
  });

  const [queryValues, set_queryValues] = useState({} as ParsedQuery);
  const [actions, set_actions] = useState([] as CraftingAction[]);
  const [craftsmanship, set_craftsmanship] = useState(1800);
  const [control, set_control] = useState(1800);
  const [cp, set_cp] = useState(defaultState.cp);

  const [sim, set_sim] = useState(undefined as Simulation | undefined);

  const stats = new CrafterStats(
    jobId,
    craftsmanship,
    control,
    cp,
    false,
    80,
    [80, 80, 80, 80, 80, 80, 80, 80]
  );

  useEffect(() => {
    const values = queryString.parse(location.search);

    // recipe stuff
    const rrl = parseInt(values.rrl + '');
    if (!isNaN(rrl)) {
      set_recipeRLvl(rrl);
    }
    const rl = parseInt(values.rl + '');
    if (!isNaN(rl)) {
      set_recipeLvl(rl);
    }
    const rp = parseInt(values.rp + '');
    if (!isNaN(rp)) {
      set_recipeProg(rp);
    }
    const rq = parseInt(values.rq + '');
    if (!isNaN(rq)) {
      set_recipeQual(rq);
    }
    const rd = parseInt(values.rd + '');
    if (!isNaN(rd)) {
      set_recipeDur(rd);
      set_defaultState(df => {
        return {
          ...df,
          durability: rd
        };
      });
    }
    const rscr = parseInt(values.rscr + '');
    if (!isNaN(rscr)) {
      set_recipeSugCraft(rscr);
    }
    const rsco = parseInt(values.rsco + '');
    if (!isNaN(rsco)) {
      set_recipeSugControl(rsco);
    }

    // player stuff
    const ji = parseInt(values.ji + '');
    if (!isNaN(ji)) {
      set_jobId(ji);
    }
    const jcr = parseInt(values.jcr + '');
    if (!isNaN(jcr)) {
      set_jobCraftsmanship(jcr);
    }
    const jco = parseInt(values.jco + '');
    if (!isNaN(jco)) {
      set_jobControl(jco);
    }
    const jcp = parseInt(values.jcp + '');
    if (!isNaN(jcp)) {
      set_jobCP(jcp);
    }
    const jl = parseInt(values.jl + '');
    if (!isNaN(jl)) {
      set_jobLvl(jl);
    }
    const jis = parseInt(values.jis + '') ;
    if (!isNaN(jis)) {
      set_jobIsSpecialist(jis === 1);
    }
    if (values && values.zact) {
      const acts = (values.zact + '').split(',');
      const passedActions = CraftingActionsRegistry.createFromIds(acts.map(act => parseInt(act)));
      set_actions(passedActions);
    }
  }, [location.search]);

  const [testRecipe, set_testRecipe] = useState({
    job: jobId,
    lvl: jobLvl,
    durability: recipeDur,
    progress: recipeProg,
    quality: recipeQual,
    rlvl: recipeRLvl,
    materialQualityFactor: 75,
    id: '0',
    suggestedControl: 1733,
    suggestedCraftsmanship: 1866,
    quickSynth: 1,
    ingredients: [],
    hq: 1,
  } as Craft);
  useEffect(() => {
    set_testRecipe(tr => {
      return {
        ...tr,
        job: jobId,
        lvl: jobLvl,
        durability: recipeDur,
        progress: recipeProg,
        quality: recipeQual,
        rlvl: recipeRLvl,
      };
    });
  }, [
    recipeDur,
    recipeProg,
    recipeQual,
    recipeLvl,
    jobId,
    jobLvl,
  ])

  const [states, set_states] = useState([defaultState]);
  const [statedActions, set_statedActions] = useState([] as CraftingAction[]);

  useEffect(() => {
    if (actions.length < 1) {
      if (statedActions.length > 0) {
        set_statedActions([]);
      }
      if (states.length !== 1 && states[0] !== defaultState) {
        set_states([defaultState]);
      }
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
    if (statedActions.length === x && states.length === x + 1) {
      return;
    }
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

  }, [
    actions,
    defaultState,
    statedActions,
    states,
    stats,
    testRecipe,
  ]);

  const clickAction = (action: CraftingAction) => {
    return () => {
      set_actions([...actions, action]);
    };
  };


  const [draggingIndex, set_draggingIndex] = useState(undefined as undefined | number);
  const [draggedOverIndex, set_draggedOverIndex] = useState(undefined as undefined | number);

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

  const [shareUrl, set_shareUrl] = useState('');
  const showShareUrl = () => {
    const url = window.location.href.split('?')[0];
    const acts = actions.map(a => a.getId(jobId));
    set_shareUrl(`${url}?${queryString.stringify({
      rl: recipeLvl,
      rp: recipeProg,
      rq: recipeQual,
      rd: recipeDur,
      rscr: recipeSugCraft,
      rsco: recipeSugControl,
      jcr: jobCraftsmanship,
      jco: jobControl,
      jcp: jobCP,
      jl: jobLvl,
      jis: jobIsSpecialist ? '1' : '0',
      zact: acts.join(',')
    })}`);

    set_exportString('');
  };

  const focusShareField = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.currentTarget) {
      e.currentTarget.setSelectionRange(0, e.currentTarget.value.length);
    }
  };

  const [exportString, set_exportString] = useState('');
  const showExportString = () => {
    const newExportString = CraftingActionsRegistry.exportToCraftOpt(CraftingActionsRegistry.serializeRotation(actions));
    set_exportString(newExportString);

    set_shareUrl('');
  };

  const requestImportString = () => {
    const importString = prompt('Enter Teamcraft export string below:');
    if (importString) {
      const newActions = CraftingActionsRegistry.importFromCraftOpt(JSON.parse(importString) as string[]);
      set_actions(newActions);
    }
  };

  return <div>
    <div style={{display: 'none'}}>
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
    <ScrollingBar>
      <ChartBar>
        <svg style={{ verticalAlign: 'bottom', background: '#9eca4b' }} width={actions.length * 40} height="40" xmlns="http://www.w3.org/2000/svg">
          <path d={`
            M 0 40
            ${states.slice(1).map((state, index, others) => {
              const progressEnd = 40 - (40 * (state.progress / testRecipe.progress));
              const progressStart = index < 1 ? 40 : 40 - (40 * (others[index - 1].progress / testRecipe.progress));
              return `C ${index * 40 + 20} ${progressStart} ${index * 40 + 20} ${progressEnd} ${index * 40 + 40} ${progressEnd}`;
            }).join("\n")}
            L ${(states.length - 1) * 40} 40
          `} fill="#6e9a1b"/>
        </svg>
        <span style={{
          verticalAlign: 'bottom',
          bottom: `${Math.min(40, 40*latestState.progress/testRecipe.progress)}px`,
        }}>{latestState.progress}/{testRecipe.progress} Progress</span>
      </ChartBar>
      <ChartBar>
        <svg style={{ verticalAlign: 'top', background: '#80d1ef' }} width={actions.length * 40} height="40" xmlns="http://www.w3.org/2000/svg">
          <path d={`
            M 0 0
            ${states.slice(1).map((state, index, others) => {
              const qualityEnd = (40 * (state.quality / testRecipe.quality));
              const qualityStart = index < 1 ? 0 : (40 * (others[index - 1].quality / testRecipe.quality))
              return `C ${index * 40 + 20} ${qualityStart} ${index * 40 + 20} ${qualityEnd} ${index * 40 + 40} ${qualityEnd}`;
            }).join("\n")}
            L ${(states.length - 1) * 40} 0
          `} fill="#50a1bf"/>
        </svg>
        <span style={{
          verticalAlign: 'top',
          top: `${Math.min(40, 40*latestState.quality/testRecipe.quality)}px`,
        }}>{latestState.quality}/{testRecipe.quality} Quality</span>
      </ChartBar>
      <ActionBar>
        {actions.map((action, index) => {
          const isDragged = draggingIndex === index;
          return <DraggedImage
            alt="Action"
            key={`${index} ${action.getId(jobId)}`}
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
            isDragged={isDragged}
          />
        })}
      </ActionBar>
      <BuffLines>
        <svg style={{
          width: `${(states.length - 1) * 40}px`
        }}>
        </svg>
      </BuffLines>
      <ChartBar>
        <svg style={{ verticalAlign: 'bottom', background: '#eee' }} width={actions.length * 40} height="40" xmlns="http://www.w3.org/2000/svg">
          <path d={`
            M 0 40
            L 0 0
            ${states.slice(1).map((state, index, others) => {
              const durEnd = 40 - (40 * (state.durability / testRecipe.durability));
              const durStart = index < 1 ? 0 : 40 - (40 * (others[index - 1].durability / testRecipe.durability))
              return `C ${index * 40 + 20} ${durStart} ${index * 40 + 20} ${durEnd} ${index * 40 + 40} ${durEnd}`;
            }).join("\n")}
            L ${(states.length - 1) * 40} 40
          `} fill="#ccc"/>
          })}
        </svg>
        <span style={{
          verticalAlign: 'bottom',
          bottom: `${Math.min(40, 40*latestState.durability/testRecipe.durability)}px`,
        }}>{latestState.durability}/{testRecipe.durability} Durability</span>
      </ChartBar>
      <ChartBar>
        <svg style={{ verticalAlign: 'top', background: '#efaeff' }} width={actions.length * 40} height="40" xmlns="http://www.w3.org/2000/svg">
          <path d={`
            M 0 0
            L 0 40
            ${states.slice(1).map((state, index, others) => {
              const cpEnd = (40 * (state.cp / testStats.cp));
              const cpStart = index < 1 ? 40 : (40 * (others[index - 1].cp / testStats.cp))
              return `C ${index * 40 + 20} ${cpStart} ${index * 40 + 20} ${cpEnd} ${index * 40 + 40} ${cpEnd}`;
            }).join("\n")}
            L ${(states.length - 1) * 40} 0
          `} fill="#bf7ed9"/>
        </svg>
        <span style={{
          verticalAlign: 'top',
          top: `${Math.min(40, 40*latestState.cp/testStats.cp)}px`,
        }}>{latestState.cp}/{testStats.cp} CP</span>
      </ChartBar>
    </ScrollingBar>
    <JobButton onClick={clearActions} active={true}>Clear</JobButton>
    <JobButton onClick={showShareUrl} active={true}>Share</JobButton>
    {shareUrl && <ShareInput onClick={focusShareField} type="text" value={shareUrl} readOnly/>}
    <JobButton onClick={showExportString} active={true}>Export</JobButton>
    {exportString && <ShareInput onClick={focusShareField} type="text" value={exportString} readOnly/>}
    <JobButton onClick={requestImportString} active={true}>Import</JobButton>
    <div>
      {jobs.map((n, i) => n && <JobButton
        active={jobId === i}
        key={i}
        onClick={clickJobButton(i)}>
        {n}
      </JobButton>)}
    </div>
    <div>
      {actionsByType.map((someActions, typeIndex) => <ActionTypeSet key={typeIndex}>
        {someActions.map((i, index) => <img
          alt="Action"
          key={index}
          src={process.env.PUBLIC_URL + (Icons as any)[i.getId(jobId)]}
          onClick={clickAction(i)}
        />)}
      </ActionTypeSet>)}
    </div>
    <pre>
      {JSON.stringify(sim, null, 2)}
    </pre>
  </div>;
};

export default SimComponent;
