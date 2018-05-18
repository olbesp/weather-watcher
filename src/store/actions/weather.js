import * as actionTypes from './actionTypes';
import axios from 'axios';

const getWeatherSuccess = weatherData => ({
  type: actionTypes.GET_WEATHER_SUCCESS,
  weatherData
});

const getWeatherFail = error => ({
  type: actionTypes.GET_WEATHER_FAIL,
  error
});

export const getWeather = () => dispatch => {
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
        dispatch(getWeatherSuccess(weatherData));
      } else {
        dispatch(getWeatherSuccess(null));
      }
    })
    .catch(error => {
      dispatch(getWeatherFail(error));
    });
};
