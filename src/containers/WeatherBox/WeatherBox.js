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
          pressure: response.data.main.pressure,
          visibility: response.data.visibility
        };
        this.setState({ weatherData });
        console.log(this.state);
      });
  }

  checkLocalData = () => {
    return this.state.weatherData.locationTitle !== 'Earth';
  }

  formatTemperatureData = (temp) => {
    if (temp <= 0) {
      return `${temp.toString()}˚C`;
    }
    return `+${temp.toString()}˚C`;
  }

  getCardinalDirection = (angle) => {
    if (typeof angle === 'string') {
      angle = parseInt(angle, 10);
    }
    if (angle <= 0 || angle > 360 || typeof angle === 'undefined') {
      return '☈';
    }
    const arrows = { 
      north: '↑ N', 
      north_east: '↗ NE', 
      east: '→ E', 
      south_east: '↘ SE', 
      south: '↓ S', 
      south_west: '↙ SW', 
      west: '← W', 
      north_west: '↖ NW' 
    };
    const directions = Object.keys(arrows);
    const degree = 360 / directions.length;
    angle = angle + degree / 2;
    for (let i = 0; i < directions.length; i++) {
      if (angle >= (i * degree) && angle < (i + 1) * degree) {
        return arrows[directions[i]];
      }
    }
    return arrows['north'];
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
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <DataBox indexes={['min', 'max', 'wind']}
                values={[
                  this.formatTemperatureData(this.state.weatherData.temperature.min), 
                  this.formatTemperatureData(this.state.weatherData.temperature.max),
                  `${this.state.weatherData.wind.speed}m/s ${this.getCardinalDirection(this.state.weatherData.wind.deg)}`
                ]}
              />
              <DataBox indexes={['humidity', 'pressure', 'visibility']}
                values={[
                  `${this.state.weatherData.humidity}%`,
                  `${this.state.weatherData.pressure.toFixed(1)}mb↑`,
                  `${(this.state.weatherData.visibility / 1000).toFixed(1)}km`
                ]}
              />
            </div>
          }
        </Background>        
      </Aux>
    );    
  }
}

export default WeatherBox;

