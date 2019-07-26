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

export interface CraftState {
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
    durability: recipeDur,
    buffs: [] as EffectiveBuff[]
  } as CraftState);

  const [actions, set_actions] = useState([] as CraftingAction[]);

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
  const [successStates, set_successStates] = useState([] as boolean[]);

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

      if (y === actions.length - 1) {
        const newSuccessStates = sim.steps.map(step => step.success === true);
        set_successStates(newSuccessStates);
      }
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
    set_draggedOverIndex(undefined);
    set_draggingIndex(undefined);
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
      const startX = 20 + stateIndex * 40 + buffLineSpacing;
      const startY = buffLineTopGap + ((filteredBuffs.length - 1) * buffLineSpacing + (buffLineThickness)) - (buffIndex * buffLineSpacing);
      const endX = 20 + (stateIndex * 40) + 40 - buffLineSpacing;
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

  const setScrollingBarRef = (el: HTMLDivElement) => {
    if (el) {
      scrollingBarRef.current = el;
    }
  };

  const colWidth = 40;

  return <div>
    {/* <Bars
      currentProgress={latestState.progress}
      maxProgress={testRecipe.progress}
      currentQuality={latestState.quality}
      maxQuality={testRecipe.quality}
      currentDurability={latestState.durability}
      maxDurability={testRecipe.durability}
      currentCP={latestState.cp}
      maxCP={jobCP}
    /> */}

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

      <ActionBar>
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
    <JobButton onClick={clearActions} active={true}>Clear</JobButton>
    <JobButton onClick={showShareUrl} active={true}>Share</JobButton>
    {shareUrl && <ShareInput onClick={focusShareField} type="text" value={shareUrl} readOnly/>}
    <JobButton onClick={showExportString} active={true}>Export</JobButton>
    {exportString && <ShareInput onClick={focusShareField} type="text" value={exportString} readOnly/>}
    <JobButton onClick={requestImportString} active={true}>Import</JobButton>
  </div>;
};

export default SimComponent;
