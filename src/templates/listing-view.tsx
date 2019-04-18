import * as React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import Carousel from 'nuka-carousel';

import Layout from '../components/Layout';
import Button from '../components/Button';
import Panel from '../components/Panel';
import CarouselControl from '../components/Carousel/CarouselControl';
import AppContext from '../context/AppContext';
import PriceDisplay from '../components/business/atoms/PriceDisplay';
import MileageDisplay from '../components/business/atoms/MileageDisplay';
import VehicleCarousel from '../components/business/organisms/VehicleCarousel';
import gearShift from '../images/cars/gear-shift.svg';
import fuelStation from '../images/cars/fuel-station.svg';
import dashboard from '../images/cars/dashboard.svg';
import car from '../images/cars/car.svg';
import door from '../images/cars/door.svg';
import seat from '../images/cars/seat.svg';
import Section from '../components/Section';

const StyledListingView = styled.section`
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 400px;
  grid-gap: 40px;
`;

const StyledImageSlider = styled.div`
  .slider-list {
    width: auto !important;
  }
`;

const StyledInfo = styled.div``;

const StyledBasicInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  .item {
    display: flex;
    align-items: center;
    img {
      max-width: 30px;
      max-height: 30px;
      margin-right: 20px;
    }
    p {
      margin: 0;
    }
  }
`;

const StyledPriceCTA = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  h3 {
    margin: 0;
  }
`;

const StyledAdditionalInfo = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
  background-color: #fff;
  ul {
    padding: 0;
    list-style-type: none;
    display: flex;
    li {
      width: 50%;
    }
  }
`;

export default ({ data }) => {
  const { cars } = data;
  const handleEnquiry = changeSelectedCar => {
    changeSelectedCar(cars);
    navigate('question');
  };
  return (
    <AppContext.Consumer>
      {value => (
        <Layout>
          <Section>
            <StyledListingView>
              <StyledImageSlider>
                <Carousel
                  renderCenterLeftControls={({ previousSlide }) => (
                    <CarouselControl
                      icon="prev"
                      onClick={previousSlide}
                      margin={true}
                    />
                  )}
                  renderCenterRightControls={({ nextSlide }) => (
                    <CarouselControl
                      icon="next"
                      onClick={nextSlide}
                      margin={true}
                    />
                  )}
                >
                  {cars.images.map(image => (
                    <img
                      src={image}
                      alt={`${cars.make} ${cars.model}`}
                      onLoad={() => {
                        window.dispatchEvent(new Event('resize'));
                      }}
                    />
                  ))}
                </Carousel>
              </StyledImageSlider>
              <StyledInfo>
                <h5>
                  {cars.year} {cars.make}
                </h5>
                <h1>
                  {cars.model} {cars.trim}
                </h1>
                <StyledPriceCTA>
                  <div className="price">
                    <h3>
                      <PriceDisplay value={cars.price} />
                    </h3>
                  </div>
                  <Button
                    onClick={() => handleEnquiry(value.changeSelectedCar)}
                  >
                    Ask a question
                  </Button>
                </StyledPriceCTA>
                <Panel margin="0 0 40px 0">
                  <StyledBasicInfo>
                    <div className="item">
                      <img src={dashboard} />
                      <p>
                        <MileageDisplay value={cars.mileage} />
                      </p>
                    </div>
                    <div className="item">
                      <img src={car} />
                      <p>{cars.bodyType}</p>
                    </div>
                    <div className="item">
                      <img src={gearShift} />
                      <p>{cars.transmission}</p>
                    </div>
                    <div className="item">
                      <img src={fuelStation} />
                      <p>{cars.fuelType}</p>
                    </div>
                    <div className="item">
                      <img src={door} />
                      <p>{cars.doors} doors</p>
                    </div>
                    <div className="item">
                      <img src={seat} />
                      <p>{cars.seats} seats</p>
                    </div>
                  </StyledBasicInfo>
                </Panel>
                <p>{cars.description}</p>
              </StyledInfo>
            </StyledListingView>
          </Section>
          <Section backgroundColor="#fff">
            <StyledAdditionalInfo>
              <div>
                <h3>Interior Features</h3>
                <ul>
                  {cars.interiorFeatures.map((feature, i) => (
                    <li key={`${feature}-${i}`}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Exterior Features</h3>
                <ul>
                  {cars.exteriorFeatures.map((feature, i) => (
                    <li key={`${feature}-${i}`}>{feature}</li>
                  ))}
                </ul>
              </div>
            </StyledAdditionalInfo>
          </Section>
          <Section>
            <VehicleCarousel vehicleItems={data.allCars.edges} />
          </Section>
        </Layout>
      )}
    </AppContext.Consumer>
  );
};

export const query = graphql`
  query($slug: String!) {
    cars(slug: { eq: $slug }) {
      id
      vin
      make
      model
      trim
      price
      mileage
      year
      images
      color
      transmission
      fuelType
      bodyType
      description
      doors
      seats
      interiorFeatures
      exteriorFeatures
    }
    allCars {
      edges {
        node {
          id
          make
          model
          price
          year
          mileage
          images
          slug
        }
      }
    }
    config {
      currency
    }
  }
`;
