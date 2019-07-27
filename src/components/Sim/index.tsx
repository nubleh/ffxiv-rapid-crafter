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
import Bars from './Bars';
import Chart, { ChartMode } from './Chart';
import IQBed from './IQBed';
import BuffTimeline from './BuffTimeline';

const LOCALSTORAGECACHE_KEY = 'rapidCraftCache';
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

const rotate = keyframes`
  from {
    transform: translateY(-5px) scale(1.15) rotate(-4deg);
  }

  to {
    transform: translateY(-5px) scale(1.15) rotate(3deg);
  }
`;
const ActionBar = styled.div`
  margin: 10px;
  white-space: nowrap;
  touch-action: none;

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
  top: -10px;
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
  isFailed?: boolean
}
const DraggedImage = styled.img`
  border: solid 0px transparent;
  ${({ isDragged }: DraggedImageProps) => isDragged && css`
    animation: ${rotate} 1s infinite alternate;
    opacity: 0.6;
  `}
  ${({ isFailed }: DraggedImageProps) => isFailed && css`
    opacity: 0.2;
  `}
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
  margin-bottom: 20px;
`;

const ActionTypeSet = styled.div`
  display: inline-block;
  padding: 4px 8px;
  margin: 4px;
  background: #f5f5f5;
  border-radius: 4px;
`;

interface ActionPalletteImage {
  isDragged?: boolean
}
const ActionPalletteImage = styled.img`
  transition: transform 0.5s;
  cursor: pointer;
  transition: transform 0.2s;
  ${({ isDragged }: DraggedImageProps) => isDragged && css`
    &, &:active {
      transition: transform 0.1s;
      transform: scale(0) !important;
    }
  `}

  &:hover {
    transform: scale(0.95);
  }

  &:active {
    transform: scale(0.9);
    transition-duration: 0.1s;
  }
`;

const ShareInput = styled.input`
  width: 50vw;
  padding: 4px 8px;
  border-radius: 4px;
  border: solid 1px #eee;
`;

const LazyStats = styled.div`
  padding: 20px;
  font-size: 12px;
  label {
    display: block;
    padding: 4px;

    input {
      margin-right: 8px;
      padding: 4px 8px;
      border: solid 1px #999;
      border-radius: 2px;
    }
  }
`;

export interface CraftState {
  progress: number
  quality: number
  cp: number
  durability: number
  buffs: EffectiveBuff[]
  stats: CrafterStats
  recipe: Craft
}

interface localStorageCache {
  recipeRLvl: number
  recipeLvl: number
  recipeProg: number
  recipeQual: number
  recipeDur: number
  recipeSugCraft: number
  recipeSugControl: number
  jobId: number
  jobCraftsmanship: number
  jobControl: number
  jobCP: number
  jobLvl: number
  jobIsSpecialist: boolean
  actionsString: string
}

const SimComponent = (props: RouteComponentProps) => {
  const { location } = props;

  const cache = useRef({} as localStorageCache);
  // try and read from localStorage first, but only read it once (at page load)
  try {
    if (JSON.stringify(cache.current) === '{}') {
      const cachedData = JSON.parse(localStorage.getItem(LOCALSTORAGECACHE_KEY) + '');
      if (cachedData) {
        cache.current = cachedData;
      }
    }
  } catch (e) {}

  // recipe parameters
  const [recipeRLvl, set_recipeRLvl] = useState(cache.current.recipeRLvl || 430);
  const [recipeLvl, set_recipeLvl] = useState(cache.current.recipeLvl || 80);
  const [recipeProg, set_recipeProg] = useState(cache.current.recipeProg || 1900);
  const [recipeQual, set_recipeQual] = useState(cache.current.recipeQual || 15000);
  const [recipeDur, set_recipeDur] = useState(cache.current.recipeDur || 80);
  const [recipeSugCraft, set_recipeSugCraft] = useState(cache.current.recipeSugCraft || 1866);
  const [recipeSugControl, set_recipeSugControl] = useState(cache.current.recipeSugControl || 1733);

  // player parameters
  const [jobId, set_jobId] = useState(cache.current.jobId || 8);
  const [jobCraftsmanship, set_jobCraftsmanship] = useState(cache.current.jobCraftsmanship || 1800);
  const [jobControl, set_jobControl] = useState(cache.current.jobControl || 1800);
  const [jobCP, set_jobCP] = useState(cache.current.jobCP || 489);
  const [jobLvl, set_jobLvl] = useState(cache.current.jobLvl || 80);
  const [jobIsSpecialist, set_jobIsSpecialist] = useState(cache.current.jobIsSpecialist === undefined ? true : cache.current.jobIsSpecialist);
  const stats = new CrafterStats(
    jobId,
    jobCraftsmanship,
    jobControl,
    jobCP,
    jobIsSpecialist,
    jobLvl,
    [jobLvl, jobLvl, jobLvl, jobLvl, jobLvl, jobLvl, jobLvl, jobLvl]
  );

  const [testRecipe, set_testRecipe] = useState({
    job: jobId,
    lvl: jobLvl,
    durability: recipeDur,
    progress: recipeProg,
    quality: recipeQual,
    rlvl: recipeRLvl,
    materialQualityFactor: 75,
    id: '0',
    suggestedControl: recipeSugControl,
    suggestedCraftsmanship: recipeSugCraft,
    quickSynth: 1,
    ingredients: [],
    hq: 1,
  } as Craft);

  const defaultState = useRef({
    progress: 0,
    quality: 0,
    cp: jobCP,
    durability: recipeDur,
    buffs: [] as EffectiveBuff[],
    stats: stats,
    recipe: testRecipe
  } as CraftState);
  useEffect(() => {
    defaultState.current = {
      ...defaultState.current,
      cp: jobCP,
      durability: recipeDur,
      stats,
      recipe: testRecipe
    };
  }, [
    jobCP,
    recipeDur,
    stats,
    testRecipe
  ]);

  let cachedActions = [] as CraftingAction[];
  try {
    cachedActions = CraftingActionsRegistry.importFromCraftOpt(JSON.parse(cache.current.actionsString) as string[]);
  } catch(e) {}
  const [actions, set_actions] = useState(cachedActions);

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

  // store these in localStorage... good idea?
  useEffect(() => {
    const localStorageCache = {
      recipeRLvl,
      recipeLvl,
      recipeProg,
      recipeQual,
      recipeDur,
      recipeSugCraft,
      recipeSugControl,
      jobId,
      jobCraftsmanship,
      jobControl,
      jobCP,
      jobLvl,
      jobIsSpecialist,
      actionsString: CraftingActionsRegistry.exportToCraftOpt(CraftingActionsRegistry.serializeRotation(actions)),
    };

    localStorage.setItem(LOCALSTORAGECACHE_KEY, JSON.stringify(localStorageCache));
  }, [
    recipeProg,
    recipeRLvl,
    recipeLvl,
    recipeQual,
    recipeDur,
    recipeSugCraft,
    recipeSugControl,
    jobId,
    jobCraftsmanship,
    jobControl,
    jobCP,
    jobLvl,
    jobIsSpecialist,
    actions
  ]);
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
        suggestedControl: recipeSugControl,
        suggestedCraftsmanship: recipeSugCraft,
      };
    });
  }, [
    recipeDur,
    recipeProg,
    recipeQual,
    recipeLvl,
    recipeRLvl,
    recipeSugControl,
    recipeSugCraft,
    jobId,
    jobLvl,
  ])

  const [states, set_states] = useState([defaultState.current]);
  const [statedActions, set_statedActions] = useState([] as CraftingAction[]);
  const [successStates, set_successStates] = useState([] as boolean[]);

  useEffect(() => {
    if (actions.length < 1) {
      if (statedActions.length > 0) {
        set_statedActions([]);
      }
      if (states.length !== 1 && states[0] !== defaultState.current) {
        set_states([defaultState.current]);
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

    if (didStatsChange(stats, states[states.length - 1].stats) || didRecipeChange(testRecipe, states[states.length - 1].recipe)) {
      x = 0;
      allGood = false;
    }

    // fix simulated data starting from step x
    const newStatedActions = statedActions.slice(0, x);
    const newStates = states.slice(0, x + 1);
    newStates[0] = {
      ...defaultState.current,
      cp: jobCP,
      stats,
      recipe: testRecipe
    };
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
        buffs: [...sim.buffs],
        stats,
        recipe: testRecipe
      };

      if (y === actions.length - 1) {
        const newSuccessStates = sim.steps.map(step => step.success === true);
        set_successStates(newSuccessStates);
      }
    }
    set_statedActions(newStatedActions);
    set_states(newStates);
  }, [
    actions,
    statedActions,
    states,
    stats,
    testRecipe,
    jobCP,
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

  const moveActionFromTo = (indexFrom: number, indexTo: number) => {
    const newActions = [...actions];
    const draggedAction = newActions.splice(indexFrom, 1)[0];
    newActions.splice(indexTo, 0, draggedAction);
    set_actions(newActions);
  };

  const [newActionDrag, set_newActionDrag] = useState(undefined as undefined | CraftingAction);
  const OnActionDragEnd = () => {
    set_newActionDrag(undefined);
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
      set_newActionDrag(undefined);
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
      moveActionFromTo(draggingIndex, index);
    };
  };

  const OnNewActionDragStart = (act: CraftingAction) => {
    return (e: React.DragEvent) => {
      set_newActionDrag(act);
    };
  };
  const OnNewActionDragEnd = () => {
    set_newActionDrag(undefined);
    set_draggedOverIndex(undefined);
    set_draggingIndex(undefined);
  };

  const colWidth = 40;

  // mobile stuff
  const [touchDragAction, set_touchDragAction] = useState(-1);
  const OnActionTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.touches.length < 1) {
      return;
    }
    const x = e.touches[0].clientX - rect.left;
    const actionIndex = Math.floor(x / colWidth);
    set_draggingIndex(actionIndex);

    e.preventDefault();
    return false;
  };
  const OnActionTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.touches.length < 1) {
      return;
    }
    const x = e.touches[0].clientX - rect.left;
    const actionIndex = Math.floor(x / colWidth);
    set_draggedOverIndex(actionIndex);

    e.preventDefault();
    return false;
  };
  const OnActionTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const indexFrom = draggingIndex;
    const indexTo = draggedOverIndex;
    if (typeof indexFrom === 'number' && typeof indexTo === 'number') {
      moveActionFromTo(indexFrom, indexTo);
    }
    set_newActionDrag(undefined);
    set_draggedOverIndex(undefined);
    set_draggingIndex(undefined);
  };
  const OnActionContextMenu = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  const [shareUrl, set_shareUrl] = useState('');
  const showShareUrl = () => {
    const url = window.location.href.split('?')[0];

    const yacts = actions.filter(a => a).map(a => {
      const matchingAction = allActions.find(ac => {
        return a.getId(jobId) === ac.getId(jobId);
      })
      return matchingAction ? allActions.indexOf(matchingAction) : -1;
    });

    const newShareUrl = `${url}?${queryString.stringify({
      rl: recipeLvl,
      rrl: recipeRLvl,
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

  const setScrollingBarRef = (el: HTMLDivElement) => {
    if (el) {
      scrollingBarRef.current = el;
    }
  };

  const latestState = states[states.length - 1];
  const showTraditionalBars = false;

  return <div>
    {showTraditionalBars && <Bars
      currentProgress={latestState.progress}
      maxProgress={testRecipe.progress}
      currentQuality={latestState.quality}
      maxQuality={testRecipe.quality}
      currentDurability={latestState.durability}
      maxDurability={testRecipe.durability}
      currentCP={latestState.cp}
      maxCP={jobCP}
    />}

    <ScrollingBar ref={setScrollingBarRef}>
      <Chart
        colWidth={colWidth}
        rowHeight={40}
        domain={[0, testRecipe.progress]}
        data={states.map(state => state.progress)}
        mode={ChartMode.UPWARDS}
        color="#6e9a1b"
        bgColor="#9eca4b"
        label="Progress"
      />
      <Chart
        colWidth={colWidth}
        rowHeight={40}
        domain={[0, testRecipe.quality]}
        data={states.map(state => state.quality)}
        mode={ChartMode.DOWNWARDS}
        color="#50a1bf"
        bgColor="#80d1ef"
        label="Quality"
      />

      <IQBed states={states} colWidth={colWidth}/>

      <ActionBar
        onTouchStart={OnActionTouchStart}
        onTouchMove={OnActionTouchMove}
        onTouchEnd={OnActionTouchEnd}
      >
        {actions.map((action, index) => {
          const isDragged = draggingIndex === index;
          const isFailed = successStates[index] === false;
          const hasBorderLeft = (index === draggedOverIndex) && ((newActionDrag !== undefined) || (draggingIndex !== undefined && draggedOverIndex < draggingIndex));
          return <DraggedImage
            alt={CraftingActionsRegistry.serializeRotation([action]).join('')}
            title={CraftingActionsRegistry.serializeRotation([action]).join('')}
            key={`${index} ${action.getId(jobId)}`}
            draggable={true}
            onDragStart={OnActionDragStart(index)}
            onDragOver={OnActionDragOver(index)}
            onDragEnd={OnActionDragEnd}
            onDrop={OnActionDrop(index)}
            src={process.env.PUBLIC_URL + (Icons as any)[action.getId(jobId)]}
            onClick={clickJobAction(index)}
            style={{
              width: `${colWidth}px`,
              borderLeft: hasBorderLeft ? 'solid 10px transparent' : '',
              borderRight: draggingIndex !== undefined && index === draggedOverIndex && draggedOverIndex > draggingIndex ? 'solid 10px transparent' : '',
            }}
            isDragged={isDragged}
            isFailed={isFailed}
            onContextMenu={OnActionContextMenu}
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
        <BuffTimeline
          states={states}
          colWidth={colWidth}
          showBuffLineTooltip={showBuffLineTooltip}
          hideBuffLineTooltip={hideBuffLineTooltip}
        />
      </BuffLines>
      <Chart
        colWidth={colWidth}
        rowHeight={40}
        domain={[0, testRecipe.durability]}
        data={states.map(state => state.durability)}
        mode={ChartMode.UPWARDS}
        color="#ccc"
        bgColor="#eee"
        label="Durability"
      />
      <Chart
        colWidth={colWidth}
        rowHeight={40}
        domain={[0, jobCP]}
        data={states.map(state => state.cp)}
        mode={ChartMode.DOWNWARDS}
        color="#bf7ed9"
        bgColor="#efaeff"
        label="CP"
      />
    </ScrollingBar>
    <div>
      {actionsByType.map((someActions, typeIndex) => <ActionTypeSet key={typeIndex}>
        {someActions.map((i, index) => <ActionPalletteImage
          alt={CraftingActionsRegistry.serializeRotation([i]).join('')}
          title={CraftingActionsRegistry.serializeRotation([i]).join('')}
          key={index}
          draggable={true}
          onDragStart={OnNewActionDragStart(i)}
          onDragEnd={OnNewActionDragEnd}
          src={process.env.PUBLIC_URL + (Icons as any)[i.getId(jobId)]}
          onClick={clickAction(i)}
          isDragged={i === newActionDrag}
        />)}
      </ActionTypeSet>)}
    </div>
    <div>
      {jobs.map((n, i) => n && <JobButton
        active={jobId === i}
        key={i}
        onClick={clickJobButton(i)}>
        {n}
      </JobButton>)}
    </div>
    <LazyStats>
      <label>
        <input type="text" value={jobCraftsmanship} onChange={(e: React.ChangeEvent<HTMLInputElement>) => set_jobCraftsmanship(parseInt(e.currentTarget.value) || 0)}/>
        Craftsmanship
      </label>
      <label>
        <input type="text" value={jobControl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => set_jobControl(parseInt(e.currentTarget.value) || 0)}/>
        Control
      </label>
      <label>
        <input type="text" value={jobCP} onChange={(e: React.ChangeEvent<HTMLInputElement>) => set_jobCP(parseInt(e.currentTarget.value) || 0)}/>
        CP
      </label>
      <label>
        <input type="checkbox" checked={jobIsSpecialist} onChange={(e: React.ChangeEvent<HTMLInputElement>) => set_jobIsSpecialist(e.currentTarget.checked)}/>
        Specialist
      </label>
      <label>
        <input type="text" value={recipeProg} onChange={(e: React.ChangeEvent<HTMLInputElement>) => set_recipeProg(parseInt(e.currentTarget.value) || 0)}/>
        Recipe Difficulty
      </label>
      <label>
        <input type="text" value={recipeQual} onChange={(e: React.ChangeEvent<HTMLInputElement>) => set_recipeQual(parseInt(e.currentTarget.value) || 0)}/>
        Recipe Quality
      </label>
      <label>
        <input type="text" value={recipeDur} onChange={(e: React.ChangeEvent<HTMLInputElement>) => set_recipeDur(parseInt(e.currentTarget.value) || 0)}/>
        Recipe Durability
      </label>
      <label>
        <input type="text" value={recipeRLvl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => set_recipeRLvl(parseInt(e.currentTarget.value) || 0)}/>
        Recipe Level
      </label>
      <label>
        <input type="text" value={recipeSugCraft} onChange={(e: React.ChangeEvent<HTMLInputElement>) => set_recipeSugCraft(parseInt(e.currentTarget.value) || 0)}/>
        Craftsmanship Recommended
      </label>
      <label>
        <input type="text" value={recipeSugControl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => set_recipeSugControl(parseInt(e.currentTarget.value) || 0)}/>
        Control Recommended
      </label>
    </LazyStats>
    <JobButton onClick={clearActions} active={true}>Clear</JobButton>
    <JobButton onClick={showShareUrl} active={true}>Share</JobButton>
    {shareUrl && <ShareInput onClick={focusShareField} type="text" value={shareUrl} readOnly/>}
    <JobButton onClick={showExportString} active={true}>Export</JobButton>
    {exportString && <ShareInput onClick={focusShareField} type="text" value={exportString} readOnly/>}
    <JobButton onClick={requestImportString} active={true}>Import</JobButton>
  </div>;
};

export default SimComponent;

const didStatsChange = (stats1: CrafterStats, stats2: CrafterStats) => {
  return stats1.cp !== stats2.cp
    || stats1.craftsmanship !== stats2.craftsmanship
    || stats1._control !== stats2._control
    || stats1.level !== stats2.level
    || stats1.specialist !== stats2.specialist
};

const didRecipeChange = (recipe1: Craft, recipe2: Craft) => {
  return recipe1.progress !== recipe2.progress
    || recipe1.quality !== recipe2.quality
    || recipe1.rlvl !== recipe2.rlvl
    || recipe1.durability !== recipe2.durability
    || recipe1.suggestedControl !== recipe2.suggestedControl
    || recipe1.suggestedCraftsmanship !== recipe2.suggestedCraftsmanship;
};
