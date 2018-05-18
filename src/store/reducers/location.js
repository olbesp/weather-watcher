import * as actionTypes from '../actions/actionTypes';

const checkDayTime = () => {
  const time = new Date();
  if (time.getHours() > 5 && time.getHours() < 20) {
    return 'day';
  }

  return 'night';
};

const initialState = {
  location: {
    lat: null,
    lng: null
  },
  timesOfDay: checkDayTime(),
  error: null
};

const getLocation = (state, action) => ({
  ...state,
  location: {
    ...action.location
  },
  error: null
});

const getLocationFail = (state, action) => ({
  ...state,
  location: { ...state.location },
  error: action.error
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LOCATION_SUCCESS: return getLocation(state, action);
    case actionTypes.GET_LOCATION_FAIL: return getLocationFail(state,action);
    default: return state;
  }
};

export default reducer;
