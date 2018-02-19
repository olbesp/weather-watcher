import React, { Component } from 'react';

import Background from './components/Background/Background';
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

  componentDidMount() {
    this.getLocation();
  }

  render() {
    return (
      <div>
        <Background />
        <Map 
          position={{ ...this.state.userLocation }}
          isMarkerShown />
      </div>
    );
  }
}

export default App;
