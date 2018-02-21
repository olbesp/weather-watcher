import React from 'react';

const index = (props) => (
  <div>
    <h3>{props.type}</h3>
    <span>{props.value ? props.value : null}</span>
  </div>
);

export default index;