import * as React from 'react';
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
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: .5rem;
    font-weight: 700;
    line-height: 1.2;
  }

  p {
    margin-top: 0;
    margin-bottom: .5rem;
  }

  a {
    text-decoration: none;
  }
`;

const Layout: React.SFC = props => (
  <ThemeProvider theme={theme}>
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
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
            logoImage="https://drivengroup.co.uk/wp-content/themes/driven/dist/images/logo_aa5ba1d7.png"
            bgColor="#041022"
            textColor="#fff"
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
