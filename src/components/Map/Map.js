import React from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const apiKey = 'key=AIzaSyCNnMnCBQZ9HexzA0gigneirn4rWf-FeXU';

const map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `50vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)((props) => (
  <GoogleMap
    defaultZoom={2}
    defaultCenter={{ lat: 43, lng: 150 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 43, lng: 150 }} />}
  </GoogleMap>
));

export default map;

