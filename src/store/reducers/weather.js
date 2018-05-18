import * as actionTypes from '../actions/actionTypes';

const initialState = {
  weatherData: null,
  error: false
};

const formatTemperatureData = temp => {
  if (temp <= 0) {
    return `${temp.toString()}˚C`;
  }
  return `+${temp.toString()}˚C`;
};

const getCardinalDirection = angle => {
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
};

const getWeather = (state, action) => ({
  ...state,
  weatherData: {
    ...action.weatherData,
    tempMin: formatTemperatureData(action.weatherData.tempMin),
    tempMax: formatTemperatureData(action.weatherData.tempMax),
    windDeg: getCardinalDirection(action.weatherData.windDeg),
    windSpeed: `${action.weatherData.windSpeed}m/s`,
    humidity: `${action.weatherData.humidity}%`,
    pressure: `${action.weatherData.pressure.toFixed(1)}mb↑`,
    visibility: `${(action.weatherData.visibility / 1000).toFixed(1)}km`
  },
  error: false
});

const getWeatherFail = (state, action) => ({
  ...state,
  weatherData: null,
  error: true
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_WEATHER_SUCCESS: return getWeather(state, action);
    case actionTypes.GET_WEATHER_FAIL: return getWeatherFail(state, action);
    default: return state;
  }
};

export default reducer;
