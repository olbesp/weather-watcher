import React from 'react';

import styles from './Header.css';
import Marker from '../../assets/images/marker.png';

const header = (props) => (
  <header className={styles.Header}>
    <h1 className={styles.AppTitle}>Weather Watcher</h1>
    {
      props.location === 'Earth' || typeof props.description !== 'string' ? <div></div> :
      <React.Fragment>
        <h3><img src={Marker} alt="Marker" /> {props.location}</h3>
        <h4>{props.description}</h4>
      </React.Fragment>
    }
    
  </header>
);

export default header;