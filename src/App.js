import React, { Component } from 'react';

import Background from './components/Background/Background';
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
    if (time.getHours() > 5 && time.getHours() < 21) {
      this.setState({ timesOfDay: 'day' });
    } else {
      this.setState({ timesOfDay: 'night' });
    }
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState((prevState) => {
        return {
          userLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }
      });
    });
  }

  componentDidMount() {
    this.checkDayTime();
    this.getLocation();
  }

  render() {
    return (
      <div>
        <Background time={this.state.timesOfDay} currentWeather="snow">
          <WeatherBox coordinates={{ ...this.state.userLocation }} />
        </Background>
        <Map 
          position={{ ...this.state.userLocation }}
          isMarkerShown />
      </div>
    );
  }
}

export default App;
