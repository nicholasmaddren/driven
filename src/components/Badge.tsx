import * as React from 'react';
import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';

const StyledBadge = styled.div<SpaceProps>`
  ${space}
  border: 1px solid ${props => props.theme.vars.color.gray2};
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
`;

interface IProps {
  mr?: number;
  ml?: number;
}

const Badge: React.SFC<IProps> = props => (
  <StyledBadge {...props}>{props.children}</StyledBadge>
);

export default Badge;
