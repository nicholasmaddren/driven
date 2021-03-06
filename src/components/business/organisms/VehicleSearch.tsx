import styled from 'styled-components';
import * as React from 'react';
import { navigate } from '@reach/router';

const StyledFacetedNav = styled.div`
  border-radius: 5px;
  margin-bottom: 20px;
  form {
    display: flex;
    input {
      height: 50px;
      width: 100%;
      padding: 0 10px;
      border: 0;
    }
    button {
      background: ${props => props.theme.vars.color.primary};
      border: 0;
      color: #fff;
      height: 50px;
      padding: 0 20px;
      cursor: pointer;
    }
  }
`;

interface IState {
  searchQuery: string;
}

class VehicleSearch extends React.Component {
  public state: IState = {
    searchQuery: '',
  };
  render() {
    return (
      <StyledFacetedNav>
        <form onSubmit={e => this.onSubmitHandler(e)}>
          <input
            type="text"
            onChange={e => this.setState({ searchQuery: e.target.value })}
            placeholder="Search by make, model or keyword"
          />
          <button type="submit">Search</button>
        </form>
      </StyledFacetedNav>
    );
  }
  onSubmitHandler(e) {
    if (this.state.searchQuery === '') {
      navigate(`/cars/`);
    } else {
      navigate(`/cars/?page=1&query=${this.state.searchQuery}`);
    }
    e.preventDefault();
  }
}
export default VehicleSearch;
