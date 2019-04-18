import * as React from 'react';
import Carousel from 'nuka-carousel';
import { Link } from 'gatsby';
import ContainerDimensions from 'react-container-dimensions';

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

const VehicleCarousel: React.SFC<IProps> = props => {
  const slidesToShow = (width: number) => {
    if (width > 1150) {
      return 4;
    } else if (width > 950) {
      return 3;
    } else if (width > 650) {
      return 2;
    } else {
      return 1;
    }
  };
  return (
    <ContainerDimensions>
      {({ width }) => (
        <>
          <h3>Latest Cars</h3>
          <Carousel
            slidesToShow={slidesToShow(width)}
            slidesToScroll={1}
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
      )}
    </ContainerDimensions>
  );
};

export default VehicleCarousel;
