import { Link } from 'gatsby';
import styled from 'styled-components';
import * as React from 'react';

const StyledHeader = styled.div`
  padding: 20px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.vars.color.grey2};
  h1 {
    margin: 0;
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.vars.color.grey4};
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

interface IProps {
  siteTitle: string;
}

const defaultProps = {
  siteTitle: '',
};

const Header: React.SFC<IProps> = props => (
  <StyledHeader>
    <h1>
      <Link to="/">{props.siteTitle}</Link>
    </h1>
    <StyledMenu>
      <Link to="/cars">Cars for sale</Link>
      <Link to="/">Sell your car</Link>
      <Link to="/">About us</Link>
      <Link to="/">Contact</Link>
    </StyledMenu>
  </StyledHeader>
);

Header.defaultProps = defaultProps;

export default Header;
