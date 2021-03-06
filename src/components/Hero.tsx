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
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 40px;
`;

const StyledContent = styled.div<ICommonProps>`
  width: 100%;
  .meta {
    color: ${({ textColor }) => textColor};
    font-weight: 600;
    line-height: 1.2;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
    margin-bottom: 40px;
    h1 {
      font-size: 30px;
    }
    p {
      font-size: 18px;
      margin: 0;
    }
  }
  .children {
    > * {
      max-width: 350px;
    }
  }
  @media screen and (min-width: 600px) {
    .meta {
      h1 {
        font-size: 45px;
      }
      p {
        font-size: 20px;
      }
    }
  }
  @media screen and (min-width: 900px) {
    width: 60%;
    .meta {
      h1 {
        font-size: 55px;
      }
    }
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
  description?: string;
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
        <div className="meta">
          {props.heading && <h1>{props.heading}</h1>}
          {props.description && <p>{props.description}</p>}
        </div>
        <div className="children">{props.children}</div>
      </StyledContent>
    </StyledContainer>
  </StyledHero>
);

Hero.defaultProps = defaultProps;

export default Hero;
