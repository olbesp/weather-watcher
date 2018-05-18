import React from 'react';

import styles from './Index.css';

const index = props => (
  <div className={styles.Index}>
    <h3>{props.type}</h3>
    <span>{props.value ? props.value : null}</span>
  </div>
);

export default index;
