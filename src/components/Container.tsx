import React, { FC } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 0;
`;

const Container: FC = props => (
  <StyledContainer>{props.children}</StyledContainer>
);

export default Container;
