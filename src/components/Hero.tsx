import styled from 'styled-components';
import * as React from 'react';

const StyledHero = styled.div<ICommonProps>`
  padding: 40px 80px;
  background: linear-gradient(
      ${({ bgGradientPosition }) => bgGradientPosition},
      ${({ bgGradientColor1 }) => bgGradientColor1},
      ${({ bgGradientColor2 }) => bgGradientColor2}
    ),
    url(${({ bgImage }) => bgImage}) no-repeat ${({ bgPosition }) => bgPosition};
  background-size: cover;
`;

const StyledContent = styled.div`
  color: #fff;
  margin-bottom: 40px;
  width: 50%;
  font-weight: 600;
  line-height: 1.2;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  h1 {
    font-size: 55px;
  }
  p {
    font-size: 20px;
    margin: 0;
  }
`;

interface ICommonProps {
  bgImage?: string;
  bgPosition?: string;
  bgGradientColor1?: string;
  bgGradientColor2?: string;
  bgGradientPosition?: string;
}

interface IHeroProps extends ICommonProps {
  heading: string;
  paragraph?: string;
}

const defaultProps: ICommonProps = {
  bgGradientPosition: '0deg',
};

const Hero: React.SFC<IHeroProps> = props => (
  <StyledHero
    bgImage={props.bgImage}
    bgPosition={props.bgPosition}
    bgGradientColor1={props.bgGradientColor1}
    bgGradientColor2={props.bgGradientColor2}
    bgGradientPosition={props.bgGradientPosition}
  >
    <StyledContent>
      {props.heading && <h1>{props.heading}</h1>}
      {props.paragraph && <p>{props.paragraph}</p>}
    </StyledContent>
    {props.children}
  </StyledHero>
);

Hero.defaultProps = defaultProps;

export default Hero;
