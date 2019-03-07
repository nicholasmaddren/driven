import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SearchBox } from 'react-instantsearch-dom';

import { StaticQuery, graphql } from 'gatsby';

const itemsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.node.isRequired,
    items: (...args) => itemsPropType(...args),
  })
);

class List extends Component {
  static propTypes = {
    cx: PropTypes.func.isRequired,
    // Only required with showMore.
    translate: PropTypes.func,
    items: itemsPropType,
    renderItem: PropTypes.func.isRequired,
    selectItem: PropTypes.func,
    className: PropTypes.string,
    showMore: PropTypes.bool,
    limit: PropTypes.number,
    showMoreLimit: PropTypes.number,
    show: PropTypes.func,
    searchForItems: PropTypes.func,
    searchable: PropTypes.bool,
    isFromSearch: PropTypes.bool,
    canRefine: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    isFromSearch: false,
  };

  constructor() {
    super();

    this.state = {
      extended: false,
      query: '',
    };
  }

  onShowMoreClick = () => {
    this.setState(state => ({
      extended: !state.extended,
    }));
  };

  getLimit = () => {
    const { limit, showMoreLimit } = this.props;
    const { extended } = this.state;
    return extended ? showMoreLimit : limit;
  };

  resetQuery = () => {
    this.setState({ query: '' });
  };

  renderItem = (item, resetQuery) => {
    const itemHasChildren = item.items && Boolean(item.items.length);

    return (
      <li
        key={item.key || item.label}
        className={this.props.cx(
          'item',
          item.isRefined && 'item--selected',
          item.noRefinement && 'item--noRefinement',
          itemHasChildren && 'item--parent'
        )}
      >
        {this.props.renderItem(item, resetQuery)}
        {itemHasChildren && (
          <ul className={this.props.cx('list', 'list--child')}>
            {item.items
              .slice(0, this.getLimit())
              .map(child => this.renderItem(child, item))}
          </ul>
        )}
      </li>
    );
  };

  renderShowMore() {
    const { showMore, translate, cx } = this.props;
    const { extended } = this.state;
    const disabled = this.props.limit >= this.props.items.length;
    if (!showMore) {
      return null;
    }

    return (
      <button
        disabled={disabled}
        className={cx('showMore', disabled && 'showMore--disabled')}
        onClick={this.onShowMoreClick}
      >
        {translate('showMore', extended)}
      </button>
    );
  }

  renderSearchBox() {
    const {
      cx,
      searchForItems,
      isFromSearch,
      translate,
      items,
      selectItem,
    } = this.props;

    const noResults =
      items.length === 0 && this.state.query !== '' ? (
        <div className={cx('noResults')}>{translate('noResults')}</div>
      ) : null;
    return (
      <div className={cx('searchBox')}>
        <SearchBox
          currentRefinement={this.state.query}
          refine={value => {
            this.setState({ query: value });
            searchForItems(value);
          }}
          focusShortcuts={[]}
          translate={translate}
          onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            if (isFromSearch) {
              selectItem(items[0], this.resetQuery);
            }
          }}
        />
        {noResults}
      </div>
    );
  }

  getModifiedItems(items, allListings) {
    const modifiedItems = [];
    items.map(item => {
      return allListings.map(listing => {
        if (listing.node.model === item.label) {
          const { count, isRefined, label, value } = item;
          const modifiedItem = {
            count,
            isRefined,
            label,
            value,
            make: listing.node.make,
          };
          return modifiedItems.push(modifiedItem);
        }
        return null;
      });
    });
    return modifiedItems;
  }

  getItemMakes(items) {
    // This function will create an array of duplicated makes
    // It then uses Set to remove duplicates and returns an array of makes
    const createArrayOfDuplicatedItemMakes = items => {
      const list = [];
      items.map(item => {
        return list.push(item.make);
      });
      return list;
    };

    const arrayOfDuplicatedItemMakes = createArrayOfDuplicatedItemMakes(items);

    return Array.from(new Set(arrayOfDuplicatedItemMakes));
  }

  render() {
    const {
      cx,
      items,
      className,
      searchable,
      canRefine,
      attribute,
    } = this.props;
    const searchBox = searchable ? this.renderSearchBox() : null;
    const rootClassName = classNames(
      cx('', !canRefine && '-noRefinement'),
      className
    );

    if (items.length === 0) {
      return <div className={rootClassName}>{searchBox}</div>;
    }

    // Always limit the number of items we show on screen, since the actual
    // number of retrieved items might vary with the `maxValuesPerFacet` config
    // option.
    return attribute === 'model' ? (
      <StaticQuery
        query={listingsQuery}
        render={data => {
          const modifiedItems = this.getModifiedItems(
            items,
            data.allListings.edges
          );
          const itemMakes = this.getItemMakes(modifiedItems);
          return (
            <div className={rootClassName}>
              {searchBox}
              {itemMakes.map((make, index) => {
                const filteredByMakeItems = modifiedItems.filter(
                  item => item.make === make
                );
                return (
                  <div key={index}>
                    <label className={cx('make-label')}>{make}</label>
                    <ul
                      className={cx(
                        'list',
                        'list--model',
                        !canRefine && 'list--noRefinement'
                      )}
                    >
                      {filteredByMakeItems
                        .slice(0, this.getLimit())
                        .map(item => this.renderItem(item, this.resetQuery))}
                    </ul>
                  </div>
                );
              })}
              {this.renderShowMore()}
            </div>
          );
        }}
      />
    ) : (
      <div className={rootClassName}>
        {searchBox}
        <ul className={cx('list', !canRefine && 'list--noRefinement')}>
          {items
            .slice(0, this.getLimit())
            .map(item => this.renderItem(item, this.resetQuery))}
        </ul>
        {this.renderShowMore()}
      </div>
    );
  }
}

const listingsQuery = graphql`
  query {
    allListings {
      edges {
        node {
          vin
          make
          model
        }
      }
    }
  }
`;

export default List;
