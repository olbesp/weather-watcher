import React from 'react';

import styles from './Header.css';
import Aux from '../../hoc/Aux';
import Marker from '../../assets/images/marker.png';

const header = (props) => (
  <header className={styles.Header}>
    <h1 className={styles.AppTitle}>Weather Watcher</h1>
    {
      props.location === 'Earth' || typeof props.description !== 'string' ? <div></div> :
      <Aux>
        <h3><img src={Marker} alt="Marker" /> {props.location}</h3>
        <h4>{props.description}</h4>
      </Aux>
    }
    
  </header>
);

export default header;