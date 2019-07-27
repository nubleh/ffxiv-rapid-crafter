import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import styled from 'styled-components/macro';

import Sim from './components/Sim';

const Wrapper = styled.div`
  padding-bottom: 30vh;
`;
const FootNote = styled.div`
  font-size: 10px;
  padding: 0 10px;
`;

// https://nubleh.github.io/ffxiv/craft/?jco=1800&jcp=489&jcr=1800&jis=0&jl=80&rd=80&rl=80&rp=3943&rq=20287&rsco=0&rscr=1866&rrl=430
const App: React.FC = () => {

  return (
    <Router>
      <Wrapper>
        <Route path="/" component={Sim}/>
        <FootNote>
          This is a WIP thing made for fun.
          <br/>There are probably bugs everywhere, simulation may be inaccurate.
          <br/>This thing uses the crafting simulator library made by <a href="https://github.com/ffxiv-teamcraft/simulator/" target="_blank" rel="noopener noreferrer">ffxiv-teamcraft</a>.
          <br/>Crafting recipe data came from <a href="https://garlandtools.org/" target="_blank" rel="noopener noreferrer">Garland Tools</a>.
          <br/>Source code is <a href="https://github.com/nubleh/ffxiv-rapid-crafter" target="_blank" rel="noopener noreferrer">over this way</a>.
        </FootNote>
      </Wrapper>
    </Router>
  );
}

export default App;
