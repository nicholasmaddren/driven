import React, { FC } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const StyledControl = styled.button<ICommonProps>`
  background: ${props => props.theme.vars.color.grey4};
  border: 0;
  border-radius: 100%;
  height: 40px;
  width: 40px;
  ${({ margin }) => margin && 'margin: 20px;'}
  cursor: pointer;
  svg {
    font-size: 20px;
    color: #fff;
  }
`;

type IIcon = 'prev' | 'next';

interface ICommonProps {
  margin?: boolean;
}

interface ICarouselProps extends ICommonProps {
  icon: IIcon;
  onClick: () => void;
}

const CarouselControl: FC<ICarouselProps> = props => (
  <StyledControl onClick={props.onClick} margin={props.margin}>
    {props.icon === 'prev' ? (
      <FontAwesomeIcon icon={faChevronLeft} />
    ) : (
      <FontAwesomeIcon icon={faChevronRight} />
    )}
  </StyledControl>
);

export default CarouselControl;
