import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Hero from '../components/Hero';
import VehicleSearch from '../components/business/organisms/VehicleSearch';
import VehicleCarousel from '../components/business/organisms/VehicleCarousel';
import BulletPoints from '../components/BulletPoints';
import VehicleByType from '../components/business/organisms/VehicleByType';

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
            bgImage="https://www.carmax.com/~/media/images/carmax/com/Homepage/hero/hp-hero-shopper-on-car-lot-final.jpg?ts=20170228T175801Z"
            bgPosition="center bottom"
            bgGradientColor1="rgba(0, 0, 0, 0.5)"
            bgGradientColor2="rgba(0, 0, 0, 0)"
            bgGradientPosition="45deg"
          >
            <VehicleSearch />
          </Hero>
          <VehicleByType />
          <VehicleCarousel vehicleItems={data.allCars.edges} />
          <BulletPoints
            items={[
              {
                id: '1',
                heading: 'superb service',
                description: 'this service is awesome',
                image: {
                  src:
                    'https://assets.vroomcdn.com/static-rebrand/img/homepage/new/value1_2x.png',
                  alt: 'value 1',
                },
              },
              {
                id: '2',
                heading: 'superb service',
                description: 'this service is awesome',
                image: {
                  src:
                    'https://assets.vroomcdn.com/static-rebrand/img/homepage/new/value-2_3.png',
                  alt: 'value 2',
                },
              },
              {
                id: '3',
                heading: 'superb service',
                description: 'this service is awesome',
                image: {
                  src:
                    'https://assets.vroomcdn.com/static-rebrand/img/homepage/new/value-3_3.png',
                  alt: 'value 3',
                },
              },
            ]}
          />
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
  }
`;

export default IndexPage;
