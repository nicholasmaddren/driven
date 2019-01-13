import * as React from 'react';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'gatsby';

import VehicleItem from './VehicleItem';

const StyledCarousel = styled.div`
  background: ${props => props.theme.vars.color.grey1};
  padding: 40px 60px;
`;

const StyledControl = styled.button`
  background: ${props => props.theme.vars.color.grey4};
  border: 0;
  border-radius: 100%;
  height: 40px;
  width: 40px;
  cursor: pointer;
  svg {
    font-size: 20px;
    color: #fff;
  }
`;

interface IVehicleItem {
  node: {
    id: number;
    make: string;
    model: string;
    price: number;
    images: [any];
    year: number;
    mileage: number;
    slug: string;
  };
}

interface IProps {
  vehicleItems: IVehicleItem[];
}

const VehicleCarousel: React.SFC<IProps> = props => (
  <StyledCarousel>
    <Carousel
      slidesToShow={4}
      slidesToScroll={4}
      renderCenterLeftControls={({ previousSlide }) => (
        <StyledControl onClick={previousSlide}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </StyledControl>
      )}
      renderCenterRightControls={({ nextSlide }) => (
        <StyledControl onClick={nextSlide}>
          <FontAwesomeIcon icon={faChevronRight} />
        </StyledControl>
      )}
      renderBottomCenterControls={() => null}
    >
      {props.vehicleItems.map(item => {
        return (
          <Link to={item.node.slug} key={item.node.id}>
            <VehicleItem
              m="20px"
              featuredImage={item.node.images[0]}
              {...item.node}
            />
          </Link>
        );
      })}
    </Carousel>
  </StyledCarousel>
);

export default VehicleCarousel;
