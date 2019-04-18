import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledMenu = styled.div<ICommonProps>`
  position: fixed;
  left: 0;
  top: 0;
  transform: translate3d(${({ isOpen }) => (isOpen ? '0' : '+100vw')}, 0, 0);
  width: 100vw;
  height: 100vh;
  transition: transform 0.25s ease-in-out;

  z-index: 3;
  background-color: ${({ theme }) => theme.vars.color.grey4};
  text-align: center;
  box-sizing: border-box;
  button {
    padding: 20px;
    background-color: ${({ theme }) => theme.vars.color.red};
    border-radius: 0 0 ${({ theme }) => theme.vars.border.radius.default} 0;
    position: absolute;
    left: 0;
    top: 0;
  }
  .menu-content {
    position: relative;
    padding: 40px 20px;
    height: 100%;
    a {
      display: block;
      color: #fff;
      margin-bottom: 20px;
      font-size: 18px;
    }
  }
`;

const StyledButton = styled.button`
  background-color: transparent;
  border: 0;
`;

interface IMenuItems {
  to: string;
  name: string;
}

interface ICommonProps {
  isOpen: boolean;
}

interface IMobileMenuProps extends ICommonProps {
  menuItems: IMenuItems[];
  onCloseMenuClick: () => void;
}

const MobileMenu: FC<IMobileMenuProps> = props => (
  <StyledMenu isOpen={props.isOpen}>
    <div className="menu-content">
      <StyledButton onClick={props.onCloseMenuClick}>
        <FontAwesomeIcon icon={faTimes} color="#fff" />
      </StyledButton>
      <Link to="/">Home</Link>
      {props.menuItems.map(menuItem => (
        <Link key={`mobile-menu-link-${menuItem.name}`} to={menuItem.to}>
          {menuItem.name}
        </Link>
      ))}
    </div>
  </StyledMenu>
);

export default MobileMenu;
