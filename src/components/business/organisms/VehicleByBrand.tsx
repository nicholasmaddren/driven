import React, { FC } from 'react';
import styled from 'styled-components';

const StyledVehicleByBrand = styled.div`
  padding: 40px 80px;
`;

const StyledBrandContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
`;

const StyledBrandItem = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  border: 1px solid ${props => props.theme.vars.color.grey2};
  border-radius: 5px;
  cursor: pointer;
  :hover {
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.2);
    img {
      transform: scale(1.025);
    }
  }
  img {
    max-width: 100%;
    max-height: 100px;
    transition: all 0.25s ease-in-out;
  }
`;

interface IVehicleByBrandProps {
  brands: { image: string; name: string }[];
}

const VehicleByBrand: FC<IVehicleByBrandProps> = props => (
  <StyledVehicleByBrand>
    <h2>Shop by brand</h2>
    <StyledBrandContainer>
      {props.brands.map(brand => (
        <StyledBrandItem>
          <img src={brand.image} alt={brand.name} />
        </StyledBrandItem>
      ))}
    </StyledBrandContainer>
  </StyledVehicleByBrand>
);

export default VehicleByBrand;
