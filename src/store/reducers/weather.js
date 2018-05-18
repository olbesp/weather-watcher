import * as actionTypes from '../actions/actionTypes';

const initialState = {
  weatherData: null,
  error: false
};

const getWeather = (state, action) => ({
  ...state,
  weatherData: {
    ...action.weatherData
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
