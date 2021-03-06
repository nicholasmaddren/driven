import React from 'react';

const defaultState = {
  selectedCar: {
    id: null,
    make: null,
    model: null,
    price: null,
    images: null,
    year: null,
    mileage: null,
  },
  changeSelectedCar: ({}) => {},
};

const AppContext = React.createContext(defaultState);

class AppProvider extends React.Component {
  state = {
    selectedCar: defaultState.selectedCar,
  };

  changeSelectedCar = selectedCar => {
    this.setState({ selectedCar });
  };

  render() {
    const { children } = this.props;
    const { selectedCar } = this.state;
    return (
      <AppContext.Provider
        value={{
          selectedCar,
          changeSelectedCar: this.changeSelectedCar,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export default AppContext;

export { AppProvider };
