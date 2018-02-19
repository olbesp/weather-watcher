import React, { Component } from 'react';

import Map from './components/Map/Map';

class App extends Component {
  state = {
    userLocation: {
      lat: 50,
      lng: 50
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
        <Map lat={this.state.userLocation.lat} lng={this.state.userLocation.lng} isMarkerShown />
      </div>
    );
  }
}

export default App;
