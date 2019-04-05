import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.vars.color.primary};
  border: 0;
  border-bottom: 1px solid
    ${({ theme }) => darken(0.2, theme.vars.color.primary)};
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
  color: #fff;
  display: inline-block;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
`;

type IType = 'submit' | 'button';

interface IButtonProps {
  type?: IType;
}

const defaultProps: IButtonProps = {
  type: 'button',
};

const Button: React.SFC<IButtonProps> = props => (
  <StyledButton type={props.type}>{props.children}</StyledButton>
);

Button.defaultProps = defaultProps;

export default Button;
