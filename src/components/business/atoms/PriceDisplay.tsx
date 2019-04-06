import * as React from 'react';
import numeral from 'numeral';
import { StaticQuery, graphql } from 'gatsby';

interface IProps {
  value: number;
}

const PriceDisplay: React.SFC<IProps> = props => (
  <StaticQuery
    query={configCurrencyQuery}
    render={data => {
      return (
        <>
          {data.config.currency}
          {numeral(props.value).format('0,0')}
        </>
      );
    }}
  />
);

export default PriceDisplay;

const configCurrencyQuery = graphql`
  query {
    config {
      currency
    }
  }
`;
