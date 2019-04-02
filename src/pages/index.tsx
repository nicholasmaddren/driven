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
          <VehicleByBrand
            brands={[
              {
                name: 'Chevrolet',
                image:
                  'http://www.carlogos.org/logo/Chevrolet-logo-2013-2560x1440.png',
              },
              {
                name: 'BMW',
                image:
                  'http://www.carlogos.org/logo/BMW-logo-2000-2048x2048.png',
              },
              {
                name: 'Ford',
                image:
                  'http://www.carlogos.org/logo/Ford-logo-2003-1366x768.png',
              },
              {
                name: 'Toyota',
                image:
                  'http://www.carlogos.org/logo/Toyota-logo-1989-2560x1440.png',
              },
            ]}
          />
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
