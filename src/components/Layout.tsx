import React, { FC } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import theme from '../theme';
import Header from './Header';
import Footer from './Footer';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  body {
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700');
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

const Layout: FC = props => (
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
          <Header
            siteTitle={data.site.siteMetadata.title}
            logoImage="https://drivengroup.co.uk/wp-content/themes/driven/dist/images/logo-dark_1125fb4a.png"
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
        </>
      )}
    />
  </ThemeProvider>
);

export default Layout;
