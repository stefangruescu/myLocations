import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  font-size: 30px;
  font-weight: bold;
  padding-left: 5px;
  border-bottom: 2px solid black;
`;

const Header = () => {
  return <Root>My locations</Root>;
};

export default Header;
