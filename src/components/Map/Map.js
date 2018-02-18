import React from 'react';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: -34, lng: 150.644 }}>
    {props.isMarkerShown && <Marker position={{ lat: -34, lng: 150.644 }} />}
  </GoogleMap>
))

export default map;