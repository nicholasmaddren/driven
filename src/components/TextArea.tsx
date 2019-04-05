import React, { FC } from 'react';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  min-height: 100px;
  width: 100%;
  display: block;
  padding: 15px 10px;
  border: 1px solid ${({ theme }) => theme.vars.color.grey2};
  box-sizing: border-box;
`;

interface ITextAreaProps {
  value: string;
  onChange: (value?: string) => void;
}

const TextArea: FC<ITextAreaProps> = props => (
  <StyledTextArea
    value={props.value}
    onChange={e => props.onChange(e.target.value)}
  />
);

export default TextArea;
