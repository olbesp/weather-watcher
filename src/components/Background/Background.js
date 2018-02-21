import React, { Component } from 'react';

import ClearDayImage from '../../assets/images/clear-day.jpeg';
import ClearNightImage from '../../assets/images/clear-night.jpeg';
import CloudsDayImage from '../../assets/images/clouds-day.jpeg';
import CloudsNightImage from '../../assets/images/clouds-night.jpeg';
import FogDayImage from '../../assets/images/fog-day.jpeg';
import FogNightImage from '../../assets/images/fog-night.jpeg';
import MistDayImage from '../../assets/images/mist-day.jpeg';
import MistNightImage from '../../assets/images/mist-night.jpeg';
import RainDayImage from '../../assets/images/rain-day.jpeg';
import RainNightImage from '../../assets/images/rain-night.jpeg';
import SnowDayImage from '../../assets/images/snow-day.jpeg';
import SnowNightImage from '../../assets/images/snow-night.jpeg';
import StormDayImage from '../../assets/images/storm-day.jpeg';
import StormNightImage from '../../assets/images/storm-night.jpeg';

const backgroundImages = {
  day: {
    clear: ClearDayImage,
    clouds: CloudsDayImage,
    fog: FogDayImage,
    mist: MistDayImage,
    rain: RainDayImage,
    snow: SnowDayImage,
    storm: StormDayImage
  },
  night: {
    clear: ClearNightImage,
    clouds: CloudsNightImage,
    fog: FogNightImage,
    mist: MistNightImage,
    rain: RainNightImage,
    snow: SnowNightImage,
    storm: StormNightImage
  }
};

class Background extends Component {
  state = {
    styles: {
      height: '60vh',
      backgroundImage: 'linear-gradient(rgba(65, 92, 182, 0.5), rgba(27, 172, 116, 0.5))',
      backgroundSize: 'cover',
      backgroundPosition: 'bottom'
    }
  }

  setBackgroundImage = () => {
    this.setState({ styles: {
      height: '60vh',
      backgroundImage: `linear-gradient(rgba(65, 92, 182, 0.5), rgba(27, 172, 116, 0.5)), url(${backgroundImages[this.props.time][this.props.currentWeather]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'bottom'
    }});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps && this.props.currentWeather) {
      this.setBackgroundImage();
    }
  }

  render() {
    return (
      <div style={this.state.styles}>
        {this.props.children}
      </div>
    );
  }
}

export default Background;