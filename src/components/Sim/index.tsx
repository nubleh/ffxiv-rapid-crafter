import React, { useEffect, useState, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string'

import styled, { css, keyframes } from 'styled-components/macro';

import {
  ActionType,
  CraftingAction,
  CraftingActionsRegistry,
  Simulation,
  Craft,
  CrafterStats,
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
const buffLineNames: { [key: number]: string } = {
  0: 'Inner Quiet',
  1: 'Steady Hand', 
  2: 'Steady Hand II', 
  3: 'Waste Not',
  4: 'Waste Not II',
  5: 'Stroke Of Genius',
  6: 'Initial Preparations',
  7: 'Comfort Zone',
  8: 'Whistle While You Work',
  9: 'Heart Of Crafter',
  10: 'Manipulation',
  11: 'Manipulation II',
  12: 'Great Strides',
  13: 'Innovation',
  14: 'Ingenuity',
  15: 'Ingenuity II',
  16: 'Maker\'s Mark',
  17: 'Name Of The Elements',
  18: 'Reclaim',
  19: 'Reuse',
};

const actionsByType = [
  ActionType.PROGRESSION,
  ActionType.CP_RECOVERY,
  ActionType.OTHER,
  ActionType.QUALITY,
  ActionType.REPAIR,
  ActionType.BUFF,
  ActionType.SPECIALTY,
].map(type => CraftingActionsRegistry.getActionsByType(type));
const allActions = CraftingActionsRegistry.ALL_ACTIONS.map(act => act.action);

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
    transition: border 0.1s linear, transform 0.1s;

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
  position: relative;
  left: 20px;
  top: -10px;

  > svg {
    min-height: 15px;

    path {
      cursor: pointer;
      &:hover {
        stroke: black;
      }
    }
  }
`;
const IQLine = styled.div`
  padding: 0 10px;
  position: relative;
  left: 20px;
  bottom: -10px;

  > svg {
    height: 40px;
    display: block;

    > path {
      cursor: pointer;
      &:hover {
        stroke: #6e9a1b;
      }
    }
  }
`;
const BuffLineTooltip = styled.div`
  background: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  position: absolute;
  pointer-events: none;
  z-index: 2;
`;

interface DraggedImageProps {
  isDragged?: boolean
}
const DraggedImage = styled.img`
  border: solid 0px transparent;
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
  overflow-y: hidden;
  overflow-x: auto;
  padding: 1vw;
  padding-top: 12px;
  position: sticky;
  top: 0;
  background: #fff;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
  z-index: 3;
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
  const { location } = props;

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
  const [jobIsSpecialist, set_jobIsSpecialist] = useState(true);
  const stats = new CrafterStats(
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
    cp: stats.cp,
    durability: 80,
    buffs: [] as EffectiveBuff[]
  });

  const [actions, set_actions] = useState([] as CraftingAction[]);
  const [craftsmanship, set_craftsmanship] = useState(1800);
  const [control, set_control] = useState(1800);
  const [cp, set_cp] = useState(defaultState.cp);

  const scrollingBarRef = useRef(undefined as undefined | HTMLDivElement);

  useEffect(() => {
    const values = queryString.parse(location.search, {
      arrayFormat: 'comma'
    });

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
    if (values && values.yact) {
      const passedActions = (values.yact + '').split(',').map(actIndex => {
        return allActions[parseInt(actIndex)];
      });
      set_actions(passedActions);
    } else if (values && values.zact) {
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
    recipeRLvl,
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
    let allGood = true;
    for (x = 0; x < Math.max(actions.length, statedActions.length); x++) {
      if (actions[x] !== statedActions[x]) {
        allGood = false;
        break;
      }
    }
    // fix simulated data starting from step x
    const newStatedActions = statedActions.slice(0, x);
    const newStates = states.slice(0, x + 1);
    if (allGood) {
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
      requestAnimationFrame(() => {
        if (scrollingBarRef.current) {
          scrollingBarRef.current.scrollTo({
            behavior: 'smooth',
            left: scrollingBarRef.current.scrollWidth
          });
        }
      });
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

  const [newActionDrag, set_newActionDrag] = useState(undefined as undefined | CraftingAction);
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
      if (newActionDrag) {
        const newActions = [...actions];
        const targetIndex = index;
        newActions.splice(targetIndex, 0, newActionDrag);
        set_actions(newActions);
        return;
      }
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

  const OnNewActionDragStart = (act: CraftingAction) => {
    return (e: React.DragEvent) => {
      set_newActionDrag(act);
    };
  };
  const OnNewActionDragEnd = () => {
    set_newActionDrag(undefined);
  };

  const [shareUrl, set_shareUrl] = useState('');
  const showShareUrl = () => {
    const url = window.location.href.split('?')[0];
    const acts = actions.map(a => a.getId(jobId));

    // const yacts = actions.filter(a => !!a).map(a => allActions.indexOf(allActions.find(ac => ac.getId(jobId) === a.getId(jobId)))).filter(actIndex => actIndex !== -1);
    const yacts = actions.filter(a => a).map(a => {
      const matchingAction = allActions.find(ac => {
        return a.getId(jobId) === ac.getId(jobId);
      })
      return matchingAction ? allActions.indexOf(matchingAction) : -1;
    });

    const newShareUrl = `${url}?${queryString.stringify({
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
      // zact: acts.join(','),
      yact: yacts,
    }, {
      arrayFormat: 'comma'
    })}`

    if (newShareUrl === shareUrl) {
      set_shareUrl('');
    } else {
      set_shareUrl(newShareUrl);
    }

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
    if (newExportString === exportString) {
      set_exportString('');
    } else {
      set_exportString(newExportString);
    }

    set_shareUrl('');
  };

  const requestImportString = () => {
    const importString = prompt('Enter Teamcraft export string below:');
    if (importString) {
      const newActions = CraftingActionsRegistry.importFromCraftOpt(JSON.parse(importString) as string[]);
      set_actions(newActions);
    }
  };

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
      const startX = stateIndex * 40 + buffLineSpacing;
      const startY = buffLineTopGap + ((filteredBuffs.length - 1) * buffLineSpacing + (buffLineThickness)) - (buffIndex * buffLineSpacing);
      const endX = (stateIndex * 40) + 40 - buffLineSpacing;
      const endY = startY;
      thisBuff.points[stateIndex] = [startX, startY, endX, endY];
    });
  });
  const maxBuffHeight = Math.max(...states.map(st => st.buffs.length));

  const [buffLineTooltip, set_buffLineTooltip] = useState('');
  const [buffLineTooltipPosition, set_buffLineTooltipPosition] = useState([0, 0]);
  const showBuffLineTooltip = (buffId: number) => {
    return () => {
      set_buffLineTooltip(buffLineNames[buffId] || '');
    };
  };
  const hideBuffLineTooltip = () => {
    set_buffLineTooltip('');
  };
  const updateBuffLineTooltipPosition = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const { left, top } = rect;
    set_buffLineTooltipPosition([clientX - left + 5, clientY - top + 5]);
  };

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

  const setScrollingBarRef = (el: HTMLDivElement) => {
    if (el) {
      scrollingBarRef.current = el;
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
    <ScrollingBar ref={setScrollingBarRef}>
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

      <IQLine>
        <svg style={{
          width: `${(actions.length) * 40}px`,
        }}>
          {IQStacks.map((IQStack, IQStackIndex) => {
            const leaves: number[] = [];
            const leafWidth = 6;
            const leafHeight = 4;
            const x = IQStackIndex * 40;
            const y = 40 - buffLineSpacing;
            for (let x = 0; x < IQStack; x++) {
              leaves.push(1);
            }
            const leafColor = leaves.length >= 11 ? '#dcac2a' : '#6e9a1b';
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
              {leaves.map((leaf, leafIndex) => {
                const xx = x + (leafIndex % 2) * leafWidth;
                const yy = (y - leafHeight * 1.5) - (leafIndex * leafHeight * 0.5);
                const d = `
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
            const start = IQLine.start * 40 + buffLineThickness / 2;
            const end = IQLine.end < 0 ? actions.length * 40 : IQLine.end * 40;
            const gap = buffLineSpacing;
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
                  L ${end - gap} ${40 - gap}
                  C ${end - gap / 2} ${40 - gap}
                    ${end} ${40 - gap / 2}
                    ${end} 40
                `}
              `}
              fill="transparent"
              strokeWidth="3"
              stroke={'#ccc'}
            />
          })}
        </svg>
      </IQLine>

      <ActionBar>
        {actions.map((action, index) => {
          const isDragged = draggingIndex === index;
          const hasBorderLeft = (index === draggedOverIndex) && ((newActionDrag !== undefined) || (draggingIndex !== undefined && draggedOverIndex < draggingIndex));
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
              borderLeft: hasBorderLeft ? 'solid 10px transparent' : '',
              borderRight: draggingIndex !== undefined && index === draggedOverIndex && draggedOverIndex > draggingIndex ? 'solid 10px transparent' : '',
              opacity: index === draggingIndex ? 0.5 : 1
            }}
            isDragged={isDragged}
          />
        })}
      </ActionBar>
      <BuffLines onMouseMove={updateBuffLineTooltipPosition}>
        {buffLineTooltip && <BuffLineTooltip
          style={{
            top: `${buffLineTooltipPosition[1]}px`,
            left: `${buffLineTooltipPosition[0]}px`,
          }}
        >{buffLineTooltip}</BuffLineTooltip>}
        <svg style={{
          width: `${(actions.length) * 40}px`,
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
              const cpEnd = (40 * (state.cp / stats.cp));
              const cpStart = index < 1 ? 40 : (40 * (others[index - 1].cp / stats.cp))
              return `C ${index * 40 + 20} ${cpStart} ${index * 40 + 20} ${cpEnd} ${index * 40 + 40} ${cpEnd}`;
            }).join("\n")}
            L ${(states.length - 1) * 40} 0
          `} fill="#bf7ed9"/>
        </svg>
        <span style={{
          verticalAlign: 'top',
          top: `${Math.min(40, 40*latestState.cp/stats.cp)}px`,
        }}>{latestState.cp}/{stats.cp} CP</span>
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
          draggable={true}
          onDragStart={OnNewActionDragStart(i)}
          onDragEnd={OnNewActionDragEnd}
          src={process.env.PUBLIC_URL + (Icons as any)[i.getId(jobId)]}
          onClick={clickAction(i)}
        />)}
      </ActionTypeSet>)}
    </div>
  </div>;
};

export default SimComponent;
