import React, { Component } from 'react';

import WeatherBox from './containers/WeatherBox/WeatherBox';
import Map from './components/Map/Map';

class App extends Component {
  state = {
    userLocation: {
      lat: 0,
      lng: 0
    },
    timesOfDay: 'night'
  }

  checkDayTime = () => {
    const time = new Date();
    if (time.getHours() > 5 && time.getHours() < 20) {
      this.setState({ timesOfDay: 'day' });
    } else {
      this.setState({ timesOfDay: 'night' });
    }
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude 
      };
      this.setState({ userLocation });
    });
  }

  componentDidMount() {
    this.checkDayTime();
    this.getLocation();
  }

  render() {
    return (
      <div>
        <WeatherBox coordinates={{ ...this.state.userLocation }} time={this.state.timesOfDay} />
        <Map 
          position={{ ...this.state.userLocation }}
          isMarkerShown 
        />
      </div>
    );
  }
}

export default App;
