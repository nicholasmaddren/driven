import styled from 'styled-components';
import * as React from 'react';
import { navigate } from '@reach/router';

const StyledFacetedNav = styled.div`
  border-radius: 5px;
  display: flex;
  margin-bottom: 20px;
  input {
    height: 40px;
    padding: 0 10px;
    min-width: 360px;
    border: 0;
  }
  button {
    background: ${props => props.theme.vars.color.blue};
    border: 0;
    color: #fff;
    height: 40px;
    padding: 0 20px;
    cursor: pointer;
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
