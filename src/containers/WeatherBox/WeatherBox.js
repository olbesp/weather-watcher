import React, { Component } from 'react';

import axios from 'axios';
import Aux from '../../hoc/Aux';
import Background from '../../components/Background/Background';

class WeatherBox extends Component {
  state = {
    weatherData: {},
    currentWeather: ''
  }

  getWeather = () => {
    const url = `https://fcc-weather-api.glitch.me/api/current?lat=${this.props.coordinates.lat}&lon=${this.props.coordinates.lng}`;
    axios.get(url)
      .then(response => {
        const weatherData = response.data;
        const currentWeather = response.data.weather[0].main.toLowerCase();
        this.setState({ 
          weatherData,
          currentWeather
         });
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
        <Background time={this.props.time} currentWeather={this.state.currentWeather} />
      </Aux>
    );
  }
}

export default WeatherBox;

