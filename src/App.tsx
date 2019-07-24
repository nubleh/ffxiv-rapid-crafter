import React from 'react';
import styled, { css } from 'styled-components/macro';

import Sim from './components/Sim';

const Wrapper = styled.div`
  padding: 40px 20px;
`;
const App: React.FC = () => {
  return (
    <Wrapper>
      <Sim/>
    </Wrapper>
  );
}

export default App;
