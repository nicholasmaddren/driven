import styled from 'styled-components';
import * as React from 'react';

const StyledBulletPoints = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledtItem = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
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
  <StyledBulletPoints>
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
  </StyledBulletPoints>
);

export default BulletPoints;
