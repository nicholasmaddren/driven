import styled from 'styled-components';
import * as React from 'react';

const getGetFlexPosition = (position: IContentPositions) => {
  switch (position) {
    case 'left':
      return 'flex-start';
    case 'center':
      return 'center';
    case 'right':
      return 'flex-end';
    default:
      return 'flex-start';
  }
};

const StyledHero = styled.div<ICommonProps>`
  display: flex;
  justify-content: ${({ contentPosition }) =>
    getGetFlexPosition(contentPosition)};
  padding: 40px 80px;
  text-align: ${({ contentPosition }) => contentPosition};
  background: linear-gradient(
      ${({ bgColorPosition }) => bgColorPosition},
      ${({ bgColor1 }) => bgColor1},
      ${({ bgColor2, bgColor1 }) => (bgColor2 ? bgColor2 : bgColor1)}
    ),
    url(${({ bgImage }) => bgImage}) no-repeat ${({ bgPosition }) => bgPosition};
  background-size: cover;
`;

const StyledContainer = styled.div<ICommonProps>`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ contentPosition }) =>
    getGetFlexPosition(contentPosition)};
  width: 50%;
`;

const StyledContent = styled.div<ICommonProps>`
  color: ${({ textColor }) => textColor};
  font-weight: 600;
  line-height: 1.2;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  margin-bottom: 40px;
  h1 {
    font-size: 55px;
  }
  p {
    font-size: 20px;
    margin: 0;
  }
`;

type IContentPositions = 'left' | 'center' | 'right';

interface ICommonProps {
  contentPosition?: IContentPositions;
  bgImage?: string;
  bgPosition?: string;
  bgColor1?: string;
  bgColor2?: string;
  bgColorPosition?: string;
  textColor?: string;
}

interface IHeroProps extends ICommonProps {
  heading: string;
  paragraph?: string;
}

const defaultProps: ICommonProps = {
  bgColorPosition: '0deg',
  textColor: '#fff',
};

const Hero: React.SFC<IHeroProps> = props => (
  <StyledHero
    contentPosition={props.contentPosition}
    bgImage={props.bgImage}
    bgPosition={props.bgPosition}
    bgColor1={props.bgColor1}
    bgColor2={props.bgColor2}
    bgColorPosition={props.bgColorPosition}
  >
    <StyledContainer contentPosition={props.contentPosition}>
      <StyledContent textColor={props.textColor}>
        {props.heading && <h1>{props.heading}</h1>}
        {props.paragraph && <p>{props.paragraph}</p>}
      </StyledContent>
      {props.children}
    </StyledContainer>
  </StyledHero>
);

Hero.defaultProps = defaultProps;

export default Hero;
