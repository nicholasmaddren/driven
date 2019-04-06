import * as React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';

const StyledListingView = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 40px;
`;

const StyledImageSlider = styled.div`
  img {
    width: 100%;
  }
`;

const StyledInfo = styled.div`
  padding: 20px 0;
`;

export default ({ data }) => (
  <Layout>
    <StyledListingView>
      <StyledImageSlider>
        <img src={data.cars.images[0]} />
      </StyledImageSlider>
      <StyledInfo>
        <h3>{data.cars.make}</h3>
        <p>{data.cars.model}</p>
        <p>{data.cars.price}</p>
        <p>{data.cars.mileage}</p>
      </StyledInfo>
    </StyledListingView>
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    cars(slug: { eq: $slug }) {
      make
      model
      price
      mileage
      images
    }
  }
`;
