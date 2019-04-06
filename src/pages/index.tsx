import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Hero from '../components/Hero';
import VehicleSearch from '../components/business/organisms/VehicleSearch';
import VehicleCarousel from '../components/business/organisms/VehicleCarousel';
import BulletPoints from '../components/BulletPoints';
import VehicleByBrand from '../components/business/organisms/VehicleByBrand';

const IndexPage = () => (
  <StaticQuery
    query={indexContentQuery}
    render={data => {
      return (
        <Layout>
          <SEO title="Cars" keywords={[`dealership`, `website`, `react`]} />
          <Hero
            heading="Experience clear and simple car buying and selling."
            paragraph="Some other content"
            contentPosition="center"
            bgImage="https://www.carmax.com/~/media/images/carmax/com/Homepage/hero/hp-hero-shopper-on-car-lot-final.jpg?ts=20170228T175801Z"
            bgPosition="center bottom"
            bgColor1="rgba(0, 0, 0, 0.4)"
            bgColorPosition="45deg"
          >
            <VehicleSearch />
          </Hero>
          <VehicleByBrand cars={data.allCars.edges} />
          <VehicleCarousel vehicleItems={data.allCars.edges} />
          <BulletPoints items={data.config.home.bulletPoints.content} />
        </Layout>
      );
    }}
  />
);

const indexContentQuery = graphql`
  query {
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
      home {
        bulletPoints {
          visible
          content {
            id
            heading
            description
            image {
              src
              alt
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
