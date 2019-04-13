import React, { FC } from 'react';
import styled from 'styled-components';

const StyledSection = styled.section<ISectionProps>`
  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${backgroundColor};`}
  padding: 40px;
  > * {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
`;

interface ISectionProps {
  backgroundColor?: string;
}

const Section: FC<ISectionProps> = props => (
  <StyledSection backgroundColor={props.backgroundColor}>
    {props.children}
  </StyledSection>
);

export default Section;
