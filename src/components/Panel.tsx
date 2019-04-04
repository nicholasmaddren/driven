import React, { FC } from 'react';
import styled from 'styled-components';

const StyledPanel = styled.div`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.vars.color.grey2};
  border-radius: ${({ theme }) => theme.vars.border.radius.default};
  padding: 20px;
`;

const Panel: FC = props => <StyledPanel>{props.children}</StyledPanel>;

export default Panel;
