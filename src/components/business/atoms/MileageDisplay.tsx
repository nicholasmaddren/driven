import * as React from 'react';
import numeral from 'numeral';

interface IProps {
  value: number;
}

const MileageDisplay: React.SFC<IProps> = props => {
  const formattedValue = numeral(props.value).format('0a');

  return <>{formattedValue} miles</>;
};

export default MileageDisplay;
