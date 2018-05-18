import * as actionTypes from './actionTypes';

export const getLocationSuccess = location => ({
  type: actionTypes.GET_LOCATION_SUCCESS,
  location
});

export const getLocationFail = error => ({
  type: actionTypes.GET_LOCATION_FAIL,
  error
});

export const getLocation = () => dispatch => {
  window.navigator.geolocation.getCurrentPosition((position) => {
    const userLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    dispatch(getLocationSuccess(userLocation));
  });
};
