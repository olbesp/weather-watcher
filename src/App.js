import React, { Component } from 'react';
import { connect } from 'react-redux';

import WeatherBox from './containers/WeatherBox/WeatherBox';
import * as actions from './store/actions/index';

class App extends Component {
  // state = {
  //   userLocation: {
  //     lat: null,
  //     lng: null
  //   },
  //   timesOfDay: checkDayTime()
  // }

  // getLocation = () => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const userLocation = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude 
  //     };
  //     this.setState({ userLocation });
  //   });
  // }

  componentDidMount() {
    this.props.onGetLocation();
  }

  render() {
    return (
      <div>
        <WeatherBox 
          coordinates={{ ...this.props.location }} 
          time={this.props.time} 
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location.location,
  time: state.location.timesOfDay
});

const mapDispatchToProps = dispatch => ({
  onGetLocation: () => dispatch(actions.getLocation())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
