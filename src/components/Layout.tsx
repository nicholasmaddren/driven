import React, { FC, useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import ContainerDimensions from 'react-container-dimensions';

import theme from '../theme';
import Header from './Header';
import Footer from './Footer';
import MobileMenu from './MobileMenu';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700');
  ${normalize}
  body {
    font-family: ${theme.vars.font.family};
    color: ${theme.vars.color.grey4};
    background-color: ${theme.vars.color.grey1};
    font-size: 16px;
    line-height: 1.3;
  }

  h1,h2,h3,h4,h5,h6 {
    margin-top: 0;
  }

  h1 {
    font-size: 2.6rem;
    margin-bottom: 15px;
    font-weight: 700;
  }

  h2 {
    font-size: 2.2rem;
    margin-bottom: 12px;
    font-weight: 700;
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 10px;
    font-weight: 600;
  }

  h4 {
    font-size: 1.6rem;
    margin-bottom: 10px;
    font-weight: 600;
  }

  h5 {
    font-size: 1.4rem;
    margin-bottom: 10px;
    font-weight: 600;
  }

  p {
    margin-top: 0;
    margin-bottom: 10px;
  }

  a {
    text-decoration: none;
  }

  .margin__none {
    margin: 0;
  }

  .font-weight__light {
    font-weight: 300;
  }
`;

const StyledAppWrapper = styled.div<{ isMenuOpen: boolean }>`
  position: relative;
  ${({ isMenuOpen }) =>
    isMenuOpen &&
    `
      overflow-y: hidden;
      height: 100vh;
    `}
`;

const Layout: FC = props => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { to: '/cars', name: 'Cars for sale' },
    { to: '/sell', name: 'Sell your car' },
    { to: '/about-us', name: 'About us' },
    { to: '/contact', name: 'Contact Us' },
  ];

  const mobileMenuMode = (width: number) => {
    return width > 650 ? false : true;
  };

  const handleMobileMenuClick = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMobileMenuClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            site {
              siteMetadata {
                title
              }
            }
            config {
              footer {
                logo
                copyright
                backgroundColor
                textColor
                socialLinks {
                  facebook
                  instagram
                  twitter
                  youtube
                }
              }
            }
          }
        `}
        render={data => (
          <>
            <GlobalStyle />
            <ContainerDimensions>
              {({ width }) => (
                <StyledAppWrapper isMenuOpen={isMenuOpen}>
                  {mobileMenuMode(width) && (
                    <MobileMenu
                      isOpen={isMenuOpen}
                      menuItems={menuItems}
                      onCloseMenuClick={handleCloseMobileMenuClick}
                    />
                  )}
                  <Header
                    siteTitle={data.site.siteMetadata.title}
                    logoImage="https://drivengroup.co.uk/wp-content/themes/driven/dist/images/logo-dark_1125fb4a.png"
                    menuItems={menuItems}
                    mobileMode={mobileMenuMode(width)}
                    onMobileMenuClick={handleMobileMenuClick}
                  />
                  <div>{props.children}</div>
                  <Footer
                    siteTitle={data.site.siteMetadata.title}
                    logoImage={data.config.footer.logo}
                    copyright={data.config.footer.copyright}
                    socialLinks={data.config.footer.socialLinks}
                    bgColor={data.config.footer.backgroundColor}
                    textColor={data.config.footer.textColor}
                    pageLinks={[
                      { name: 'Home', to: '/' },
                      { name: 'Cars For Sale', to: '/cars' },
                      { name: 'Sell Your Car', to: '/sell-your-car' },
                      { name: 'About Us', to: '/about-us' },
                      { name: 'Contact', to: '/contact' },
                    ]}
                  />
                </StyledAppWrapper>
              )}
            </ContainerDimensions>
          </>
        )}
      />
    </ThemeProvider>
  );
};

export default Layout;
