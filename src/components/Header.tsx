import { Link } from 'gatsby';
import styled from 'styled-components';
import * as React from 'react';

const StyledHeader = styled.div`
  position: sticky;
  z-index: 1;
  top: 0;
  padding: 20px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.vars.color.grey2};
  a {
    font-size: 14px;
    text-decoration: none;
    color: ${props => props.theme.vars.color.grey4};
  }
`;

const StyledBrand = styled.div`
  img {
    max-width: 150px;
  }
`;

const StyledMenu = styled.div`
  a {
    text-transform: uppercase;
    margin: 0 10px;
    font-weight: 600;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`;

interface IHeaderProps {
  siteTitle: string;
  logoImage: string;
}

const defaultProps = {
  siteTitle: '',
};

const Header: React.SFC<IHeaderProps> = props => (
  <StyledHeader>
    <StyledBrand>
      <Link to="/">
        {props.logoImage ? (
          <img src={props.logoImage} alt={props.siteTitle} />
        ) : (
          props.siteTitle
        )}
      </Link>
    </StyledBrand>
    <StyledMenu>
      <Link to="/cars">Cars for sale</Link>
      <Link to="/">Sell your car</Link>
      <Link to="/">About us</Link>
      <Link to="/contact">Contact Us</Link>
    </StyledMenu>
  </StyledHeader>
);

Header.defaultProps = defaultProps;

export default Header;
