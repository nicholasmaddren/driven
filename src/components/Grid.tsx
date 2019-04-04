import * as React from "react";
import ContainerDimensions from "react-container-dimensions";
import styled from "styled-components";

const StyledContainerDimensions = styled(ContainerDimensions)`
  width: 100%;
`;

// prettier-ignore
const GridElement = styled.div<IGridProps>`
  display: grid;
  grid-template-columns: repeat(
    ${({columnNumber}) => (columnNumber ? columnNumber : "auto-fit")},
    minmax(${({columnMinWidth, columnMaxWidth}) => `${columnMinWidth!.value + columnMinWidth!.unit}, ${columnMaxWidth!.value + columnMaxWidth!.unit}`})
  );
  grid-gap: ${props => props.gridGap}px;
  ${({ containerWidth, columnMinWidth, columnNumber, gridGap }) =>
    (containerWidth! <= columnMinWidth!.value * columnNumber! + gridGap! &&
      "grid-template-columns: 1fr;") ||
    (containerWidth! <= columnMinWidth!.value && "grid-template-columns: 1fr;")}
`;

export interface IColumnWidthProps {
  value: number;
  unit: string;
}

interface IGridProps {
  /**
   * Sets the gap between each column
   * @default 15
   */
  gridGap?: number;
  /**
   * Sets a min-width to the columns
   * @default columnMinWidth: { value: 0, unit: "px" }
   */
  columnMinWidth?: IColumnWidthProps;
  /**
   * Sets a max-width to the columns
   * @default columnMaxWidth: { value: 1, unit: "fr" }
   */
  columnMaxWidth?: IColumnWidthProps;
  /**
   * Sets a fixed number of columns
   */
  columnNumber?: number;
  /**
   * Width of the container
   */
  containerWidth?: number;
}

const defaultProps: IGridProps = {
  columnMinWidth: { value: 0, unit: "px" },
  columnMaxWidth: { value: 1, unit: "fr" },
  gridGap: 15
};

const Grid: React.FC<IGridProps> = props => (
  <StyledContainerDimensions>
    {({ width }) => (
      <GridElement containerWidth={width} {...props}>
        {props.children}
      </GridElement>
    )}
  </StyledContainerDimensions>
);

Grid.defaultProps = defaultProps;

export default Grid;
