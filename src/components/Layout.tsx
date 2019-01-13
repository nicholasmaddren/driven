import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import theme from '../theme';
import Header from './Header';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  body {
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700');
    font-family: ${theme.vars.font.family};
    color: ${theme.vars.color.grey4};
    font-size: 14px;
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
          <Header siteTitle={data.site.siteMetadata.title} />
          <div>{props.children}</div>
        </>
      )}
    />
  </ThemeProvider>
);

export default Layout;
