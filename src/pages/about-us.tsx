import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Container from '../components/Container';

const AboutUs = () => {
  return (
    <Layout>
      <SEO title="About Us" />
      <Container>
        <p>Standard Elements</p>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
      </Container>
    </Layout>
  );
};

export default AboutUs;
