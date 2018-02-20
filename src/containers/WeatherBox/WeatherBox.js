import React, { Component } from 'react';

import axios from 'axios';

class WeatherBox extends Component {
  state = {
    weatherData: ''
  }

  getWeather = () => {
    const url = `https://fcc-weather-api.glitch.me/api/current?lat=${this.props.coordinates.lat}&lon=${this.props.coordinates.lng}`;
    axios.get(url)
      .then(response => {
        this.setState({ weatherData: response.data });
        console.log(this.state);
      })
      .catch(console.log('error'));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.weatherData === nextState.weatherData;
  }

  componentDidUpdate() {
    this.getWeather();
  }

  render() {
    return <div></div>
  }
}

export default WeatherBox;

