import React, { Component } from 'react';

import axios from 'axios';
import Aux from '../../hoc/Aux';
import Background from '../../components/Background/Background';
import DataBox from '../../components/DataBox/DataBox';
import Header from '../../components/Header/Header';

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

  checkLocalData = () => {
    return this.state.weatherData.locationTitle !== 'Earth';
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.getWeather();
    }
  }

  render() {
    return (
      <Aux>
        <Background time={this.props.time} currentWeather={this.state.weatherData.weatherType}>
          <Header
            location={this.state.weatherData.locationTitle}
            description={this.state.weatherData.weatherDescription}
          />
          {
            this.state.weatherData.temperature && this.checkLocalData() &&
            <DataBox indexes={['min', 'max']}
              values={[this.state.weatherData.temperature.min, this.state.weatherData.temperature.max]}
            />
          }
        </Background>        
      </Aux>
    );    
  }
}

export default WeatherBox;

