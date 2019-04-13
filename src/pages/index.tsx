import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Hero from '../components/Hero';
import VehicleSearch from '../components/business/organisms/VehicleSearch';
import VehicleCarousel from '../components/business/organisms/VehicleCarousel';
import BulletPoints from '../components/BulletPoints';
import VehicleByBrand from '../components/business/organisms/VehicleByBrand';
import Section from '../components/Section';

const IndexPage = () => (
  <StaticQuery
    query={indexContentQuery}
    render={data => {
      return (
        <Layout>
          <SEO title="Cars" keywords={[`dealership`, `website`, `react`]} />
          <Hero
            heading={data.config.home.hero.heading}
            description={data.config.home.hero.description}
            contentPosition={data.config.home.hero.contentPosition}
            bgImage={data.config.home.hero.background.image}
            bgPosition={data.config.home.hero.background.imagePosition}
            bgColor1={data.config.home.hero.background.color1}
            bgColorPosition={
              data.config.home.hero.background.colorGradientPosition
            }
          >
            <VehicleSearch />
          </Hero>
          <Section backgroundColor="#fff">
            <VehicleByBrand cars={data.allCars.edges} />
          </Section>
          <Section>
            <VehicleCarousel vehicleItems={data.allCars.edges} />
          </Section>
          <Section backgroundColor="#fff">
            <BulletPoints items={data.config.home.bulletPoints.content} />
          </Section>
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
      home {
        hero {
          visible
          heading
          description
          contentPosition
          textColor
          background {
            image
            imagePosition
            color1
            color2
            colorGradientPosition
          }
        }
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
