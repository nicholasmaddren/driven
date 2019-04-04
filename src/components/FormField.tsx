import React, { FC } from 'react';
import styled from 'styled-components';

const StyledFormField = styled.div`
  margin-bottom: 20px;
  label {
    display: block;
    margin-bottom: 10px;
    font-weight: 600;
  }
`;

const FormField: FC = props => (
  <StyledFormField>{props.children}</StyledFormField>
);

export default FormField;
