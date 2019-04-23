import * as React from 'react';
import styled from 'styled-components';
import {
  InstantSearch,
  InfiniteHits,
  SearchBox,
  ClearRefinements,
  Stats,
  CurrentRefinements,
  MenuSelect,
  RefinementList,
} from 'react-instantsearch-dom';
import { Link } from 'gatsby';
import qs from 'qs';
import { navigate } from '@reach/router';
import _ from 'lodash';
import { darken } from 'polished';

import Layout from '../../components/Layout';
import SEO from '../../components/Seo';
import VehicleItem from '../../components/business/organisms/VehicleItem';
import ColorSwatchRefinementList from '../../components/business/instant-search/ColorSwatchRefinementList';
import PriceRangeSlider from '../../components/business/instant-search/PriceRangeSlider';

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  ul {
    list-style-type: none;
    padding: 0;
  }
`;

const StyledFacetedNav = styled.div`
  padding: 20px;
  border-right: 1px solid ${props => props.theme.vars.color.grey2};
  .facet-label {
    display: block;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 15px;
  }
`;

const StyledHits = styled.div`
  background: ${props => props.theme.vars.color.grey1};
  padding: 20px;
  .ais-InfiniteHits {
    .ais-InfiniteHits-list {
      list-style-type: none;
      display: grid;
      grid-gap: 20px;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      padding: 0;
    }
    .ais-InfiniteHits-loadMore {
      margin: 0 auto;
      display: block;
      background-color: ${({ theme }) => theme.vars.color.primary};
      border: 0;
      border-bottom: 1px solid
        ${({ theme }) => darken(0.2, theme.vars.color.primary)};
      box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
      color: #fff;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 600;
      &.ais-InfiniteHits-loadMore--disabled {
        opacity: 0.75;
      }
    }
  }
`;

const StyledHitsHeader = styled.div`
  .ais-SearchBox {
    border: 1px solid ${props => props.theme.vars.color.grey2};
    border-radius: 20px;
    background: #fff;
    margin-bottom: 20px;
    width: 100%;
    form {
      display: flex;
      padding-right: 10px;
      .ais-SearchBox-input {
        width: 100%;
        border: 0;
        background: transparent;
        padding: 0 15px;
        height: 35px;
      }
      button {
        border: 0;
        background: transparent;
      }
    }
  }
`;

const StyledHitsHeaderRefinement = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .ais-ClearRefinements {
    button {
      background: transparent;
      margin: 0;
      padding: 0;
      border: 0;
      margin-right: 20px;
      color: ${props => props.theme.vars.color.blue};
      cursor: pointer;
      &.ais-ClearRefinements-button--disabled {
        display: none;
      }
    }
  }
  .ais-CurrentRefinements-list {
    margin: 0;
    display: flex;
    .ais-CurrentRefinements-item {
      padding: 10px;
      margin-right: 10px;
      background-color: #fff;
      text-transform: capitalize;
      border-radius: ${props => props.theme.vars.border.radius.default};
      .ais-CurrentRefinements-label {
        margin-right: 5px;
      }
      .ais-CurrentRefinements-category {
        margin-right: 5px;
        .ais-CurrentRefinements-categoryLabel {
          margin-right: 5px;
        }
        .ais-CurrentRefinements-delete {
          cursor: pointer;
          background-color: ${props => props.theme.vars.color.grey1};
          height: 20px;
          width: 20px;
          padding: 0;
          border: 0;
          border-radius: 100%;
          color: ${props => props.theme.vars.color.grey3};
          font-size: 12px;
        }
      }
    }
  }
`;

const StyledRefinementList = styled.div<IStyledRefinementList>`
  display: ${props => (props.isInactive ? 'none' : 'block')};
  padding: 20px 0;
  .ais-RefinementList-list {
    margin: 0;
    .ais-RefinementList-item {
      padding: 5px 0;
      color: ${props => props.theme.vars.color.grey3};
      &.ais-RefinementList-item--selected {
        color: ${props => props.theme.vars.color.blue};
      }
      .ais-RefinementList-label {
        position: relative;
        display: flex;
        justify-content: space-between;
        font-weight: 600;
        cursor: pointer;
        .ais-RefinementList-checkbox {
          visibility: hidden;
          position: absolute;
          height: 100%;
          width: 100%;
        }
        svg {
          font-size: 12px;
        }
      }
    }
  }
`;

const StyledMenuSelect = styled(MenuSelect)`
  select {
    width: 100%;
  }
`;

interface IStyledRefinementList {
  isInactive?: boolean;
}

interface IProps {
  location: string;
}

interface IState {
  searchState: string;
}

class Cars extends React.Component<IProps> {
  private urlToSearchState = (location: any) =>
    qs.parse(location.search.slice(1));

  public state: IState = {
    searchState: this.urlToSearchState(this.props.location),
  };

  private createURL = (state: { page: number; refinementList: {} }) =>
    `?${qs.stringify(state)}`;

  private searchStateToUrl = (
    props: any,
    searchState: { page: number; refinementList: {} }
  ) =>
    searchState
      ? `${props.location.pathname}${this.createURL(searchState)}`
      : '';

  componentWillReceiveProps(props) {
    if (props.location !== this.props.location) {
      this.setState({ searchState: this.urlToSearchState(props.location) });
    }
  }

  render() {
    return (
      <Layout>
        <SEO title="Search cars" />
        <InstantSearch
          appId="UQS7NGYH01"
          apiKey="417b0c1b13d3941a26d83069eec84360"
          indexName={`${process.env.DEALERSHIP_ID}-cars`}
          searchState={this.state.searchState}
          onSearchStateChange={event => this.onSearchStateChangedHandler(event)}
          createURL={event => this.createURL(event)}
        >
          <StyledContainer>
            <StyledFacetedNav>
              <label className="facet-label">Make</label>
              <StyledMenuSelect attribute="make" />
              <StyledRefinementList>
                <label className="facet-label">Model</label>
                <RefinementList attribute="model" />
              </StyledRefinementList>
              <label className="facet-label">Price</label>
              <PriceRangeSlider attribute="price" />
              <StyledRefinementList>
                <label className="facet-label">Body Type</label>
                <RefinementList attribute="bodyType" />
              </StyledRefinementList>
              <label className="facet-label">Color</label>
              <ColorSwatchRefinementList attribute="color" />
            </StyledFacetedNav>
            <StyledHits>
              <StyledHitsHeader>
                <SearchBox
                  translations={{
                    placeholder: 'Search by make, model or keyword',
                  }}
                />
                <StyledHitsHeaderRefinement>
                  <ClearRefinements />
                  <CurrentRefinements />
                  <Stats />
                </StyledHitsHeaderRefinement>
              </StyledHitsHeader>
              <InfiniteHits hitComponent={Vehicle} />
            </StyledHits>
          </StyledContainer>
        </InstantSearch>
      </Layout>
    );
  }

  private onSearchStateChangedHandler(searchState: any) {
    if (_.get(searchState, 'refinementList.make')) {
      this.setState({ make: true });
    } else {
      this.setState({ make: false });
    }
    navigate(this.searchStateToUrl(this.props, searchState));

    this.setState({ searchState });
  }
}

function Vehicle({ hit }) {
  return (
    <Link to={`/${hit.slug}`}>
      <VehicleItem featuredImage={hit.images[0]} {...hit} />
    </Link>
  );
}

export default Cars;
