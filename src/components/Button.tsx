import * as React from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`
  border: 1px solid ${props => props.theme.vars.color.gray2};
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
`;

interface IProps {
  text: string;
}

const Badge: React.SFC<IProps> = props => (
  <StyledButton {...props}>{props.text}</StyledButton>
);

export default Badge;
