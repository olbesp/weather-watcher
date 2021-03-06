import * as actionTypes from './actionTypes';

const getLocationSuccess = location => ({
  type: actionTypes.GET_LOCATION_SUCCESS,
  location
});

const getLocationFail = error => ({
  type: actionTypes.GET_LOCATION_FAIL,
  error
});

export const getLocation = () => dispatch => {
  window.navigator.geolocation.getCurrentPosition(
    position => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      dispatch(getLocationSuccess(userLocation));
    },
    error => {
      dispatch(getLocationFail(error))
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
};
