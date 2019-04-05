import React, { FC } from "react";
import styled from "styled-components";

const StyledBox = styled.div<IBoxProps>`
  display: ${({ displayBlock }) => (displayBlock ? "block" : "flex")};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  ${props =>
    props.displayBlock &&
    props.justifyContent === "center" &&
    "text-align: center;"}
  ${props =>
    !props.displayBlock &&
    props.justifyContent &&
    `justify-content: ${getFlexEndCSSValue(props.justifyContent)};`}
  ${props =>
    !props.displayBlock &&
    props.alignItems &&
    `align-items: ${getFlexEndCSSValue(props.alignItems)};`}
`;

type JustifyContent = "center" | "space-around" | "space-between" | "end";

type AlignItems = "center" | "end";

interface IBoxProps {
  /**
   * Items are displayed on top of each other
   */
  displayBlock?: boolean;
  /**
   * Box padding
   * @default "0"
   */
  padding?: string;
  /**
   *  Box margin
   * @default "0"
   */
  margin?: string;
  /**
   * ("center" | "end" | "space-around"| "space-between").
   */
  justifyContent?: JustifyContent;
  /**
   * ("center" | "end").
   */
  alignItems?: AlignItems;
}

const defaultProps = {
  padding: "0",
  margin: "0"
};

const Box: FC<IBoxProps> = props => (
  <StyledBox {...props}>{props.children}</StyledBox>
);

const getFlexEndCSSValue = (value: string) => {
  if (value === "end") {
    return "flex-end";
  }

  return value;
};

Box.defaultProps = defaultProps;

export default Box;
