import * as React from 'react';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import { Link } from 'gatsby';

import VehicleItem from './VehicleItem';
import CarouselControl from '../../Carousel/CarouselControl';

interface IVehicleItem {
  node: {
    id: number;
    make: string;
    model: string;
    price: number;
    images: string[];
    year: number;
    mileage: number;
    slug: string;
  };
}

interface IProps {
  vehicleItems: IVehicleItem[];
}

const VehicleCarousel: React.SFC<IProps> = props => (
  <>
    <h3>Latest Cars</h3>
    <Carousel
      slidesToShow={4}
      slidesToScroll={4}
      renderCenterLeftControls={({ previousSlide }) => (
        <CarouselControl icon="prev" onClick={previousSlide} />
      )}
      renderCenterRightControls={({ nextSlide }) => (
        <CarouselControl icon="next" onClick={nextSlide} />
      )}
      renderBottomCenterControls={() => null}
    >
      {props.vehicleItems.map(item => {
        return (
          <Link to={item.node.slug} key={item.node.id}>
            <VehicleItem
              m="20px"
              featuredImage={item.node.images[0]}
              imageOnLoadResize={true}
              {...item.node}
            />
          </Link>
        );
      })}
    </Carousel>
  </>
);

export default VehicleCarousel;
