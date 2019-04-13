import React, { useState } from 'react';
import styled from 'styled-components';
import { graphql, StaticQuery } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Container from '../components/Container';
import Panel from '../components/Panel';
import Input from '../components/Input';
import Grid from '../components/Grid';
import FormField from '../components/FormField';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import Box from '../components/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faMapMarker,
  faAngleRight,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

const StyledPageHeading = styled.div`
  margin-bottom: 20px;
  h1 {
    margin-bottom: 10px;
  }
`;

const StyledContactItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.vars.color.grey1};
  padding: 20px 0;
  svg {
    color: ${({ theme }) => theme.vars.color.secondary};
    font-size: 16px;
    margin-right: 20px;
  }
  .content {
    width: 100%;
    h5 {
      margin-bottom: 5px;
    }
  }
  .opening-times__table {
    width: 100%;
    td:first-child {
      width: 40%;
      white-space: nowrap;
    }
  }
`;

const StyledContactGrid = styled.div`
  display: grid;
  grid-template-columns: 500px 1fr;
  grid-gap: 40px;
`;

const Contact = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  return (
    <StaticQuery
      query={contactQuery}
      render={data => {
        return (
          <Layout>
            <SEO title="Contact Us" />
            <Container>
              <StyledPageHeading>
                <h1>Contact Us</h1>
                <h3 className="font-weight__light">How can we help you?</h3>
              </StyledPageHeading>
              <StyledContactGrid>
                <div>
                  {data.config.sites.map(site => (
                    <Panel key={'contact-sites-' + site.name}>
                      <h4>{site.name}</h4>
                      <StyledContactItem>
                        <div className="icon-wrapper">
                          <FontAwesomeIcon icon={faPhone} flip="horizontal" />
                        </div>
                        <div className="content">
                          <h5>Call Us</h5>
                          <p className="margin__none">
                            <strong>Sales: </strong>
                            <a href={`tel:${site.phoneNumbers.sales}`}>
                              {site.phoneNumbers.sales}
                            </a>
                          </p>
                        </div>
                      </StyledContactItem>
                      <StyledContactItem>
                        <div className="icon-wrapper">
                          <FontAwesomeIcon icon={faMapMarker} />
                        </div>
                        <div className="content">
                          <h5>Find Us</h5>
                          <p className="margin__none">{site.locationAddress}</p>
                        </div>
                      </StyledContactItem>
                      <StyledContactItem>
                        <div className="icon-wrapper">
                          <FontAwesomeIcon icon={faClock} />
                        </div>
                        <div className="content">
                          <h5>Opening Times</h5>
                          <table className="opening-times__table">
                            <tbody>
                              <tr>
                                <td>Monday</td>
                                <td>{site.openingTimes.monday}</td>
                              </tr>
                              <tr>
                                <td>Tuesday</td>
                                <td>{site.openingTimes.tuesday}</td>
                              </tr>
                              <tr>
                                <td>Wednesday</td>
                                <td>{site.openingTimes.wednesday}</td>
                              </tr>
                              <tr>
                                <td>Thursday</td>
                                <td>{site.openingTimes.thursday}</td>
                              </tr>
                              <tr>
                                <td>Friday</td>
                                <td>{site.openingTimes.friday}</td>
                              </tr>
                              <tr>
                                <td>Saturday</td>
                                <td>{site.openingTimes.saturday}</td>
                              </tr>
                              <tr>
                                <td>Sunday</td>
                                <td>{site.openingTimes.sunday}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </StyledContactItem>
                    </Panel>
                  ))}
                </div>
                <div>
                  <Panel>
                    <form>
                      <Grid>
                        <FormField>
                          <label>Full Name</label>
                          <Input
                            type="text"
                            value={fullName}
                            onChange={value => setFullName(value)}
                          />
                        </FormField>
                        <FormField>
                          <label>Phone</label>
                          <Input
                            type="tel"
                            value={phone}
                            onChange={value => setPhone(value)}
                          />
                        </FormField>
                      </Grid>
                      <FormField>
                        <label>Email</label>
                        <Input
                          type="email"
                          value={email}
                          onChange={value => setEmail(value)}
                        />
                      </FormField>
                      <FormField>
                        <label>Message</label>
                        <TextArea
                          value={message}
                          onChange={value => setMessage(value)}
                        />
                      </FormField>
                      <Box justifyContent="end">
                        <Button type="submit">
                          Send Enquiry <FontAwesomeIcon icon={faAngleRight} />
                        </Button>
                      </Box>
                    </form>
                  </Panel>
                </div>
              </StyledContactGrid>
            </Container>
          </Layout>
        );
      }}
    />
  );
};

const contactQuery = graphql`
  query {
    config {
      sites {
        name
        phoneNumbers {
          sales
        }
        locationAddress
        openingTimes {
          monday
          tuesday
          wednesday
          thursday
          friday
          saturday
          sunday
        }
      }
    }
  }
`;

export default Contact;
