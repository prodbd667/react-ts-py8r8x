import React from 'react';

import styled from '@emotion/styled';

const MockStyles = styled.div`
  `;

const Mock = ({ text }) => {
  return <MockStyles>{text}</MockStyles>;
};

export default Mock;
