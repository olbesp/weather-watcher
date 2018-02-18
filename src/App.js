import React, { Component } from 'react';

import Map from './components/Map/Map';

class App extends Component {
  state = {
    coordinates: {
      lat: null,
      lng: null
    }
  }

  showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return "User denied the request for Geolocation."
      case error.POSITION_UNAVAILABLE:
        return "Location information is unavailable."
      case error.TIMEOUT:
        return "The request to get user location timed out."
      case error.UNKNOWN_ERROR:
        return "An unknown error occurred."
      default:
        return error;
    }
  }

  getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let currentCoordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.setState({coordinates: currentCoordinates});
        console.log(this.state.coordinates);
      }, this.showError);
    } else {
      // Browser doesn't support Geolocation
      console.log("Geolocation is not supported by this browser.");
    }
  }

  componentDidMount() {
    this.getGeolocation();
  }

  shouldComponentUpdate() {

  }

  render() {
    return (
      <div>
        <Map
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCNnMnCBQZ9HexzA0gigneirn4rWf-FeXU&v=3.exp&libraries=geometry,drawing,places"
          lat={this.state.coordinates.lat}
          lng={this.state.coordinates.lng}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `50vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default App;
