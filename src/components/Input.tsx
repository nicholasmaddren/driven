import React, { FC } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  height: 50px;
  width: 100%;
  display: block;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.vars.color.grey2};
  box-sizing: border-box;
`;

type IInputType = 'text' | 'number' | 'tel' | 'email';

interface IInputProps {
  value: string;
  onChange: (value?: string) => void;
  type: IInputType;
}

const Input: FC<IInputProps> = props => (
  <StyledInput
    type={props.type}
    value={props.value}
    onChange={e => props.onChange(e.target.value)}
  />
);

export default Input;
