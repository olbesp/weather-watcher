import React, { Component } from 'react';

import styles from './Background.css';

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
    backgroundImage: null
  }

  setBackgroundImage = () => {
    this.setState({
      backgroundImage: `linear-gradient(rgba(65, 92, 182, 0.4), rgba(27, 172, 116, 0.4)), url(${backgroundImages[this.props.time][this.props.currentWeather]})`
    });
  }

  componentDidMount() {
    if (this.props.time && this.props.currentWeather) {
      if (!this.state.backgroundImage) {
        this.setBackgroundImage();
      }
    }
  }

  render() {
    let backgroundComponent = <div>{this.props.childen}</div>;
    if (this.props.time && this.props.currentWeather) {
      backgroundComponent = (
        <div className={styles.Background} style={{
          backgroundImage: 'linear-gradient(rgba(65, 92, 182, 0.4), rgba(27, 172, 116, 0.4))'
        }}>{this.props.children}
        </div>
      );
    }
    if (this.state.backgroundImage) {
      backgroundComponent = (
        <div className={styles.Background} style={{...this.state}}>
          {this.props.children}
        </div>
      );
    }

    return backgroundComponent;
  }
}

export default Background;
