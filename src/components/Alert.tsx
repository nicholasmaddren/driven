import React, { FC } from 'react';
import styled from 'styled-components';

const StyledAlert = styled.div<IAlertProps>`
  padding: 10px;
  border-radius: ${({ theme }) => theme.vars.border.radius.default};
  color: #fff;
  margin-bottom: 20px;
  background-color: ${({ type }) => {
    if (type === 'success') {
      return ({ theme }) => theme.vars.color.green;
    } else if (type === 'error') {
      return ({ theme }) => theme.vars.color.red;
    }
  }};
`;

type IAlerts = 'success' | 'error';

interface IAlertProps {
  type: IAlerts;
}

const Alert: FC<IAlertProps> = props => (
  <StyledAlert type={props.type}>{props.children}</StyledAlert>
);

export default Alert;
