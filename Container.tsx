import React from 'react';

import styled from '@emotion/styled';

const ContainerStyles = styled.div`
  display: grid;
  gap: 20px;
  // grid-template-areas: ${(props) => props.areas ?? ''};
  grid-template-columns: repeat( ${(props) =>
    props.columns ?? 0} , 1fr); // repeat(4, 1fr);
  grid-template-rows: repeat( ${(props) => props.rows ?? 0} , 1fr);
`;

const Container = ({ columns, rows, children }) => {
  return (
    <ContainerStyles columns={columns} rows={rows}>
      {children}
    </ContainerStyles>
  );
};

export default Container;
