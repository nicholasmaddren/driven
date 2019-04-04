import * as React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Container from '../components/Container';
import Panel from '../components/Panel';
import Input from '../components/Input';
import Grid from '../components/Grid';
import FormField from '../components/FormField';

const StyledContactGrid = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-gap: 40px;
`;

const Contact = () => (
  <Layout>
    <SEO title="Contact Us" />
    <Container>
      <h1>Contact Us</h1>
      <StyledContactGrid>
        <div>
          <Panel>
            <h3>Driven Teesside</h3>
            <p>
              <strong>Sales:</strong> <a>01642 890900</a>
            </p>
            <p>2 Mandale Road, Stockton-on-Tees, TS17BZ</p>
          </Panel>
        </div>
        <Panel>
          <Grid>
            <FormField>
              <label>Full Name</label>
              <Input value="Hello" onChange={() => alert('hello')} />
            </FormField>
            <FormField>
              <label>Email</label>
              <Input value="Hello" onChange={() => alert('hello')} />
            </FormField>
          </Grid>
        </Panel>
      </StyledContactGrid>
    </Container>
  </Layout>
);

export default Contact;
