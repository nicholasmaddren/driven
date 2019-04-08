import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AppContext from '../../context/AppContext';
import Layout from '../../components/Layout';
import SEO from '../../components/Seo';
import Container from '../../components/Container';
import Panel from '../../components/Panel';
import Grid from '../../components/Grid';
import FormField from '../../components/FormField';
import Input from '../../components/Input';
import Box from '../../components/Box';
import Button from '../../components/Button';
import TextArea from '../../components/TextArea';
import VehicleItem from '../../components/business/organisms/VehicleItem';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const StyledQuestionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  grid-gap: 40px;
`;

const Question = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  return (
    <AppContext.Consumer>
      {value => (
        <Layout>
          <SEO title="Ask a question" />
          <Container>
            {value.selectedCar.make ? (
              <StyledQuestionGrid>
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
                          Submit Question{' '}
                          <FontAwesomeIcon icon={faAngleRight} />
                        </Button>
                      </Box>
                    </form>
                  </Panel>
                </div>
                <div>
                  <VehicleItem
                    make={value.selectedCar.make}
                    model={value.selectedCar.model}
                    price={value.selectedCar.price}
                    featuredImage={value.selectedCar.images[0]}
                    mileage={value.selectedCar.mileage}
                    year={value.selectedCar.year}
                  />
                </div>
              </StyledQuestionGrid>
            ) : (
              <p>Select a car</p>
            )}
          </Container>
        </Layout>
      )}
    </AppContext.Consumer>
  );
};

export default Question;
