import React, { Component } from 'react';

import axios from 'axios';
import Aux from '../../hoc/Aux';
import Background from '../../components/Background/Background';

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
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.getWeather();
    }
  }

  render() {
    return (
      <Aux>
        <Background time={this.props.time} currentWeather={this.state.weatherData.weather[0].main.toLowerCase()} />
      </Aux>
    );
  }
}

export default WeatherBox;

