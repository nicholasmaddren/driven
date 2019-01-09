import { pick } from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-instantsearch-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { createClassNames } from '../core/utils';
import List from './List';

const cx = createClassNames('RefinementList');

class RefinementList extends Component {
  static propTypes = {
    attribute: PropTypes.string.isRequired,
    translate: PropTypes.func.isRequired,
    refine: PropTypes.func.isRequired,
    searchForItems: PropTypes.func.isRequired,
    searchable: PropTypes.bool,
    createURL: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.arrayOf(PropTypes.string).isRequired,
        count: PropTypes.number.isRequired,
        isRefined: PropTypes.bool.isRequired,
      })
    ),
    isFromSearch: PropTypes.bool.isRequired,
    canRefine: PropTypes.bool.isRequired,
    showMore: PropTypes.bool,
    limit: PropTypes.number,
    showMoreLimit: PropTypes.number,
    transformItems: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  state = {
    query: '',
  };

  selectItem = (item, resetQuery) => {
    resetQuery();
    this.props.refine(item.value);
  };

  renderItem = (item, resetQuery) => {
    const label = this.props.isFromSearch ? item : item.label;
    return (
      <label className={cx('label')}>
        <div className={cx('label-content')}>
          <input
            className={cx('checkbox')}
            type="checkbox"
            checked={item.isRefined}
            onChange={() => this.selectItem(item, resetQuery)}
          />
          <span className={cx('labelText')}>{label}</span>{' '}
          <span
            className={cx('count')}
          >{`(${item.count.toLocaleString()})`}</span>
        </div>
        {item.isRefined && <FontAwesomeIcon icon={faCheck} />}
      </label>
    );
  };

  render() {
    return (
      <List
        attribute={this.props.attribute}
        renderItem={this.renderItem}
        selectItem={this.selectItem}
        cx={cx}
        {...pick(this.props, [
          'translate',
          'items',
          'showMore',
          'limit',
          'showMoreLimit',
          'isFromSearch',
          'searchForItems',
          'searchable',
          'canRefine',
          'className',
        ])}
        query={this.state.query}
      />
    );
  }
}

export default translatable({
  showMore: extended => (extended ? 'Show less' : 'Show more'),
  noResults: 'No results',
  submit: null,
  reset: null,
  resetTitle: 'Clear the search query.',
  submitTitle: 'Submit your search query.',
  placeholder: 'Search here…',
})(RefinementList);
