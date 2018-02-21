import React from 'react';

const header = (props) => (
  <header>
    <h1>Weather Watcher</h1>
    <h3>{props.location !== 'Earth' ? props.location : null}</h3>
    <h4>{typeof props.description === 'string' ? props.description : null}</h4>
  </header>
);

export default header;