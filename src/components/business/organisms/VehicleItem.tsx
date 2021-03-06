import * as React from 'react';
import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';

import Badge from '../../Badge';
import MileageDisplay from '../atoms/MileageDisplay';
import PriceDisplay from '../atoms/PriceDisplay';

const StyledCarouselItem = styled.div<SpaceProps>`
  ${space};
  background: #fff;
  border: 1px solid ${props => props.theme.vars.color.grey2};
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.25s ease-in-out;
  color: ${props => props.theme.vars.color.grey4};
  &:hover {
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.2);
    img {
      transform: scale(1.025);
    }
  }
`;

const StyledImageContainer = styled.div`
  overflow: hidden;
  img {
    width: 100%;
    transition: all 0.25s ease-in-out;
    display: block;
  }
`;

const StyledContentContainer = styled.div`
  padding: 20px;
`;

const StyledSpecContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 22px;
  }
`;

interface IProps {
  make: string;
  model: string;
  price: number;
  featuredImage: string;
  year: number;
  mileage: number;
  slug?: string;
  m?: string;
  imageOnLoadResize?: boolean;
}

const VehicleCarousel: React.SFC<IProps> = props => {
  const handleImageOnLoad = () => {
    window.dispatchEvent(new Event('resize'));
  };
  return (
    <StyledCarouselItem m={props.m}>
      <StyledImageContainer>
        <img
          src={props.featuredImage}
          onLoad={props.imageOnLoadResize && handleImageOnLoad}
        />
      </StyledImageContainer>
      <StyledContentContainer>
        <h4>
          {props.make} {props.model}
        </h4>
        <StyledSpecContainer>
          <div>
            <Badge mr={2}>{props.year}</Badge>
            <MileageDisplay value={props.mileage} />
          </div>
          <strong>
            <PriceDisplay value={props.price} />
          </strong>
        </StyledSpecContainer>
      </StyledContentContainer>
    </StyledCarouselItem>
  );
};

export default VehicleCarousel;
