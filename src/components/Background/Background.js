import React from 'react';

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

const background = (props) => {
  const styles = {
    height: '50vh',
    backgroundImage: `url(${backgroundImages[props.time][props.currentWeather]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'bottom'
  };

  return (
    <div style={styles}>
    </div>
  );
};

export default background;