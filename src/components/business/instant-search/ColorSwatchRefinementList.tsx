import React, { FC } from 'react';
import styled from 'styled-components';
import { connectRefinementList } from 'react-instantsearch-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { darken } from 'polished';

const StyledRefinementList = styled.ul`
  display: flex;
`;

const StyledColorSwatch = styled.li`
  width: 30px;
  height: 30px;
  margin-right: 5px;
  background: linear-gradient(
    145deg,
    ${({ color }) => darken(0.05, color)} 0%,
    ${({ color }) => darken(0.05, color)} 50%,
    ${({ color }) => color} 51%
  );
  border: 1px solid ${({ theme }) => theme.vars.color.grey3};
  border-radius: 100%;
  position: relative;
  button {
    cursor: pointer;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      color: #fff;
      width: 10px;
      height: 10px;
    }
  }
`;

// 1. Create a React component
const RefinementList = props => {
  return (
    <StyledRefinementList>
      {props.items.map(item => (
        <StyledColorSwatch
          color={item.label}
          key={`color-swatch-${item.label}`}
        >
          <button onClick={() => props.refine(item.value)}>
            {item.isRefined && <FontAwesomeIcon icon={faCheck} />}
          </button>
        </StyledColorSwatch>
      ))}
    </StyledRefinementList>
  );
};

const ColorSwatchRefinementList = connectRefinementList(RefinementList);

export default ColorSwatchRefinementList;
