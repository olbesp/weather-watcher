import React from 'react';

import styles from './Map.css';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const apiKey = 'key=AIzaSyCNnMnCBQZ9HexzA0gigneirn4rWf-FeXU';

const map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className={styles.Map} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    defaultZoom={12}
    center={props.position}
  >
    {props.isMarkerShown && <Marker position={props.position} />}
  </GoogleMap>
));

export default map;
