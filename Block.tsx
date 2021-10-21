import React from 'react';

import styled from '@emotion/styled';

const BlockStyles = styled.div`
  border: 1px dashed #000;
  width: 100%;
  min-height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: ${(props) => props.area ?? ''};

  grid-row-start: ${(props) => props.rstart ?? ''};
  grid-column-start: ${(props) => props.cstart ?? ''};
  grid-row-end: ${(props) => props.rend ?? ''};
  grid-column-end: ${(props) => props.cend ?? ''};
`;

const Block = ({ rstart, cstart, rend, cend, children }) => {
  return (
    <BlockStyles rstart={rstart} cstart={cstart} rend={rend} cend={cend}>
      {children}
    </BlockStyles>
  );
};

export default Block;
