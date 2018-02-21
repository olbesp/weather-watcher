import React, { Component } from 'react';

import axios from 'axios';
import Aux from '../../hoc/Aux';
import Background from '../../components/Background/Background';
import DataBox from '../../components/DataBox/DataBox';

class WeatherBox extends Component {
  state = {
    weatherData: {}
  }

  getWeather = () => {
    const url = `https://fcc-weather-api.glitch.me/api/current?lat=${this.props.coordinates.lat}&lon=${this.props.coordinates.lng}`;
    axios.get(url)
      .then(response => {
        console.log(response.data);
        const weatherData = {
          locationTitle: response.data.name,
          weatherType: response.data.weather[0].main.toLowerCase(),
          weatherDescription: response.data.weather[0].description,
          temperature: { min: response.data.main.temp_min, max: response.data.main.temp_max },
          wind: { deg: response.data.wind.deg, speed: response.data.wind.speed },
          humidity: response.data.main.humidity,
          pressure: response.data.main.pressure
        };
        this.setState({ weatherData });
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
        <Background time={this.props.time} currentWeather={this.state.weatherData.weatherType} />
        <DataBox>

        </DataBox>
        <DataBox>

        </DataBox>
      </Aux>
    );
  }
}

export default WeatherBox;

