import React from 'react';

const index = (props) => (
  <div>
    <h3>{props.indexType}</h3>
    <span>{props.value}</span>
  </div>
);

export default index;