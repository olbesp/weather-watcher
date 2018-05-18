import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './WeatherBox.css';
import Background from '../../components/Background/Background';
import DataBox from '../../components/DataBox/DataBox';
import Header from '../../components/Header/Header';
import Map from '../../components/Map/Map';
import Footer from '../../components/Footer/Footer';
import Spinner from '../../components/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class WeatherBox extends Component {

  componentDidUpdate(prevProps, prevState) {
    if (this.props.coordinates.lat && this.props.coordinates.lng) {
      if (!this.props.weatherData) {
        this.props.onGetWeather(this.props.coordinates);
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
    let html = this.props.error ? 
      <div style={style}>Something went wrong!</div> : 
      null;
    
    if (this.props.time && !this.props.error) {
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
    if (this.props.weatherData) {
      html = (
        <Background time={this.props.time} currentWeather={this.props.weatherData.weatherType}>
          <Header
            location={this.props.weatherData.locationTitle}
            description={this.props.weatherData.weatherDescription}
          />
          <div className={styles.WeatherBox}>
            <DataBox indexes={['min', 'max', 'wind']}
              values={[
                this.props.weatherData.tempMin,
                this.props.weatherData.tempMax,
                `${this.props.weatherData.windSpeed} ${this.props.weatherData.windDeg}`
              ]}
            />
            <DataBox indexes={['humidity', 'pressure', 'visibility']}
              values={[
                this.props.weatherData.humidity,
                this.props.weatherData.pressure,
                this.props.weatherData.visibility
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

const mapStateToProps = state => ({
  weatherData: state.weather.weatherData,
  error: state.weather.error
});

const mapDispatchToProps = dispatch => ({
  onGetWeather: coordinates => dispatch(actions.getWeather(coordinates))
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherBox);
