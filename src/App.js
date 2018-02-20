import React, { Component } from 'react';

import axios from 'axios';
import Background from './components/Background/Background';
import Map from './components/Map/Map';

class App extends Component {
  state = {
    userLocation: {
      lat: 0,
      lng: 0
    },
    timesOfDay: 'night',
    weatherData: ''
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

  getWeather = () => {
    const url = `https://fcc-weather-api.glitch.me/api/current?lat=${this.state.userLocation.lat}&lon=${this.state.userLocation.lng}`;
    axios.get(url)
      .then(response => {
        // console.log(response.data.coord);
        // console.log(this.state);
        this.setState({weatherData: response.data});
        console.log(this.state);
      })
      .catch(console.log('error'));
  }

  componentDidMount() {
    this.checkDayTime();
    this.getLocation();
  }

  componentDidUpdate() {
    this.getWeather();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.weatherData === nextState.weatherData;
  }

  render() {
    return (
      <div>
        <Background time={this.state.timesOfDay} currentWeather="snow" />
        <Map 
          position={{ ...this.state.userLocation }}
          isMarkerShown />
      </div>
    );
  }
}

export default App;
