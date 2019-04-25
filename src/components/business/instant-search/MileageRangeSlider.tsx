import React, { Component } from 'react';
import Rheostat from '../../Rheostat';
import { connectRange } from 'react-instantsearch-dom';
import styled from 'styled-components';

const StyledMileageRange = styled.div`
  .mileage-range__text-values {
    margin-bottom: 10px;
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
      <StyledMileageRange>
        <div className="mileage-range__text-values">
          {currentValues.min}
          {' - '}
          {currentValues.max}
        </div>
        <Rheostat
          className="ais-RangeSlider"
          min={min}
          max={max}
          values={[currentRefinement.min, currentRefinement.max]}
          onChange={this.onChange}
          onValuesUpdated={this.onValuesUpdated}
        />
      </StyledMileageRange>
    ) : null;
  }
}

const ConnectedRange = connectRange(PriceRange);

export default ConnectedRange;
