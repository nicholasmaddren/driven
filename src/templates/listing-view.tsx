import React from 'react';
import { graphql, Link } from 'gatsby';
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
        <img src={data.listings.images[0]} />
      </StyledImageSlider>
      <StyledInfo>
        <h3>{data.listings.make}</h3>
        <p>{data.listings.model}</p>
        <p>{data.listings.price}</p>
        <p>{data.listings.mileage}</p>
      </StyledInfo>
    </StyledListingView>
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    listings(slug: { eq: $slug }) {
      make
      model
      price
      mileage
      images
    }
  }
`;
