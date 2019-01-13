import styled from 'styled-components';
import * as React from 'react';

const StyledHero = styled.div`
  padding: 40px 80px;
  background: url('https://www.carmax.com/~/media/images/carmax/com/Homepage/hero/hp-hero-shopper-on-car-lot-final.jpg?ts=20170228T175801Z')
    no-repeat center center;
  background-size: cover;
`;

const StyledContent = styled.div`
  color: #fff;
  margin-bottom: 40px;
  width: 50%;
  font-weight: 600;
  line-height: 1.2;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  h1 {
    font-size: 55px;
  }
  p {
    font-size: 20px;
    margin: 0;
  }
`;

interface IProps {
  heading: string;
  paragraph?: string;
}

const Hero: React.SFC<IProps> = props => (
  <StyledHero>
    <StyledContent>
      {props.heading && <h1>{props.heading}</h1>}
      {props.paragraph && <p>{props.paragraph}</p>}
    </StyledContent>
    {props.children}
  </StyledHero>
);
export default Hero;
