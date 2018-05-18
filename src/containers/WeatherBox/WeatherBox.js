import React, { Component } from 'react';

import styles from './WeatherBox.css';
import axios from 'axios';
import Background from '../../components/Background/Background';
import DataBox from '../../components/DataBox/DataBox';
import Header from '../../components/Header/Header';
import Map from '../../components/Map/Map';
import Footer from '../../components/Footer/Footer';
import Spinner from '../../components/Spinner/Spinner';

class WeatherBox extends Component {
  state = {
    weatherData: null,
    error: false
  }

  getWeather = () => {
    const url = `https://fcc-weather-api.glitch.me/api/current?lat=${this.props.coordinates.lat}&lon=${this.props.coordinates.lng}`;
    axios.get(url)
      .then(response => {
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
        // Fix incorrect response from API with default location
        if (weatherData.locationTitle !== 'Shuzenji') {
          this.setState({ weatherData });
        } else {
          this.setState({ weatherData: null });
        }
      })
      .catch(error => {
        this.setState({ error: true });
      });
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
      north: '↓ N', 
      north_east: '↙ NE', 
      east: '← E', 
      south_east: '↖ SE', 
      south: '↑ S', 
      south_west: '↗ SW', 
      west: '→ W', 
      north_west: '↘ NW' 
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
    if (this.props.coordinates.lat && this.props.coordinates.lng) {
      if (!this.state.weatherData) {
        this.getWeather();
      }
    }
  }

  render() {
    let style = {
      textAlign: 'center',
      fontSize: '3.5rem',
      paddingTop: '5rem',
      height: '100vh',
      color: 'white',
      backgroundImage: 'linear-gradient(rgba(65, 92, 182, 0.4), rgba(27, 172, 116, 0.4))'
    };
    let html = this.state.error ? 
      <div style={style}>Something went wrong!</div> : 
      null;
    
    if (this.props.time && !this.state.error) {
      style = {
        display: 'flex',
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc'
      };
      html = <div style={style}><Spinner /></div>
    }
    if (this.state.weatherData) {
      html = (
        <Background time={this.props.time} currentWeather={this.state.weatherData.weatherType}>
          <Header
            location={this.state.weatherData.locationTitle}
            description={this.state.weatherData.weatherDescription}
          />
          <div className={styles.WeatherBox}>
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
            <Map
              position={{ ...this.props.coordinates }}
              isMarkerShown
            />
          </div>
          <Footer />
        </Background>
      );    
    }

    return html;
  }
}

export default WeatherBox;
