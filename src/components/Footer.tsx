import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faYoutube,
  faFacebook,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const StyledFooter = styled.footer<ICommonProps>`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
  a {
    color: ${({ textColor }) => textColor};
  }
  hr {
    height: 1px;
    width: 100%;
    background: ${({ theme }) => theme.vars.color.grey4};
    border: 0;
    margin: 30px 0;
  }
`;

const StyledContainer = styled.div`
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 50px;
  margin: 0 auto;
  > div {
    width: 100%;
    @media screen and (min-width: 700px) {
      width: 50%;
      :first-child {
        order: 1;
      }
    }
  }
`;

const StyledFooterBrand = styled.div`
  margin-bottom: 30px;
  .logo {
    max-width: 150px;
    display: block;
  }
`;

const StyledContactInfo = styled.div`
  display: flex;
  align-items: center;
  svg {
    font-size: 12px;
    padding: 6px;
    border-radius: 100%;
    border: 2px solid #fff;
    margin-right: 10px;
  }
  a {
    font-size: 22px;
    font-weight: 600;
  }
`;

const StyledSocialLinks = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
  li {
    margin-right: 20px;
    svg {
      font-size: 20px;
    }
  }
`;

const StyledPageLinks = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  list-style-type: none;
  padding: 0;
  li {
    margin-bottom: 20px;
  }
`;

interface ISocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
}

interface ICommonProps {
  bgColor: string;
  textColor: string;
}

interface IFooterProps extends ICommonProps {
  pageLinks: { name: string; to: string }[];
  logoImage: string;
  copyright: string;
  socialLinks: ISocialLinks;
  siteTitle: string;
}

const Footer: FC<IFooterProps> = props => (
  <StyledFooter bgColor={props.bgColor} textColor={props.textColor}>
    <StyledContainer>
      <div>
        <StyledContactInfo>
          <FontAwesomeIcon icon={faPhone} flip="horizontal" />
          <a>01642 890900</a>
        </StyledContactInfo>
        <hr />
        <StyledPageLinks>
          {props.pageLinks.map(pageLink => (
            <li key={pageLink.name}>
              <Link to={pageLink.to}>{pageLink.name}</Link>
            </li>
          ))}
        </StyledPageLinks>
      </div>
      <div>
        <StyledFooterBrand>
          <img className="logo" src={props.logoImage} alt={props.siteTitle} />
          <small>{props.copyright}</small>
        </StyledFooterBrand>

        <StyledSocialLinks>
          <li>
            <a href={props.socialLinks.facebook} target="_blank">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </li>
          <li>
            <a href={props.socialLinks.instagram} target="_blank">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>
          <li>
            <a href={props.socialLinks.twitter} target="_blank">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </li>
          <li>
            <a href={props.socialLinks.youtube} target="_blank">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </li>
        </StyledSocialLinks>
      </div>
    </StyledContainer>
  </StyledFooter>
);

export default Footer;
