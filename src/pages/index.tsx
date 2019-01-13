import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Hero from '../components/Hero';
import VehicleSearch from '../components/business/organisms/VehicleSearch';
import VehicleCarousel from '../components/business/organisms/VehicleCarousel';
import BulletPoints from '../components/BulletPoints';

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
          >
            <VehicleSearch />
          </Hero>
          <VehicleCarousel vehicleItems={data.allListings.edges} />
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
