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
import Chart, { ChartMode, ChartIcon } from './Chart';
import IQBed from './IQBed';
import BuffTimeline from './BuffTimeline';
import RecipeBook from './RecipeBook';
import MacroBook from './MacroBook';

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

interface MainWrapperProps {
  darkMode?: boolean
}
const MainWrapper = styled.div`
  ${({ darkMode }: MainWrapperProps) => darkMode && css`
    img {
      filter: invert(1);
    }
  `}
`;

interface JobButtonProps {
  active?: boolean
}
const JobButton = styled.div`
  padding: 4px 8px;
  display: inline-block;
  cursor: pointer;
  background: #fafafa;
  border-radius: 4px;
  box-sizing: border-box;
  margin: 4px;
  border: solid 1px transparent;

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
    height: 110px;
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
  margin-top: -11px;
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

const ActionBarAction = styled.div`
  display: inline-block;
  position: relative;
  border: solid 0 transparent;
  transition: border 0.1s ease-in-out;

  > span {
    position: relative;
    display: block;
  }
`;

interface DraggedImageProps {
  isDragged?: boolean
  isFailed?: boolean
}
const DraggedImage = styled.img`
  border: solid 0px transparent;
  display: block;
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
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 3;
  margin: 8px;
  border-radius: 4px;
  padding: 30px 10px 20px;
  border: solid 1px #999;
  border-width: 1px 1px 3px 1px;
`;

const ActionTypeSet = styled.div`
  display: inline-block;
  padding: 4px 8px;
  margin: 4px;
  background: #f5f5f5;
  border-radius: 4px;
  vertical-align: middle;
  text-align: left;
`;

interface ActionPalletteImage {
  isDragged?: boolean
}
const ActionPalletteImage = styled.img`
  cursor: pointer;
  transition: transform 0.2s;
  width: 40px;
  height: 40px;
  touch-action: none;
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
  display: inline-block;
  label {
    display: block;
    padding: 4px;
    display: flex;
    align-items: center;

    input {
      margin-right: 8px;
      padding: 4px 8px;
      border: none;
      border-bottom: solid 1px #999;
      text-align: right;

      &:focus {
        outline: none;
        border-color: #333;
      }
    }
  }
`;

interface TouchGhostProps {
  hidden?: boolean
}
const TouchGhost = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  pointer-events: none;
  transform: translateX(-50%) translateY(-150%);

  ${({ hidden }: TouchGhostProps) => hidden && css`
    opacity: 0;
  `}
`;

const SuccessRateIndicator = styled.div`
  font-size: 10px;
  color: #fff;
  background: #a00;
  position: absolute;
  left: 2px;
  bottom: 2px;
  width: 14px;
  height: 14px;
  border-radius: 14px;
  line-height: 11px;
  text-align: center;
  box-sizing: border-box;
  border: solid 1px #fff;
  cursor: pointer;
`;

interface ReportNumberProps {
  color?: string
  active?: boolean | number
}
const ReportNumber = styled.div`
  margin: 1px;
  border-radius: 2px;
  overflow: hidden;
  color: #fff;
  font-size: 10px;
  padding: 2px 0;
  text-align: center;
  height: 12px;
  line-height: 12px;
  opacity: 0;
  ${({ color }: ReportNumberProps) => css`
    background: ${color};
  `}
  ${({ active }: ReportNumberProps) => active && css`
    opacity: 1;
  `}
`;

const CraftStats = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  color: #666;
  font-size: 10px;

  > span {
    color: #333;
  }
`;

const BottomBar = styled.div`
  display: flex;
  position: sticky;
  bottom: 4px;
  padding: 0 4px;
  align-items: flex-end;
  justify-content: space-between;
  height: 0;
  z-index: 5;
`;

export interface CraftState {
  progress: number
  quality: number
  cp: number
  durability: number
  buffs: EffectiveBuff[]
  stats: CrafterStats
  recipe: Craft
  sim: Simulation
}

interface localStorageCache {
  recipeName: string
  recipeRLvl: number
  recipeLvl: number
  recipeProg: number
  recipeQual: number
  recipeInitialQual: number
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
  darkMode: boolean
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

  const [darkMode, set_darkMode] = useState(cache.current.darkMode ||false);
  const toggleDarkMode = () => {
    set_darkMode(!darkMode);
  };
  useEffect(() => {
    document.body.style.background = darkMode ? '#333' : '';
    document.body.style.filter = darkMode ? 'invert(1)' : '';
  }, [darkMode]);

  // recipe parameters
  const [recipeName, set_recipeName] = useState(cache.current.recipeName || '');
  const [recipeRLvl, set_recipeRLvl] = useState(cache.current.recipeRLvl || 430);
  const [recipeLvl, set_recipeLvl] = useState(cache.current.recipeLvl || 80);
  const [recipeProg, set_recipeProg] = useState(cache.current.recipeProg || 1900);
  const [recipeQual, set_recipeQual] = useState(cache.current.recipeQual || 15000);
  const [recipeInitialQual, set_recipeInitialQual] = useState(cache.current.recipeInitialQual || 0);
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
    lvl: recipeLvl,
    durability: recipeDur,
    progress: recipeProg,
    quality: recipeQual - recipeInitialQual,
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
    recipe: testRecipe,
    sim: new Simulation(testRecipe, [], stats),
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
    const rname = values.rname;
    if (rname) {
      set_recipeName(rname + '');
    } else {
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
      recipeName,
      recipeRLvl,
      recipeLvl,
      recipeProg,
      recipeQual,
      recipeInitialQual,
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
      darkMode
    };

    localStorage.setItem(LOCALSTORAGECACHE_KEY, JSON.stringify(localStorageCache));
  }, [
    recipeName,
    recipeProg,
    recipeRLvl,
    recipeLvl,
    recipeQual,
    recipeInitialQual,
    recipeDur,
    recipeSugCraft,
    recipeSugControl,
    jobId,
    jobCraftsmanship,
    jobControl,
    jobCP,
    jobLvl,
    jobIsSpecialist,
    actions,
    darkMode,
  ]);
  useEffect(() => {
    set_testRecipe(tr => {
      return {
        ...tr,
        job: jobId,
        lvl: recipeLvl,
        durability: recipeDur,
        progress: recipeProg,
        quality: recipeQual - recipeInitialQual,
        rlvl: recipeRLvl,
        suggestedControl: recipeSugControl,
        suggestedCraftsmanship: recipeSugCraft,
      };
    });
  }, [
    recipeDur,
    recipeProg,
    recipeQual,
    recipeInitialQual,
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
        recipe: testRecipe,
        sim,
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

  useEffect(() => {
    requestAnimationFrame(() => {
      if (scrollingBarRef.current) {
        scrollingBarRef.current.scrollTo({
          behavior: 'smooth',
          left: scrollingBarRef.current.scrollWidth
        });
      }
    });
  }, [actions]);

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

  const moveActionFromTo = (indexFrom: number, indexTo: number) => {
    const newActions = [...actions];
    const draggedAction = newActions.splice(indexFrom, 1)[0];
    newActions.splice(indexTo, 0, draggedAction);
    set_actions(newActions);
  };

  const addNewActionAtIndex = (action: CraftingAction, indexTo: number) => {
    const newActions = [...actions];
    newActions.splice(indexTo, 0, action);
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
        addNewActionAtIndex(newActionDrag, index);
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
  const actionBarRef = useRef(null as null | HTMLDivElement);
  const [touchGhost, set_touchGhost] = useState('');
  const touchGhostRef = useRef(null as null | HTMLImageElement);
  const OnActionTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.touches.length < 1) {
      return;
    }
    const { clientX, clientY } = e.touches[0];
    if (touchGhostRef.current) {
      touchGhostRef.current.style.left = `${clientX}px`;
      touchGhostRef.current.style.top = `${clientY}px`;
    }
    const x = clientX - rect.left;
    const actionIndex = Math.floor(x / colWidth);
    set_draggingIndex(actionIndex);
    set_touchGhost(process.env.PUBLIC_URL + Icons[actions[actionIndex].getId(jobId)]);

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

  const onAllTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length < 1) {
      return;
    }
    const { clientX, clientY } = e.touches[0];
    if (touchGhostRef.current) {
      touchGhostRef.current.style.left = `${clientX}px`;
      touchGhostRef.current.style.top = `${clientY}px`;
    }
    if (!actionBarRef.current || !newActionDrag) {
      return;
    }

    const rect = actionBarRef.current.getBoundingClientRect();
    if (clientY < rect.top || clientY > rect.top + rect.height) {
      return;
    }
    const x = clientX - rect.left;
    const actionIndex = Math.floor(x / colWidth);
    set_draggedOverIndex(actionIndex);
  };
  const newActionButtonTouched = useRef(null as null | HTMLImageElement);
  const newActionButtonTouchTime = useRef(0);
  const OnNewActionTouchStart = (act: CraftingAction) => {
    return (e: React.TouchEvent<HTMLImageElement>) => {
      set_newActionDrag(act);
      set_touchGhost(process.env.PUBLIC_URL + Icons[act.getId(jobId)]);
      newActionButtonTouchTime.current = Date.now();
      if (e.touches.length < 1) {
        return;
      }
      newActionButtonTouched.current = e.currentTarget;
      const { clientX, clientY } = e.touches[0];
      if (touchGhostRef.current) {
        touchGhostRef.current.style.left = `${clientX}px`;
        touchGhostRef.current.style.top = `${clientY}px`;
      }
    };
  };
  const OnNewActionTouchEnd = (e: React.TouchEvent<HTMLImageElement>) => {
    if (newActionDrag) {
      if (draggedOverIndex !== undefined) {
        addNewActionAtIndex(newActionDrag, draggedOverIndex);
      } else if (Date.now() - newActionButtonTouchTime.current < 500) {
        addNewActionAtIndex(newActionDrag, actions.length);
      }
    }
    set_newActionDrag(undefined);
    set_draggedOverIndex(undefined);
    set_draggingIndex(undefined);
    e.preventDefault();
    return false;
  }
  useEffect(() => {
    if (newActionDrag === undefined && draggingIndex === undefined) {
      set_touchGhost('');
    }
  }, [
    newActionDrag,
    draggingIndex
  ]);

  // share stuff
  const [shareUrl, set_shareUrl] = useState('');
  const actionSequenceString = getShareActionIdSequence(actions, jobId);
  const showShareUrl = () => {
    const url = window.location.href.split('?')[0];

    const baseParams = {
      jcr: jobCraftsmanship,
      jco: jobControl,
      jcp: jobCP,
      jl: jobLvl,
      jis: jobIsSpecialist ? '1' : '0',
      yact: actionSequenceString,
    };
    const params = recipeName ? {
      ...baseParams,
      rname: recipeName,
    } : {
      ...baseParams,
      rl: recipeLvl,
      rrl: recipeRLvl,
      rp: recipeProg,
      rq: recipeQual,
      rd: recipeDur,
      rscr: recipeSugCraft,
      rsco: recipeSugControl,
    };
    const newShareUrl = `${url}?${queryString.stringify(params, {
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

  const updateRecipe = (newRecipe: Craft, name: string) => {
    const {
      durability,
      job,
      lvl,
      progress,
      quality,
      rlvl,
      suggestedControl,
      suggestedCraftsmanship,
    } = newRecipe;
    if (recipeName !== name) {
      set_recipeName(name);
    }
    set_recipeDur(durability);
    set_recipeLvl(lvl);
    set_recipeProg(progress);
    set_recipeQual(quality);
    set_recipeRLvl(rlvl);
    set_recipeSugControl(suggestedControl);
    set_recipeSugCraft(suggestedCraftsmanship)
    set_jobId(job);
  };

  const latestState = states[states.length - 1];
  const showTraditionalBars = false;

  const progressColor = '#6e9a1b';
  const qualityColor = '#50a1bf';
  const durColor = '#999';
  const cpColor = '#bf7ed9';

  return <MainWrapper darkMode={darkMode} onTouchMove={onAllTouchMove}>
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
      <CraftStats>{jobCraftsmanship}/{jobControl}/{jobCP} {recipeName && <>crafting <span>{recipeName}</span></>}</CraftStats>
      <Chart
        colWidth={colWidth}
        rowHeight={40}
        domain={[0, testRecipe.progress]}
        data={states.map(state => state.progress)}
        mode={ChartMode.UPWARDS}
        color={progressColor}
        bgColor="#9eca4b"
        label="Progress"
        fullIcon={ChartIcon.CHECKMARK}
      />
      <Chart
        colWidth={colWidth}
        rowHeight={40}
        domain={[0, testRecipe.quality]}
        data={states.map(state => state.quality)}
        mode={ChartMode.DOWNWARDS}
        color={qualityColor}
        bgColor="#80d1ef"
        label="Quality"
        fullIcon={ChartIcon.CHECKMARK}
      />

      <IQBed states={states} colWidth={colWidth}/>

      <ActionBar
        onTouchStart={OnActionTouchStart}
        onTouchMove={OnActionTouchMove}
        onTouchEnd={OnActionTouchEnd}
        ref={actionBarRef}
      >
        {actions.map((action, index) => {
          const isDragged = draggingIndex === index;
          const isFailed = successStates[index] === false;
          const actionName = CraftingActionsRegistry.serializeRotation([action]).join('');

          const simAtAction = states[index] && states[index].sim;
          const successRate = simAtAction ? action.getSuccessRate(simAtAction) : 100;
          const hasBorderLeft = (index === draggedOverIndex) && ((newActionDrag !== undefined) || (draggingIndex !== undefined && draggedOverIndex < draggingIndex));

          const stepProgress = states[index] && states[index + 1] && states[index + 1].progress - states[index].progress;
          const stepQuality = states[index] && states[index + 1] && states[index + 1].quality - states[index].quality;
          const stepDur = states[index] && states[index + 1] && states[index + 1].durability - states[index].durability;
          const stepCP = states[index] && states[index + 1] && states[index + 1].cp - states[index].cp;
          return <ActionBarAction
            key={`${index} ${actionSequenceString}`}
            style={{
              borderLeft: hasBorderLeft ? 'solid 10px transparent' : '',
              borderRight: draggingIndex !== undefined && index === draggedOverIndex && draggedOverIndex > draggingIndex ? 'solid 10px transparent' : '',
            }}
          >
            <ReportNumber active={stepProgress} color={progressColor}>
              {stepProgress}
            </ReportNumber>
            <ReportNumber active={stepQuality} color={qualityColor}>
              {stepQuality}
            </ReportNumber>

            <span>
              <DraggedImage
                alt={actionName}
                title={actionName}
                draggable={true}
                onDragOver={OnActionDragOver(index)}
                onDragStart={OnActionDragStart(index)}
                onDragEnd={OnActionDragEnd}
                onDrop={OnActionDrop(index)}
                src={process.env.PUBLIC_URL + Icons[action.getId(jobId)]}
                onClick={clickJobAction(index)}
                style={{
                  width: `${colWidth}px`,
                }}
                isDragged={isDragged}
                isFailed={isFailed}
                onContextMenu={OnActionContextMenu}
              />
              {successRate < 100 && <SuccessRateIndicator title={`${successRate}% success rate`}>!</SuccessRateIndicator>}
            </span>

            <ReportNumber active={stepDur} color={durColor}>
              {stepDur}
            </ReportNumber>
            <ReportNumber active={stepCP} color={cpColor}>
              {stepCP}
            </ReportNumber>

          </ActionBarAction>
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
        color={durColor}
        bgColor="#eee"
        emptyIcon={latestState.progress < testRecipe.progress ? ChartIcon.EXCLAMATION_MARK : undefined}
        label="Durability"
      />
      <Chart
        colWidth={colWidth}
        rowHeight={40}
        domain={[0, jobCP]}
        data={states.map(state => state.cp)}
        mode={ChartMode.DOWNWARDS}
        color={cpColor}
        bgColor="#efaeff"
        label="CP"
        emptyIcon={latestState.progress < testRecipe.progress ? ChartIcon.EXCLAMATION_MARK : undefined}
      />
    </ScrollingBar>
    <div style={{textAlign: 'center'}}>
      {actionsByType.map((someActions, typeIndex) => <ActionTypeSet key={typeIndex}>
        {someActions.filter(thisAction => thisAction.getLevelRequirement().level <= jobLvl).map((i, index) => <ActionPalletteImage
          alt={CraftingActionsRegistry.serializeRotation([i]).join('') + ' ' + i.getId(jobId)}
          title={`${CraftingActionsRegistry.serializeRotation([i]).join('')} ${i.getBaseCPCost(defaultState.current.sim)}CP`}
          key={index}
          draggable={true}
          onDragStart={OnNewActionDragStart(i)}
          onDragEnd={OnNewActionDragEnd}
          src={process.env.PUBLIC_URL + Icons[i.getId(jobId)]}
          onClick={clickAction(i)}
          isDragged={i === newActionDrag}
          onContextMenu={OnActionContextMenu}
          onTouchStart={OnNewActionTouchStart(i)}
          onTouchEnd={OnNewActionTouchEnd}
        />)}
      </ActionTypeSet>)}
      <ActionTypeSet>
        <JobButton onClick={clearActions} active={true}>Clear</JobButton>
      </ActionTypeSet>
    </div>
    <div style={{textAlign: 'center'}}>
      {jobs.map((n, i) => n && <JobButton
        active={jobId === i}
        key={i}
        onClick={clickJobButton(i)}>
        {n}
      </JobButton>)}
    </div>
    <div style={{textAlign: 'center'}}>
      <LazyStats>
        <label>
          <input type="text" value={jobLvl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {set_jobLvl(parseInt(e.currentTarget.value) || 0)}}/>
          <span>Level</span>
        </label>
        <label>
          <input type="text" value={jobCraftsmanship} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {set_jobCraftsmanship(parseInt(e.currentTarget.value) || 0)}}/>
          <span>Craftsmanship</span>
        </label>
        <label>
          <input type="text" value={jobControl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {set_jobControl(parseInt(e.currentTarget.value) || 0)}}/>
          <span>Control</span>
        </label>
        <label>
          <input type="text" value={jobCP} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {set_jobCP(parseInt(e.currentTarget.value) || 0)}}/>
          <span>CP</span>
        </label>
        <label>
          <input type="text" style={{opacity: 0}}/>
          <div>
            <input type="checkbox" checked={jobIsSpecialist} onChange={(e: React.ChangeEvent<HTMLInputElement>) => set_jobIsSpecialist(e.currentTarget.checked)}/>
            <span>Specialist</span>
          </div>
        </label>
        <label>
          <input type="text" value={recipeProg} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {set_recipeName(''); set_recipeProg(parseInt(e.currentTarget.value) || 0)}}/>
          <span>Recipe Difficulty</span>
        </label>
        <label>
          <input type="text" value={recipeQual} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {set_recipeName(''); set_recipeQual(parseInt(e.currentTarget.value) || 0)}}/>
          <span>Recipe Quality</span>
        </label>
        <label>
          <input type="text" value={recipeInitialQual} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {set_recipeName(''); set_recipeInitialQual(parseInt(e.currentTarget.value) || 0)}}/>
          <span>Initial Quality (from HQ mats)</span>
        </label>
        <label>
          <input type="text" value={recipeDur} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {set_recipeName(''); set_recipeDur(parseInt(e.currentTarget.value) || 0)}}/>
          <span>Recipe Durability</span>
        </label>
        <label>
          <input type="text" value={recipeRLvl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {set_recipeName(''); set_recipeRLvl(parseInt(e.currentTarget.value) || 0)}}/>
          <span>Recipe Level</span>
        </label>
        <label>
          <input type="text" value={recipeLvl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {set_recipeName(''); set_recipeLvl(parseInt(e.currentTarget.value) || 0)}}/>
          <span>Craft Level</span>
        </label>
        <label>
          <input type="text" value={recipeSugCraft} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {set_recipeName(''); set_recipeSugCraft(parseInt(e.currentTarget.value) || 0)}}/>
          <span>Craftsmanship Recommended</span>
        </label>
        <label>
          <input type="text" value={recipeSugControl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {set_recipeName(''); set_recipeSugControl(parseInt(e.currentTarget.value) || 0)}}/>
          <span>Control Recommended</span>
        </label>
      </LazyStats>
      <div>
        <JobButton onClick={showShareUrl} active={true}>Share</JobButton>
        {shareUrl && <ShareInput onClick={focusShareField} type="text" value={shareUrl} readOnly/>}
        <JobButton onClick={showExportString} active={true}>Export</JobButton>
        {exportString && <ShareInput onClick={focusShareField} type="text" value={exportString} readOnly/>}
        <JobButton onClick={requestImportString} active={true}>Import</JobButton>
        <JobButton onClick={toggleDarkMode} active={true}>Dark Mode</JobButton>
      </div>
    </div>

    <TouchGhost
      src={touchGhost}
      ref={touchGhostRef}
      hidden={touchGhost === ''}
    />
    <BottomBar>
      <MacroBook
        actions={actions}
      />
      <RecipeBook
        onRecipeChosen={updateRecipe}
        recipeName={recipeName}
      />
    </BottomBar>
  </MainWrapper>;
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
    || recipe1.lvl !== recipe2.lvl
    || recipe1.rlvl !== recipe2.rlvl
    || recipe1.durability !== recipe2.durability
    || recipe1.suggestedControl !== recipe2.suggestedControl
    || recipe1.suggestedCraftsmanship !== recipe2.suggestedCraftsmanship;
};

const getShareActionIdSequence = (actions: CraftingAction[], jobId: number) => {
  return actions.filter(a => a).map(a => {
    const matchingAction = allActions.find(ac => {
      return a.getId(jobId) === ac.getId(jobId);
    })
    return matchingAction ? allActions.indexOf(matchingAction) : -1;
  });
};
