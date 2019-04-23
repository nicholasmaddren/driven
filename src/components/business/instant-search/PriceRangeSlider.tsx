import React, { Component } from 'react';
import Rheostat from 'rheostat';
import { connectRange } from 'react-instantsearch-dom';
import styled from 'styled-components';

import PriceDisplay from '../atoms/PriceDisplay';

const StyledPriceRange = styled.div`
  .price-range__text-values {
    margin-bottom: 10px;
  }
`;

const StyledRheostat = styled(Rheostat)`
  height: 24px;
  margin: 0 12px;
  position: relative;
  overflow: visible;

  .rheostat-background {
    background: ${({ theme }) => theme.vars.color.grey2};
    height: 2px;
    position: relative;
    top: 14px;
    width: 100%;
  }

  .rheostat--disabled .rheostat-progress {
    background-color: #edefed;
  }

  .rheostat--disabled .rheostat-handle {
    cursor: default;
  }

  .rheostat-progress {
    background-color: ${({ theme }) => theme.vars.color.grey4};
    height: 4px;
    position: absolute;
    top: 13px;
  }

  .rheostat-handle {
    border: 1px solid ${({ theme }) => theme.vars.color.grey3};
    background: #fff;
    border-radius: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    height: 25px;
    margin-left: -12px;
    position: absolute;
    z-index: 2;
    width: 24px;
    font-size: 0;
  }
`;

interface IRange {
  min: number;
  max: number;
}

interface IPriceRangeProps {
  min: number;
  max: number;
  currentRefinement: IRange;
  refine: (IRange) => void;
  canRefine: boolean;
  header: any;
  footer: any;
}

class PriceRange extends Component<IPriceRangeProps> {
  state = { currentValues: { min: this.props.min, max: this.props.max } };

  componentWillReceiveProps(sliderState) {
    if (sliderState.canRefine) {
      this.setState({
        currentValues: {
          min: sliderState.currentRefinement.min,
          max: sliderState.currentRefinement.max,
        },
      });
    }
  }

  onValuesUpdated = sliderState => {
    this.setState({
      currentValues: { min: sliderState.values[0], max: sliderState.values[1] },
    });
  };

  onChange = sliderState => {
    if (
      this.props.currentRefinement.min !== sliderState.values[0] ||
      this.props.currentRefinement.max !== sliderState.values[1]
    ) {
      this.props.refine({
        min: sliderState.values[0],
        max: sliderState.values[1],
      });
    }
  };

  render() {
    const { min, max, currentRefinement } = this.props;
    const { currentValues } = this.state;

    return min !== max ? (
      <StyledPriceRange>
        <div className="price-range__text-values">
          <PriceDisplay value={currentValues.min} /> to{' '}
          <PriceDisplay value={currentValues.max} />
        </div>
        <StyledRheostat
          className="ais-RangeSlider"
          min={min}
          max={max}
          values={[currentRefinement.min, currentRefinement.max]}
          onChange={this.onChange}
          onValuesUpdated={this.onValuesUpdated}
        />
      </StyledPriceRange>
    ) : null;
  }
}

const ConnectedRange = connectRange(PriceRange);

export default ConnectedRange;
