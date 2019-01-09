import styled from 'styled-components';
import React from 'react';

const StyledFacetedNav = styled.div`
  padding: 20px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  display: flex;
  margin-bottom: 20px;
  select {
    width: 100%;
  }
  button {
    background: blue;
    border: 0;
    color: #fff;
  }
`;

const VehicleSearch: React.SFC = () => (
  <StyledFacetedNav>
    <select>
      <option value="" selected>
        All makes
      </option>
      <option>Audi</option>
      <option>BMW</option>
      <option>Volkswagen</option>
    </select>
    <select>
      <option value="" selected>
        All models
      </option>
      <option>Audi</option>
      <option>BMW</option>
      <option>Volkswagen</option>
    </select>
    <select>
      <option value="" selected>
        All prices
      </option>
      <option>£1000 ></option>
      <option>£2000 ></option>
      <option>£4000 ></option>
      <option>£8000 ></option>
      <option>£16000 ></option>
    </select>
    <button>Search</button>
  </StyledFacetedNav>
);
export default VehicleSearch;
