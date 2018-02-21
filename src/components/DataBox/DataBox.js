import React from 'react';

import styles from './DataBox.css';
import Index from '../Index/Index';

const dataBox = (props) => {
  const weatherIndexes = props.indexes.map((index, i) => {
    return <Index type={index} value={props.values[i]} key={i} />
  });
  return (
    <div className={styles.DataBox}>
      {weatherIndexes}
    </div>
  );
}

export default dataBox;