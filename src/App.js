import React, { Component } from 'react';

import Map from './components/Map/Map';

class App extends Component {
  render() {
    return (
      <div>
        <Map isMarkerShown />
      </div>
    );
  }
}

export default App;
