import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';

export default ({ data }) => (
  <Layout>
    <div>
      <Link to="/cars">
        Cars > {data.listings.make} {data.listings.model}
      </Link>
      <h3>{data.listings.make}</h3>
      <p>{data.listings.model}</p>
      <p>{data.listings.price}</p>
      <p>{data.listings.mileage}</p>
      <img src={data.listings.images[0]} />
    </div>
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
