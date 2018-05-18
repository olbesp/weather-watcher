import * as actionTypes from './actionTypes';
import axios from 'axios';

const getWeatherSuccess = weatherData => ({
  type: actionTypes.GET_WEATHER_SUCCESS,
  weatherData
});

const getWeatherFail = () => ({
  type: actionTypes.GET_WEATHER_FAIL
});

export const getWeather = coordinates => dispatch => {
  const url = `https://fcc-weather-api.glitch.me/api/current?lat=${coordinates.lat}&lon=${coordinates.lng}`;
  axios.get(url)
    .then(response => {
      const weatherData = {
        locationTitle: response.data.name,
        weatherType: response.data.weather[0].main.toLowerCase(),
        weatherDescription: response.data.weather[0].description,
        tempMin: response.data.main.temp_min,
        tempMax: response.data.main.temp_max,
        windDeg: response.data.wind.deg, 
        windSpeed: response.data.wind.speed,
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
      dispatch(getWeatherFail());
    });
};
