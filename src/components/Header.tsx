import { Link } from 'gatsby';
import styled from 'styled-components';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

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

const StyledMobileMenuButton = styled.button`
  background-color: transparent;
  border: 0;
`;

interface IMenuItems {
  to: string;
  name: string;
}

interface IHeaderProps {
  menuItems: IMenuItems[];
  siteTitle: string;
  logoImage: string;
  mobileMode: boolean;
  onMobileMenuClick: () => void;
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
    {props.mobileMode ? (
      <StyledMobileMenuButton onClick={props.onMobileMenuClick}>
        <FontAwesomeIcon icon={faBars} />
      </StyledMobileMenuButton>
    ) : (
      <StyledMenu>
        {props.menuItems.map(menuItem => (
          <Link key={`header-link-${menuItem.name}`} to={menuItem.to}>
            {menuItem.name}
          </Link>
        ))}
      </StyledMenu>
    )}
  </StyledHeader>
);

Header.defaultProps = defaultProps;

export default Header;
