import * as React from 'react';
import numeral from 'numeral';
import { StaticQuery, graphql } from 'gatsby';

interface IProps {
  value: number;
}

const PriceDisplay: React.SFC<IProps> = props => (
  <StaticQuery
    query={dealershipCurrencyQuery}
    render={data => {
      return (
        <>
          {data.dealershipInfo.currency}
          {numeral(props.value).format('0,0')}
        </>
      );
    }}
  />
);

export default PriceDisplay;

const dealershipCurrencyQuery = graphql`
  query {
    dealershipInfo {
      currency
    }
  }
`;
