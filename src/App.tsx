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

const App: React.FC = () => {

  return (
    <Router>
      <Wrapper>
        <Route path="/" component={Sim}/>
      </Wrapper>
    </Router>
  );
}

export default App;
