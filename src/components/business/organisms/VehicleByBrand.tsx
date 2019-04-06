import React, { FC } from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';

import BMW from '../../../images/brands/bmw.png';
import Chevrolet from '../../../images/brands/chevrolet.png';
import Toyota from '../../../images/brands/toyota.png';
import Ford from '../../../images/brands/ford.png';
import MercedesBenz from '../../../images/brands/mercedes-benz.png';

const StyledVehicleByBrand = styled.div`
  padding: 40px 80px;
  background-color: #fff;
`;

const StyledBrandContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
`;

const StyledBrandItem = styled.button`
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
  cars: any[];
}

const VehicleByBrand: FC<IVehicleByBrandProps> = props => {
  const brands = props.cars.map(car => car.node.make);
  const uniqueBrandsArray = brands.filter(
    (brand, index) => brands.indexOf(brand) === index
  );
  return (
    <StyledVehicleByBrand>
      <h3>Shop by Brand</h3>
      <StyledBrandContainer>
        {uniqueBrandsArray.map(brand => {
          const logoImage = getLogoImage(brand);
          if (logoImage) {
            return (
              <StyledBrandItem
                onClick={() => navigate(`/cars/?page=1&query=${brand}`)}
                key={`vehicle-by-brand-${brand}`}
              >
                <img alt={brand} src={logoImage} />
              </StyledBrandItem>
            );
          }
          return brand;
        })}
      </StyledBrandContainer>
    </StyledVehicleByBrand>
  );
};

const getLogoImage = name => {
  // This is needed because of spelling variations, example: "Mercedes-Benz" or "Mercedes Benz"
  const rawName = name.toLowerCase().replace(/-|\s/g, '');
  switch (rawName) {
    case 'bmw':
      return BMW;
    case 'chevrolet':
      return Chevrolet;
    case 'ford':
      return Ford;
    case 'mercedesbenz':
      return MercedesBenz;
    case 'toyota':
      return Toyota;
    default:
      return null;
  }
};

export default VehicleByBrand;
