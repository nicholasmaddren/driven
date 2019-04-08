import React, { FC } from 'react';
import styled from 'styled-components';

const StyledPanel = styled.div<IPanelProps>`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.vars.color.grey2};
  border-radius: ${({ theme }) => theme.vars.border.radius.default};
  padding: ${({ padding }) => padding};
`;

interface IPanelProps {
  padding?: string;
}

const defaultProps = {
  padding: '20px',
};

const Panel: FC<IPanelProps> = props => (
  <StyledPanel padding={props.padding}>{props.children}</StyledPanel>
);

Panel.defaultProps = defaultProps;

export default Panel;
