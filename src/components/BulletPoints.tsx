import styled from 'styled-components';
import * as React from 'react';

import Grid from '../components/Grid';

const StyledtItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  img {
    width: 75px;
    height: 75px;
    margin-right: 20px;
    @media screen and (min-width: 700px) {
      width: 100px;
      height: 100px;
    }
  }
`;

interface IProps {
  items: {
    id: string;
    heading: string;
    description: string;
    image: { src: string; alt: string };
  }[];
}

const BulletPoints: React.SFC<IProps> = props => (
  <Grid columnMinWidth={{ value: 300, unit: 'px' }}>
    {props.items.map(item => {
      return (
        <StyledtItem key={'bullet-point-' + item.id}>
          <img src={item.image.src} alt={item.image.alt} />
          <div className="content">
            <h3>{item.heading}</h3>
            <p>{item.description}</p>
          </div>
        </StyledtItem>
      );
    })}
  </Grid>
);

export default BulletPoints;
