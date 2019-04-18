import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

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
import Alert from '../../components/Alert';

const StyledQuestionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  grid-gap: 40px;
`;

const Question = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleFormSubmit = (e: FormEvent, carId: string) => {
    e.preventDefault();
    axios
      .post(`https://automerce.herokuapp.com/v1/enquiries/external`, {
        dealershipId: process.env.DEALERSHIP_ID,
        carId,
        firstname: firstName,
        lastname: lastName,
        phoneNumber: phone,
        email,
      })
      .then(() => {
        setSubmitSuccess(true);
      })
      .catch(() => {
        setSubmitError(true);
      });
  };

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
                    {submitError && (
                      <Alert type="error">
                        There was a problem sending your message.
                      </Alert>
                    )}
                    {submitSuccess && (
                      <Alert type="success">
                        Thanks for contacting us, we will be in touch shortly.
                      </Alert>
                    )}
                    <form
                      onSubmit={e => handleFormSubmit(e, value.selectedCar.id)}
                    >
                      <Grid>
                        <FormField>
                          <label>First Name</label>
                          <Input
                            type="text"
                            value={firstName}
                            onChange={value => setFirstName(value)}
                          />
                        </FormField>
                        <FormField>
                          <label>Last Name</label>
                          <Input
                            type="text"
                            value={lastName}
                            onChange={value => setLastName(value)}
                          />
                        </FormField>
                      </Grid>
                      <Grid>
                        <FormField>
                          <label>Phone</label>
                          <Input
                            type="tel"
                            value={phone}
                            onChange={value => setPhone(value)}
                          />
                        </FormField>
                        <FormField>
                          <label>Email</label>
                          <Input
                            type="email"
                            value={email}
                            onChange={value => setEmail(value)}
                          />
                        </FormField>
                      </Grid>
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
