import React from 'react';
import styled from 'styled-components';
import {
  InstantSearch,
  InfiniteHits,
  SearchBox,
  ClearRefinements,
  Stats,
  CurrentRefinements,
} from 'react-instantsearch-dom';
import { Link } from 'gatsby';
import qs from 'qs';
import { navigate } from '@reach/router';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import VehicleItem from '../components/business/organisms/VehicleItem';
import RefinementList from '../components/business/instant-search/widgets/RefinementList';

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
      color: ${props => props.theme.vars.color.blue};
      .ais-CurrentRefinements-label {
        display: none;
      }
      .ais-CurrentRefinements-category {
        margin-right: 20px;
        .ais-CurrentRefinements-categoryLabel {
          margin-right: 5px;
        }
        .ais-CurrentRefinements-delete {
          cursor: pointer;
          background: transparent;
          border: 0;
          color: ${props => props.theme.vars.color.grey3};
          padding: 0;
          font-size: 12px;
        }
      }
    }
  }
`;

const StyledRefinementList = styled.div<IStyledRefinementList>`
  display: ${props => (props.isInactive ? 'none' : 'block')};
  padding: 20px 0;
  border-bottom: 1px solid ${props => props.theme.vars.color.grey1};
  &:last-child {
    border-bottom: 0;
  }
  > label {
    display: block;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 15px;
  }
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
  .ais-RefinementList-make-label {
    display: block;
    margin-bottom: 10px;
    font-weight: 600;
    color: ${props => props.theme.vars.color.grey4};
  }
  .ais-RefinementList-list--model {
    margin: 0 0 10px 10px;
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
  make: boolean;
}

class Cars extends React.Component<IProps> {
  private urlToSearchState = (location: any) =>
    qs.parse(location.search.slice(1));

  public state: IState = {
    searchState: this.urlToSearchState(this.props.location),
    make: false,
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
          indexName="dev_searchListings"
          searchState={this.state.searchState}
          onSearchStateChange={event => this.onSearchStateChangedHandler(event)}
          createURL={event => this.createURL(event)}
        >
          <StyledContainer>
            <StyledFacetedNav>
              <StyledRefinementList>
                <label>Make</label>
                <RefinementList attribute="make" />
              </StyledRefinementList>
              <StyledRefinementList isInactive={!this.state.make}>
                <label>Model</label>
                <RefinementList attribute="model" />
              </StyledRefinementList>
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

  private onSearchStateChangedHandler(searchState: {
    page: number;
    refinementList: { make: [] };
  }) {
    if (searchState.refinementList.make.length === 0) {
      this.setState({ make: false });
    } else {
      this.setState({ make: true });
    }
    navigate(this.searchStateToUrl(this.props, searchState));

    this.setState({ searchState });
  }
}

function Vehicle({ hit }) {
  return (
    <Link to={hit.slug}>
      <VehicleItem featuredImage={hit.images[0]} {...hit} />
    </Link>
  );
}

export default Cars;
