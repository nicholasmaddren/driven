import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Hero from '../components/Hero';
import VehicleSearch from '../components/business/organisms/VehicleSearch';
import VehicleCarousel from '../components/business/organisms/VehicleCarousel';

const IndexPage = () => (
  <StaticQuery
    query={listingsQuery}
    render={data => {
      return (
        <Layout>
          <SEO title="Cars" keywords={[`dealership`, `website`, `react`]} />
          <Hero
            heading="Experience clear and simple car buying and selling."
            paragraph="Some other content"
          >
            <VehicleSearch />
          </Hero>
          <VehicleCarousel vehicleItems={data.allListings.edges} />
        </Layout>
      );
    }}
  />
);

const listingsQuery = graphql`
  query {
    allListings {
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
  }
`;

export default IndexPage;
