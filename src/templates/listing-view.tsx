import * as React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import Carousel from 'nuka-carousel';

import Layout from '../components/Layout';
import Button from '../components/Button';
import AppContext from '../context/AppContext';
import PriceDisplay from '../components/business/atoms/PriceDisplay';
import MileageDisplay from '../components/business/atoms/MileageDisplay';

const StyledListingView = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const StyledImageSlider = styled.div`
  .slider-list {
    width: auto !important;
  }
`;

const StyledInfo = styled.div`
  padding: 40px;
`;

const StyledPriceMileage = styled.div`
  display: flex;
  justify-content: space-between;
  .price {
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
          <StyledListingView>
            <StyledImageSlider>
              <Carousel>
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
              <h1>
                {cars.year} {cars.make} {cars.model}
              </h1>
              <StyledPriceMileage>
                <div className="price">
                  <h3>
                    <PriceDisplay value={cars.price} />
                  </h3>
                </div>
                <div className="mileage">
                  <h3>
                    <MileageDisplay value={cars.mileage} />
                  </h3>
                </div>
              </StyledPriceMileage>
              <Button onClick={() => handleEnquiry(value.changeSelectedCar)}>
                Ask a question
              </Button>
            </StyledInfo>
          </StyledListingView>
        </Layout>
      )}
    </AppContext.Consumer>
  );
};

export const query = graphql`
  query($slug: String!) {
    cars(slug: { eq: $slug }) {
      vin
      make
      model
      price
      mileage
      year
      images
    }
    config {
      currency
    }
  }
`;
