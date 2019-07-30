import React, { useState, useEffect } from 'react';

import styled, { css } from 'styled-components/macro';

import {
  Craft,
} from '@ffxiv-teamcraft/simulator';

import items, { Item } from './data/items';

const Book = styled.div`
  transition: transform 0.2s;

  input {
    padding: 4px 8px;
    border: none;
    cursor: pointer;
    text-align: center;
    margin: 0 16px;
    border-bottom: solid 1px transparent;
    display: inline-block;
    &:hover {
      border-bottom: solid 1px #eee;
    };
    &:focus {
      outline: none;
    }
  }
`;

const SearchContainer = styled.div`
  text-align: center;
`;

const RecipeList = styled.ul`
  margin: 0;
  padding: 0;
  max-height: 80vh;
  overflow: auto;

  > li {
    list-style: none;
    cursor: pointer;
    padding: 4px 8px;
  }
`;

interface RecipeItemProps {
  selected?: boolean
}
const RecipeItem = styled.li`
  display: none;

  &:hover {
    background: #f0f0f0;
  }

  ${({ selected }: RecipeItemProps) => selected && css`
    display: block;
    color: #333;
    &, &:hover {
      background: #ddd;
    }
  `}

  > span {
    vertical-align: middle;
    margin: 0 4px;
    display: inline-block;
    min-width: 24px;

    &:first-child {
      opacity: 0.8;
    }
  }
`;

const Wrapper = styled.div`
  background: #fff;
  padding: 4px 0;
  border-radius: 4px;
  position: fixed;
  z-index: 5;
  right: 4px;
  bottom: 4px;
  border: solid 1px silver;
  color: #666;
  font-size: 11px;
  cursor: pointer;

  &:focus, &:focus-within, &:hover {
    outline: none;

    > span {
      display: none;
    }

    ${RecipeItem} {
      display: block;
    }

    ${Book} {
      input {
        border-bottom: solid 1px #ccc;
        border-radius: 2px;
        cursor: text;
      }
    }
  }
`;

interface RecipeBookProps {
  onRecipeChosen: (recipe: Craft) => void
}

const RecipeBook = (props: RecipeBookProps) => {
  const {
    onRecipeChosen
  } = props;

  const [searchQuery, set_searchQuery] = useState('');
  const change_searchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_searchQuery(e.currentTarget.value);
  };

  const [results, set_results] = useState([] as Item[]);
  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const newResults: Item[] = [];
    const resultLimit = 20;

    const searchWords = searchQuery.split(',').map(w => w.trim());
    items.forEach(item => {
      if (newResults.length > resultLimit) {
        return false;
      }
      if (searchWords.filter(word => item.name.toLowerCase().match(word.toLowerCase())).length === searchWords.length) {
        newResults.push(item);
      }
      return true;
    });
    set_results(newResults.sort((r1, r2) => r1.name.length > r2.name.length ? 1 : -1));
  }, [searchQuery]);

  const [chosenItem, set_chosenItem] = useState(-1);
  const applyRecipe = (targetItem: Item) => {
    return () => {
      set_chosenItem(targetItem.id);
      const r = targetItem.recipes[0];
      onRecipeChosen({
        job: r.job,
        lvl: r.lvl,
        durability: r.durability,
        progress: r.progress,
        quality: r.quality,
        rlvl: r.rlvl,
        id: r.id + '',
        suggestedControl: r.suggestedControl,
        suggestedCraftsmanship: r.suggestedCraftsmanship,
        quickSynth: 1,
        ingredients: [],
        hq: 1,
      });
    };
  };

  const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      // enter
      if (results.length > 0) {
        applyRecipe(results[0])();
      }
    }
  };

  return <Wrapper tabIndex={1}>
    <Book>
      <RecipeList>
        {results.map(item => <RecipeItem
          key={item.id}
          onClick={applyRecipe(item)}
          selected={item.id === chosenItem}
        >
          <span>lv{item.recipes[0].lvl}</span>
          <span>{item.name}</span>
        </RecipeItem>)}
      </RecipeList>
      <SearchContainer>
        <input
          placeholder={'Recipe'}
          type="text"
          value={searchQuery}
          onChange={change_searchQuery}
          onKeyDown={onSearchKeyDown}
        />
      </SearchContainer>
    </Book>
  </Wrapper>
};

export default RecipeBook;