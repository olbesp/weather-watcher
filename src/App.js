import React, { Component } from 'react';
import { connect } from 'react-redux';

import WeatherBox from './containers/WeatherBox/WeatherBox';
import * as actions from './store/actions/index';
import Spinner from './components/Spinner/Spinner';

class App extends Component {

  componentDidMount() {
    this.props.onGetLocation();
  }

  render() {
    let html = <Spinner />;

    if (this.props.location) {
      html = (
        <WeatherBox
          coordinates={{ ...this.props.location }}
          time={this.props.time}
        />
      );
    }

    if (this.props.error) {
      const style = {
        marginTop: '50vh',
        fontSize: '5rem',
        color: '#777',
        textAlign: 'center'
      };
      html = <div style={style}>{this.props.error.message}</div>;
    }

    return html;
  }
}

const mapStateToProps = state => ({
  location: state.location.location,
  time: state.location.timesOfDay,
  error: state.location.error
});

const mapDispatchToProps = dispatch => ({
  onGetLocation: () => dispatch(actions.getLocation())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
