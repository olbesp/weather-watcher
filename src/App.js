import React, { Component } from 'react';

import Map from './components/Map/Map';

class App extends Component {
  state = {
    userLocation: {
      lat: null,
      lng: null
    }
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ 
        userLocation: {
          lat: position.coords.latitude, 
          lng: position.coords.longitude
        }
      });
    });
  }

  updateMapCenter = () => {

  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    return (
      <div>
        <Map 
          position={{ ...this.state.userLocation }}
          isMarkerShown />
      </div>
    );
  }
}

export default App;
