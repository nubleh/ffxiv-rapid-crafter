import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import styled, { css } from 'styled-components/macro';

import Sim from './components/Sim';

const Wrapper = styled.div`
  padding: 20px;
`;
const FootNote = styled.div`
  font-size: 10px;
`;

const App: React.FC = () => {

  return (
    <Router>
      <Wrapper>
        <Route path="/" component={Sim}/>
        <FootNote>
          This is a WIP thing made for fun.
          <br/>There are probably bugs everywhere, simulation is likely to be inaccurate.
          <br/>This thing uses the crafting simulator library made by <a href="https://github.com/ffxiv-teamcraft/simulator/" target="_blank" rel="noreferrer">ffxiv-teamcraft</a>
        </FootNote>
      </Wrapper>
    </Router>
  );
}

export default App;
